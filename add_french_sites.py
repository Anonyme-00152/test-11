#!/usr/bin/env python3
import json

# Charger le fichier actuel
with open('client/public/sherlock-data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Créer une liste des nouveaux sites français et réseaux sociaux populaires
new_sites = {
    # Réseaux Sociaux Modernes
    "Bluesky": {
        "errorType": "status_code",
        "url": "https://bsky.app/profile/{}",
        "urlMain": "https://bsky.app/",
        "username_claimed": "jack"
    },
    "Mastodon": {
        "errorType": "status_code",
        "url": "https://mastodon.social/@{}",
        "urlMain": "https://mastodon.social/",
        "username_claimed": "Gargron"
    },
    "Threads": {
        "errorType": "status_code",
        "url": "https://www.threads.net/@{}",
        "urlMain": "https://www.threads.net/",
        "username_claimed": "zuck"
    },
    "BeReal": {
        "errorType": "status_code",
        "url": "https://bereal.com/user/{}",
        "urlMain": "https://bereal.com/",
        "username_claimed": "user"
    },
    "Telegram": {
        "errorType": "message",
        "errorMsg": "User not found",
        "url": "https://t.me/{}",
        "urlMain": "https://t.me/",
        "username_claimed": "telegram"
    },
    "Signal": {
        "errorType": "status_code",
        "url": "https://signal.me/#p/{}",
        "urlMain": "https://signal.me/",
        "username_claimed": "signal"
    },
    "Viber": {
        "errorType": "status_code",
        "url": "https://viber.com/{}",
        "urlMain": "https://viber.com/",
        "username_claimed": "viber"
    },
    "WeChat": {
        "errorType": "status_code",
        "url": "https://weixin.qq.com/{}",
        "urlMain": "https://weixin.qq.com/",
        "username_claimed": "wechat"
    },
    "QQ": {
        "errorType": "status_code",
        "url": "https://user.qzone.qq.com/{}",
        "urlMain": "https://user.qzone.qq.com/",
        "username_claimed": "qq"
    },
    "Nextdoor": {
        "errorType": "status_code",
        "url": "https://nextdoor.com/profile/{}",
        "urlMain": "https://nextdoor.com/",
        "username_claimed": "user"
    },
    "Rumble": {
        "errorType": "status_code",
        "url": "https://rumble.com/user/{}",
        "urlMain": "https://rumble.com/",
        "username_claimed": "rumble"
    },
    "Odysee": {
        "errorType": "status_code",
        "url": "https://odysee.com/@{}",
        "urlMain": "https://odysee.com/",
        "username_claimed": "odysee"
    },
    "Kick": {
        "errorType": "status_code",
        "url": "https://kick.com/{}",
        "urlMain": "https://kick.com/",
        "username_claimed": "kick"
    },
    
    # Plateformes de Gaming
    "Steam": {
        "errorType": "status_code",
        "url": "https://steamcommunity.com/profiles/{}",
        "urlMain": "https://steamcommunity.com/",
        "username_claimed": "76561198000000000"
    },
    "Epic Games": {
        "errorType": "status_code",
        "url": "https://www.epicgames.com/site/en-US/community/profile/{}",
        "urlMain": "https://www.epicgames.com/",
        "username_claimed": "epicgames"
    },
    "Ubisoft": {
        "errorType": "status_code",
        "url": "https://ubisoft.com/en-US/user/{}",
        "urlMain": "https://ubisoft.com/",
        "username_claimed": "ubisoft"
    },
    "PlayStation Network": {
        "errorType": "status_code",
        "url": "https://www.psn.com/profile/{}",
        "urlMain": "https://www.psn.com/",
        "username_claimed": "psn"
    },
    "Xbox Live": {
        "errorType": "status_code",
        "url": "https://www.xbox.com/en-US/profile/{}",
        "urlMain": "https://www.xbox.com/",
        "username_claimed": "xbox"
    },
    "Nintendo": {
        "errorType": "status_code",
        "url": "https://www.nintendo.com/account/profile/{}",
        "urlMain": "https://www.nintendo.com/",
        "username_claimed": "nintendo"
    },
    "Twitch": {
        "errorType": "status_code",
        "url": "https://www.twitch.tv/{}",
        "urlMain": "https://www.twitch.tv/",
        "username_claimed": "twitch"
    },
    "Mixer": {
        "errorType": "status_code",
        "url": "https://mixer.com/{}",
        "urlMain": "https://mixer.com/",
        "username_claimed": "mixer"
    },
    "Roblox": {
        "errorType": "status_code",
        "url": "https://www.roblox.com/users/{}/profile",
        "urlMain": "https://www.roblox.com/",
        "username_claimed": "roblox"
    },
    "Fortnite": {
        "errorType": "status_code",
        "url": "https://www.fortnite.com/profile/{}",
        "urlMain": "https://www.fortnite.com/",
        "username_claimed": "fortnite"
    },
    "Valorant": {
        "errorType": "status_code",
        "url": "https://valorant.com/profile/{}",
        "urlMain": "https://valorant.com/",
        "username_claimed": "valorant"
    },
    "League of Legends": {
        "errorType": "status_code",
        "url": "https://www.leagueoflegends.com/profile/{}",
        "urlMain": "https://www.leagueoflegends.com/",
        "username_claimed": "lol"
    },
    "Dota 2": {
        "errorType": "status_code",
        "url": "https://www.dota2.com/profile/{}",
        "urlMain": "https://www.dota2.com/",
        "username_claimed": "dota2"
    },
    "Counter-Strike 2": {
        "errorType": "status_code",
        "url": "https://www.counter-strike.net/profile/{}",
        "urlMain": "https://www.counter-strike.net/",
        "username_claimed": "cs2"
    },
    
    # Plateformes de Streaming Vidéo
    "Netflix": {
        "errorType": "status_code",
        "url": "https://www.netflix.com/profile/{}",
        "urlMain": "https://www.netflix.com/",
        "username_claimed": "netflix"
    },
    "Disney+": {
        "errorType": "status_code",
        "url": "https://www.disneyplus.com/profile/{}",
        "urlMain": "https://www.disneyplus.com/",
        "username_claimed": "disney"
    },
    "Amazon Prime Video": {
        "errorType": "status_code",
        "url": "https://www.primevideo.com/profile/{}",
        "urlMain": "https://www.primevideo.com/",
        "username_claimed": "prime"
    },
    "OCS": {
        "errorType": "status_code",
        "url": "https://www.ocs.fr/profile/{}",
        "urlMain": "https://www.ocs.fr/",
        "username_claimed": "ocs"
    },
    "Canal+": {
        "errorType": "status_code",
        "url": "https://www.canalplus.com/profile/{}",
        "urlMain": "https://www.canalplus.com/",
        "username_claimed": "canalplus"
    },
    "France Télévisions": {
        "errorType": "status_code",
        "url": "https://www.francetelevisions.fr/profile/{}",
        "urlMain": "https://www.francetelevisions.fr/",
        "username_claimed": "francetv"
    },
    "YouTube": {
        "errorType": "status_code",
        "url": "https://www.youtube.com/@{}",
        "urlMain": "https://www.youtube.com/",
        "username_claimed": "youtube"
    },
    "Dailymotion": {
        "errorType": "status_code",
        "url": "https://www.dailymotion.com/{}",
        "urlMain": "https://www.dailymotion.com/",
        "username_claimed": "dailymotion"
    },
    "Vimeo": {
        "errorType": "status_code",
        "url": "https://vimeo.com/{}",
        "urlMain": "https://vimeo.com/",
        "username_claimed": "vimeo"
    },
    
    # Plateformes Musicales
    "Spotify": {
        "errorType": "status_code",
        "url": "https://open.spotify.com/user/{}",
        "urlMain": "https://open.spotify.com/",
        "username_claimed": "spotify"
    },
    "Apple Music": {
        "errorType": "status_code",
        "url": "https://music.apple.com/profile/{}",
        "urlMain": "https://music.apple.com/",
        "username_claimed": "applemusic"
    },
    "Deezer": {
        "errorType": "status_code",
        "url": "https://www.deezer.com/profile/{}",
        "urlMain": "https://www.deezer.com/",
        "username_claimed": "deezer"
    },
    "SoundCloud": {
        "errorType": "status_code",
        "url": "https://soundcloud.com/{}",
        "urlMain": "https://soundcloud.com/",
        "username_claimed": "soundcloud"
    },
    "Bandcamp": {
        "errorType": "status_code",
        "url": "https://{}.bandcamp.com",
        "urlMain": "https://bandcamp.com/",
        "username_claimed": "bandcamp"
    },
    
    # Plateformes Professionnelles Françaises
    "Viadeo": {
        "errorType": "status_code",
        "url": "https://www.viadeo.com/profile/{}",
        "urlMain": "https://www.viadeo.com/",
        "username_claimed": "viadeo"
    },
    "Copains d'avant": {
        "errorType": "status_code",
        "url": "https://www.copainsdavant.com/profile/{}",
        "urlMain": "https://www.copainsdavant.com/",
        "username_claimed": "copains"
    },
    "Meetic": {
        "errorType": "status_code",
        "url": "https://www.meetic.fr/profile/{}",
        "urlMain": "https://www.meetic.fr/",
        "username_claimed": "meetic"
    },
    "Adopte un mec": {
        "errorType": "status_code",
        "url": "https://www.adopteunmec.com/profile/{}",
        "urlMain": "https://www.adopteunmec.com/",
        "username_claimed": "adopte"
    },
    
    # Plateformes de Contenu Français
    "Allocine": {
        "errorType": "status_code",
        "url": "https://www.allocine.fr/profil/{}",
        "urlMain": "https://www.allocine.fr/",
        "username_claimed": "allocine"
    },
    "Senscritique": {
        "errorType": "status_code",
        "url": "https://www.senscritique.com/{}",
        "urlMain": "https://www.senscritique.com/",
        "username_claimed": "senscritique"
    },
    "Babelio": {
        "errorType": "status_code",
        "url": "https://www.babelio.com/{}",
        "urlMain": "https://www.babelio.com/",
        "username_claimed": "babelio"
    },
    "Goodreads": {
        "errorType": "status_code",
        "url": "https://www.goodreads.com/user/show/{}",
        "urlMain": "https://www.goodreads.com/",
        "username_claimed": "goodreads"
    },
    
    # Plateformes de Commerce Français
    "Leboncoin": {
        "errorType": "status_code",
        "url": "https://www.leboncoin.fr/utilisateur/{}",
        "urlMain": "https://www.leboncoin.fr/",
        "username_claimed": "leboncoin"
    },
    "Vinted": {
        "errorType": "status_code",
        "url": "https://www.vinted.fr/member/{}",
        "urlMain": "https://www.vinted.fr/",
        "username_claimed": "vinted"
    },
    "Vestiaire Collective": {
        "errorType": "status_code",
        "url": "https://www.vestiairecollective.com/{}",
        "urlMain": "https://www.vestiairecollective.com/",
        "username_claimed": "vestiaire"
    },
    "Etsy": {
        "errorType": "status_code",
        "url": "https://www.etsy.com/shop/{}",
        "urlMain": "https://www.etsy.com/",
        "username_claimed": "etsy"
    },
    
    # Autres Plateformes Populaires
    "Patreon": {
        "errorType": "status_code",
        "url": "https://www.patreon.com/{}",
        "urlMain": "https://www.patreon.com/",
        "username_claimed": "patreon"
    },
    "Ko-fi": {
        "errorType": "status_code",
        "url": "https://ko-fi.com/{}",
        "urlMain": "https://ko-fi.com/",
        "username_claimed": "kofi"
    },
    "Buymeacoffee": {
        "errorType": "status_code",
        "url": "https://www.buymeacoffee.com/{}",
        "urlMain": "https://www.buymeacoffee.com/",
        "username_claimed": "buymeacoffee"
    },
    "Linktree": {
        "errorType": "status_code",
        "url": "https://linktr.ee/{}",
        "urlMain": "https://linktr.ee/",
        "username_claimed": "linktree"
    },
    "Carrd": {
        "errorType": "status_code",
        "url": "https://{}.carrd.co",
        "urlMain": "https://carrd.co/",
        "username_claimed": "carrd"
    },
}

# Ajouter les nouveaux sites au dictionnaire existant
for site_name, site_data in new_sites.items():
    if site_name not in data:
        data[site_name] = site_data
        print(f"✓ Ajouté : {site_name}")
    else:
        print(f"⚠ Existe déjà : {site_name}")

# Sauvegarder le fichier mis à jour
with open('client/public/sherlock-data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Compter les sites finaux
final_count = len([k for k in data.keys() if k != '$schema'])
print(f"\n✓ Total final : {final_count} sites")
print(f"✓ Nouveaux sites ajoutés : {len(new_sites)}")
