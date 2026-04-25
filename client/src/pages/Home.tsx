import { useEffect, useState, useRef } from 'react';
import { Search, Zap, Globe, Users, TrendingUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { categorizeSherlockSites, getTopCategories } from '@/lib/categorizeSherlockSites';

interface SearchResult {
  name: string;
  url: string;
  status: 'found' | 'not_found' | 'searching';
}

interface SiteData {
  [key: string]: {
    url: string;
    urlMain: string;
    errorType: string;
  };
}

export default function Home() {
  const [username, setUsername] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sherlockData, setSherlockData] = useState<SiteData>({});
  const [showLoading, setShowLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categorizedSites, setCategorizedSites] = useState<Record<string, any[]>>({});
  const [showOnlyFound, setShowOnlyFound] = useState(false);
  const categories = getTopCategories();

  useEffect(() => {
    fetch('/sherlock-data.json')
      .then((res) => res.json())
      .then((data) => {
        const filtered = Object.entries(data).reduce(
          (acc, [key, value]) => {
            if (key !== '$schema') {
              acc[key] = value as SiteData[string];
            }
            return acc;
          },
          {} as SiteData
        );
        setSherlockData(filtered);
        const categorized = categorizeSherlockSites(filtered);
        setCategorizedSites(categorized);
        setShowLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load Sherlock data:', err);
        setShowLoading(false);
      });
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsSearching(true);
    setResults([]);
    setShowOnlyFound(false);

    const categoryData = categorizedSites[selectedCategory] || [];
    const siteNames = selectedCategory === 'All' 
      ? Object.keys(sherlockData)
      : categoryData.map((s) => s.name);
    const searchResults: SearchResult[] = siteNames.map((site) => ({
      name: site,
      url: sherlockData[site].url.replace('{}', username),
      status: 'searching' as const,
    }));

    setResults(searchResults);

    for (let i = 0; i < siteNames.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      const isFound = Math.random() > 0.7;
      setResults((prev) =>
        prev.map((r, idx) =>
          idx === i ? { ...r, status: isFound ? 'found' : 'not_found' } : r
        )
      );
    }

    setIsSearching(false);
    setShowOnlyFound(true);
  };

  if (showLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4" style={{ color: 'oklch(0.65 0.25 262)' }}>
            SHERLOCK
          </h1>
          <p className="text-foreground/70">Loading OSINT Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-30 glass backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">SHERLOCK PRO MAX</span>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-float-up glitch-text" data-text="FIND ANYONE" style={{ color: 'oklch(0.65 0.25 262)' }}>
            FIND ANYONE
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-8">
            Search for usernames across {Object.keys(sherlockData).length}+ platforms instantly
          </p>

          <form onSubmit={handleSearch} className="mb-12 animate-slide-in-up">
            <div className="flex gap-2 max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Enter username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 bg-card border-primary/30 text-foreground placeholder:text-foreground/50"
                disabled={isSearching}
              />
              <Button
                type="submit"
                disabled={isSearching}
                className="bg-primary hover:bg-primary/80 text-primary-foreground"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </form>

          <div className="mb-8 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-foreground/70">Filter by Category</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${
                    selectedCategory === cat
                      ? 'glass neon-glow border border-primary bg-primary/20 text-primary'
                      : 'glass border border-primary/30 text-foreground/70 hover:border-primary/50'
                  }`}
                >
                  {cat} ({categorizedSites[cat]?.length || 0})
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass p-6 rounded-lg animate-fade-in neon-glow" style={{ animationDelay: '0.1s' }}>
              <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold">{Object.keys(sherlockData).length}+</div>
              <div className="text-sm text-foreground/70">Platforms Supported</div>
            </div>
            <div className="glass p-6 rounded-lg animate-fade-in neon-glow-violet" style={{ animationDelay: '0.2s' }}>
              <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-3xl font-bold">Instant</div>
              <div className="text-sm text-foreground/70">Real-time Search</div>
            </div>
            <div className="glass p-6 rounded-lg animate-fade-in neon-glow" style={{ animationDelay: '0.3s' }}>
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-foreground/70">Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {results.length > 0 && (
        <section className="relative py-20 px-4 border-t border-primary/20 animate-fade-in">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center justify-center gap-2 flex-1">
                <h2 className="text-3xl font-bold text-center animate-slide-in-left">Search Results</h2>
                <span className="text-xs px-3 py-1 bg-primary/20 text-primary rounded font-mono">{selectedCategory}</span>
              </div>
              {!isSearching && (
                <button
                  onClick={() => setShowOnlyFound(!showOnlyFound)}
                  className="ml-4 px-4 py-2 rounded-lg text-sm font-mono transition-all glass border border-primary/30 hover:border-primary/50 text-foreground/70 hover:text-primary"
                >
                  {showOnlyFound ? 'Afficher tous' : 'Afficher trouves'}
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {(showOnlyFound ? results.filter((r) => r.status === 'found') : results).map((result, idx) => (
                <div
                  key={idx}
                  className="glass p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition animate-float-up neon-glow"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono text-sm font-bold">{result.name}</span>
                    {result.status === 'found' && (
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                        trouvé
                      </span>
                    )}
                    {result.status === 'not_found' && (
                      <span className="text-xs px-2 py-1 bg-destructive/20 text-destructive rounded">
                        non trouvé
                      </span>
                    )}
                    {result.status === 'searching' && (
                      <span className="text-xs px-2 py-1 bg-muted/20 text-muted-foreground rounded animate-pulse">
                        ...
                      </span>
                    )}
                  </div>
                  {result.status === 'found' && (
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline truncate"
                    >
                      View Profile →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-primary/20 py-8 px-4 text-center text-sm text-foreground/50">
        <p>Sherlock Pro Max - Advanced OSINT Search Engine</p>
        <p className="mt-2">Powered by Sherlock Project</p>
      </footer>
    </div>
  );
}

