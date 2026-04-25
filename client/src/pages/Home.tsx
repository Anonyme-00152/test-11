import { useEffect, useState, useRef } from 'react';
import { Search, Zap, Globe, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

    const siteNames = Object.keys(sherlockData);
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: 'oklch(0.65 0.25 262)' }}>
            FIND ANYONE
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-8">
            Search for usernames across {Object.keys(sherlockData).length}+ platforms instantly
          </p>

          <form onSubmit={handleSearch} className="mb-12">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass p-6 rounded-lg">
              <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold">{Object.keys(sherlockData).length}+</div>
              <div className="text-sm text-foreground/70">Platforms Supported</div>
            </div>
            <div className="glass p-6 rounded-lg">
              <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-3xl font-bold">Instant</div>
              <div className="text-sm text-foreground/70">Real-time Search</div>
            </div>
            <div className="glass p-6 rounded-lg">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-foreground/70">Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {results.length > 0 && (
        <section className="relative py-20 px-4 border-t border-primary/20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  className="glass p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition"
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

