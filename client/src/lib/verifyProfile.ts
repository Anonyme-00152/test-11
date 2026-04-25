/**
 * Vérifier si un profil existe réellement sur une plateforme
 * en utilisant les URLs correctes de Sherlock
 */

interface SiteConfig {
  url: string;
  errorType: 'status_code' | 'message';
  errorMsg?: string[];
  errorMsg_lower?: boolean;
}

export async function verifyProfileExists(
  username: string,
  siteName: string,
  siteConfig: SiteConfig
): Promise<boolean> {
  try {
    const profileUrl = siteConfig.url.replace('{}', encodeURIComponent(username));
    
    // Utiliser un proxy CORS pour éviter les problèmes de CORS
    const corsProxyUrl = `https://cors-anywhere.herokuapp.com/${profileUrl}`;
    
    const response = await fetch(corsProxyUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      mode: 'no-cors',
    }).catch(() => null);

    if (!response) {
      // Si la requête échoue, on suppose que le profil n'existe pas
      return false;
    }

    // Vérifier basé sur le type d'erreur
    if (siteConfig.errorType === 'status_code') {
      // Si le code est 404 ou 410, le profil n'existe pas
      return response.status !== 404 && response.status !== 410;
    } else if (siteConfig.errorType === 'message') {
      // Si c'est basé sur un message d'erreur, vérifier le contenu
      const text = await response.text();
      const errorMessages = siteConfig.errorMsg || [];
      
      for (const errorMsg of errorMessages) {
        if (text.includes(errorMsg)) {
          return false; // Profil non trouvé
        }
      }
      return true; // Profil trouvé
    }

    return false;
  } catch (error) {
    console.error(`Erreur lors de la vérification de ${siteName}:`, error);
    return false;
  }
}

/**
 * Version simplifiée : vérifier juste si l'URL est accessible
 * (sans CORS proxy)
 */
export async function checkProfileUrlAccessible(
  username: string,
  siteConfig: SiteConfig
): Promise<'found' | 'not_found' | 'error'> {
  try {
    const profileUrl = siteConfig.url.replace('{}', encodeURIComponent(username));
    
    const response = await fetch(profileUrl, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    }).catch(() => null);

    if (!response) {
      return 'error';
    }

    // Vérifier le code de statut
    if (response.status === 404 || response.status === 410) {
      return 'not_found';
    } else if (response.status >= 200 && response.status < 400) {
      return 'found';
    }

    return 'error';
  } catch (error) {
    return 'error';
  }
}

/**
 * Vérification rapide : on retourne juste l'URL correcte
 * L'utilisateur peut cliquer pour vérifier lui-même
 */
export function getProfileUrl(
  username: string,
  siteConfig: SiteConfig
): string {
  return siteConfig.url.replace('{}', encodeURIComponent(username));
}
