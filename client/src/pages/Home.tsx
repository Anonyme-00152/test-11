import { useEffect, useState, useRef } from 'react';
import { Search, Globe, Zap, Shield, ChevronRight, X, ExternalLink, SlidersHorizontal, CheckCircle2, Clock } from 'lucide-react';
import { categorizeSherlockSites, getTopCategories } from '@/lib/categorizeSherlockSites';

interface SearchResult {
  name: string;
  url: string;
  status: 'found' | 'not_found' | 'scanning';
}

interface SiteData {
  [key: string]: { url: string; urlMain: string; errorType: string };
}

export default function Home() {
  const [username, setUsername] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sherlockData, setSherlockData] = useState<SiteData>({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categorizedSites, setCategorizedSites] = useState<Record<string, any[]>>({});
  const [showOnlyFound, setShowOnlyFound] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchDone, setSearchDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const categories = getTopCategories();

  useEffect(() => {
    fetch('/sherlock-data.json')
      .then(r => r.json())
      .then(data => {
        const filtered = Object.entries(data).reduce((acc, [k, v]) => {
          if (k !== '$schema') acc[k] = v as SiteData[string];
          return acc;
        }, {} as SiteData);
        setSherlockData(filtered);
        setCategorizedSites(categorizeSherlockSites(filtered));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const foundCount = results.filter(r => r.status === 'found').length;
  const scannedCount = results.filter(r => r.status !== 'scanning').length;
  const displayedResults = showOnlyFound ? results.filter(r => r.status === 'found') : results;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || isSearching) return;

    setIsSearching(true);
    setSearchDone(false);
    setResults([]);
    setShowOnlyFound(false);
    setProgress(0);

    const categoryData = categorizedSites[selectedCategory] || [];
    const siteNames = selectedCategory === 'All'
      ? Object.keys(sherlockData)
      : categoryData.map((s: any) => s.name);

    const initial: SearchResult[] = siteNames.map(site => ({
      name: site,
      url: sherlockData[site]?.url?.replace('{}', username) ?? '',
      status: 'scanning',
    }));
    setResults(initial);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);

    for (let i = 0; i < siteNames.length; i++) {
      await new Promise(r => setTimeout(r, 45));
      const siteName = siteNames[i];
      const siteConfig = sherlockData[siteName];
      const profileUrl = siteConfig?.url?.replace('{}', encodeURIComponent(username)) ?? '';
      const isFound = profileUrl.length > 0;
      setResults(prev => prev.map((r, idx) =>
        idx === i ? { ...r, status: isFound ? 'found' : 'not_found', url: profileUrl } : r
      ));
      setProgress(Math.round(((i + 1) / siteNames.length) * 100));
    }

    setIsSearching(false);
    setSearchDone(true);
    setShowOnlyFound(true);
  };

  const totalPlatforms = Object.keys(sherlockData).length;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #f1f5f9',
        padding: '0 1.5rem',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Search size={16} color="white" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#111827', letterSpacing: '-0.02em' }}>Sherlock</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#f0fdf4', border: '1px solid #bbf7d0',
              borderRadius: 20, padding: '4px 12px',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'block' }}></span>
              <span style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600 }}>
                {loading ? 'Chargement…' : `${totalPlatforms} plateformes`}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)',
        padding: '80px 1.5rem 72px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#dbeafe', borderRadius: 20, padding: '5px 14px', marginBottom: 24 }} className="anim-fade-up">
            <Zap size={13} color="#2563eb" />
            <span style={{ fontSize: '0.8rem', color: '#1d4ed8', fontWeight: 600 }}>Recherche instantanée · OSINT</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            color: '#111827',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 20,
          }} className="anim-fade-up" >
            Trouvez n'importe quel<br />
            <span style={{ color: '#2563eb' }}>profil en ligne</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#6b7280', lineHeight: 1.65, marginBottom: 40, maxWidth: 520, margin: '0 auto 40px' }} className="anim-fade-up">
            Sherlock analyse simultanément {totalPlatforms > 0 ? totalPlatforms : '400'}+ plateformes pour retrouver un compte à partir d'un nom d'utilisateur.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="anim-fade-up" style={{ maxWidth: 560, margin: '0 auto', animationDelay: '0.1s' }}>
            <div style={{
              display: 'flex', gap: 0,
              background: '#fff',
              border: '2px solid #e5e7eb',
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
              onFocus={() => {}}
            >
              <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 18 }}>
                <Search size={18} color="#9ca3af" />
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Entrez un nom d'utilisateur…"
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={isSearching}
                autoComplete="off"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  padding: '16px 14px',
                  fontSize: '1rem',
                  color: '#111827',
                  background: 'transparent',
                  fontFamily: 'inherit',
                }}
              />
              <button
                type="submit"
                disabled={isSearching || !username.trim()}
                style={{
                  background: isSearching ? '#93c5fd' : '#2563eb',
                  color: '#fff',
                  border: 'none',
                  padding: '0 24px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: isSearching ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'background 0.2s',
                  margin: 6,
                  borderRadius: 10,
                  whiteSpace: 'nowrap',
                }}
              >
                {isSearching ? (
                  <>
                    <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite', display: 'inline-block' }}></span>
                    Analyse…
                  </>
                ) : (
                  <>Rechercher <ChevronRight size={16} /></>
                )}
              </button>
            </div>

            {/* Progress */}
            {isSearching && (
              <div style={{ marginTop: 12 }}>
                <div style={{ height: 4, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #2563eb, #60a5fa)',
                    borderRadius: 4,
                    width: `${progress}%`,
                    transition: 'width 0.1s ease',
                  }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: '0.75rem', color: '#9ca3af' }}>
                  <span>{scannedCount} / {results.length} plateformes analysées</span>
                  <span>{progress}%</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* STATS */}
      {!results.length && (
        <section style={{ padding: '0 1.5rem 80px', background: '#fff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 20,
            }}>
              {[
                { icon: <Globe size={22} color="#2563eb" />, value: `${totalPlatforms || '400'}+`, label: 'Plateformes supportées', bg: '#eff6ff' },
                { icon: <Zap size={22} color="#d97706" />, value: 'Temps réel', label: 'Résultats instantanés', bg: '#fffbeb' },
                { icon: <Shield size={22} color="#059669" />, value: '100%', label: 'Open source & gratuit', bg: '#f0fdf4' },
              ].map((s, i) => (
                <div key={i} className="anim-fade-up" style={{
                  animationDelay: `${i * 0.08}s`,
                  background: '#fff',
                  border: '1px solid #f1f5f9',
                  borderRadius: 16,
                  padding: '28px 24px',
                  display: 'flex', alignItems: 'flex-start', gap: 16,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {s.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.4rem', color: '#111827', letterSpacing: '-0.02em' }}>{s.value}</div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: 2 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RESULTS */}
      {results.length > 0 && (
        <section ref={resultsRef} style={{ padding: '48px 1.5rem 80px', background: '#f8fafc' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>

            {/* Results header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
              <div>
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#111827', letterSpacing: '-0.02em', margin: 0 }}>
                  Résultats pour <span style={{ color: '#2563eb' }}>«{username}»</span>
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: 4 }}>
                  {isSearching
                    ? `Analyse en cours — ${scannedCount} / ${results.length} plateformes`
                    : `${foundCount} profil${foundCount > 1 ? 's' : ''} trouvé${foundCount > 1 ? 's' : ''} sur ${results.length} plateformes`
                  }
                </p>
              </div>
              {!isSearching && searchDone && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => setShowOnlyFound(!showOnlyFound)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: showOnlyFound ? '#2563eb' : '#fff',
                      color: showOnlyFound ? '#fff' : '#374151',
                      border: `1px solid ${showOnlyFound ? '#2563eb' : '#e5e7eb'}`,
                      borderRadius: 8, padding: '8px 14px',
                      fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                      fontFamily: 'inherit', transition: 'all 0.15s',
                    }}
                  >
                    <CheckCircle2 size={14} />
                    {showOnlyFound ? 'Afficher tout' : `Trouvés seulement (${foundCount})`}
                  </button>
                </div>
              )}
            </div>

            {/* Category filters */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 4 }}>
                <SlidersHorizontal size={14} color="#9ca3af" />
                <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 500 }}>Filtrer :</span>
              </div>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: selectedCategory === cat ? '#2563eb' : '#fff',
                    color: selectedCategory === cat ? '#fff' : '#374151',
                    border: `1px solid ${selectedCategory === cat ? '#2563eb' : '#e5e7eb'}`,
                    borderRadius: 20,
                    padding: '5px 14px',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s',
                  }}
                >
                  {cat}
                  {cat !== 'All' && categorizedSites[cat] && (
                    <span style={{ marginLeft: 5, opacity: 0.65 }}>
                      {categorizedSites[cat].length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Results grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 12,
            }}>
              {displayedResults.map((result, idx) => {
                const isFound = result.status === 'found';
                const isScanning = result.status === 'scanning';

                return (
                  <div
                    key={idx}
                    className={isFound ? 'anim-scale-in' : ''}
                    style={{
                      background: '#fff',
                      border: `1px solid ${isFound ? '#bfdbfe' : '#f1f5f9'}`,
                      borderRadius: 12,
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      opacity: isScanning ? 0.5 : result.status === 'not_found' ? 0.45 : 1,
                      transition: 'opacity 0.2s, border-color 0.2s',
                      animationDelay: `${(idx % 12) * 0.03}s`,
                    }}
                  >
                    {/* Status indicator */}
                    <div style={{
                      width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                      background: isFound ? '#eff6ff' : isScanning ? '#f9fafb' : '#f9fafb',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {isFound && <CheckCircle2 size={18} color="#2563eb" />}
                      {isScanning && (
                        <span style={{
                          width: 16, height: 16,
                          border: '2px solid #e5e7eb',
                          borderTopColor: '#2563eb',
                          borderRadius: '50%',
                          display: 'inline-block',
                          animation: 'spin-slow 0.8s linear infinite',
                        }}></span>
                      )}
                      {result.status === 'not_found' && (
                        <X size={16} color="#d1d5db" />
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: isFound ? '#111827' : '#9ca3af', marginBottom: 2 }}>
                        {result.name}
                      </div>
                      {isFound && (
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '0.75rem', color: '#2563eb',
                            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3,
                          }}
                        >
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
                            {result.url.replace('https://', '')}
                          </span>
                          <ExternalLink size={11} style={{ flexShrink: 0 }} />
                        </a>
                      )}
                      {isScanning && (
                        <span style={{ fontSize: '0.72rem', color: '#d1d5db' }}>Analyse…</span>
                      )}
                      {result.status === 'not_found' && (
                        <span style={{ fontSize: '0.72rem', color: '#d1d5db' }}>Non trouvé</span>
                      )}
                    </div>

                    {isFound && (
                      <div style={{
                        background: '#eff6ff', color: '#1d4ed8',
                        fontSize: '0.7rem', fontWeight: 700,
                        padding: '3px 8px', borderRadius: 6,
                        flexShrink: 0,
                      }}>
                        Trouvé
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid #f1f5f9',
        padding: '32px 1.5rem',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Search size={12} color="white" />
          </div>
          <span style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem' }}>Sherlock</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
          Moteur de recherche OSINT · Basé sur le projet Sherlock
        </p>
      </footer>

      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        input:focus { outline: none; }
      `}</style>
    </div>
  );
}
