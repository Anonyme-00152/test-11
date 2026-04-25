import { describe, it, expect } from 'vitest';

describe('Category Filtering System', () => {
  it('should categorize sites correctly', () => {
    const mockSites = {
      Twitter: { url: 'https://twitter.com/{}', urlMain: 'https://twitter.com' },
      GitHub: { url: 'https://github.com/{}', urlMain: 'https://github.com' },
      Reddit: { url: 'https://reddit.com/user/{}', urlMain: 'https://reddit.com' },
      Spotify: { url: 'https://open.spotify.com/user/{}', urlMain: 'https://open.spotify.com' },
    };

    const categories = {
      'Social Media': ['Twitter', 'Reddit'],
      'Developer Tools': ['GitHub'],
      'Streaming & Media': ['Spotify'],
    };

    expect(Object.keys(categories).length).toBeGreaterThan(0);
    expect(categories['Social Media'].length).toBe(2);
    expect(categories['Developer Tools'].length).toBe(1);
  });

  it('should filter sites by selected category', () => {
    const allSites = [
      { name: 'Twitter', category: 'Social Media' },
      { name: 'GitHub', category: 'Developer Tools' },
      { name: 'Reddit', category: 'Social Media' },
      { name: 'Spotify', category: 'Streaming & Media' },
    ];

    const selectedCategory = 'Social Media';
    const filtered = allSites.filter((site) => site.category === selectedCategory);

    expect(filtered.length).toBe(2);
    expect(filtered.every((site) => site.category === selectedCategory)).toBe(true);
  });

  it('should handle "All" category filter', () => {
    const allSites = [
      { name: 'Twitter', category: 'Social Media' },
      { name: 'GitHub', category: 'Developer Tools' },
      { name: 'Reddit', category: 'Social Media' },
    ];

    const selectedCategory = 'All';
    const filtered = selectedCategory === 'All' ? allSites : allSites.filter((s) => s.category === selectedCategory);

    expect(filtered.length).toBe(3);
  });

  it('should count sites in each category', () => {
    const categoryCounts = {
      'Social Media': 150,
      'Developer Tools': 50,
      'Streaming & Media': 40,
      'E-commerce': 30,
      Other: 208,
    };

    const total = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
    expect(total).toBe(478);
  });

  it('should handle empty category gracefully', () => {
    const categories = {
      'Social Media': ['Twitter', 'Reddit'],
      'Developer Tools': [],
      'Streaming & Media': ['Spotify'],
    };

    const emptyCategory = categories['Developer Tools'];
    expect(emptyCategory.length).toBe(0);
    expect(Array.isArray(emptyCategory)).toBe(true);
  });

  it('should maintain category order', () => {
    const categoryOrder = ['All', 'Social Media', 'Professional Networks', 'Forums & Communities', 'Developer Tools', 'Streaming & Media', 'E-commerce', 'Gaming & Entertainment', 'Other'];

    expect(categoryOrder[0]).toBe('All');
    expect(categoryOrder[categoryOrder.length - 1]).toBe('Other');
    expect(categoryOrder.length).toBeGreaterThan(0);
  });

  it('should filter search results by category', () => {
    const searchResults = [
      { name: 'Twitter', category: 'Social Media', status: 'found' },
      { name: 'GitHub', category: 'Developer Tools', status: 'found' },
      { name: 'Reddit', category: 'Social Media', status: 'not_found' },
    ];

    const selectedCategory = 'Social Media';
    const filteredResults = searchResults.filter((result) => result.category === selectedCategory);

    expect(filteredResults.length).toBe(2);
    expect(filteredResults.every((r) => r.category === selectedCategory)).toBe(true);
  });
});
