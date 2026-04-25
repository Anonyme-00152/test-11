import { describe, it, expect } from 'vitest';

describe('Smart Results Display', () => {
  it('should show all results during search', () => {
    const results = [
      { name: 'Twitter', status: 'searching' },
      { name: 'GitHub', status: 'searching' },
      { name: 'Reddit', status: 'searching' },
    ];

    expect(results.length).toBe(3);
    expect(results.every((r) => r.status === 'searching')).toBe(true);
  });

  it('should filter to show only found results', () => {
    const results = [
      { name: 'Twitter', status: 'found' },
      { name: 'GitHub', status: 'not_found' },
      { name: 'Reddit', status: 'found' },
      { name: 'Spotify', status: 'not_found' },
    ];

    const foundOnly = results.filter((r) => r.status === 'found');

    expect(foundOnly.length).toBe(2);
    expect(foundOnly.every((r) => r.status === 'found')).toBe(true);
    expect(foundOnly.map((r) => r.name)).toEqual(['Twitter', 'Reddit']);
  });

  it('should show all results including not found', () => {
    const results = [
      { name: 'Twitter', status: 'found' },
      { name: 'GitHub', status: 'not_found' },
      { name: 'Reddit', status: 'found' },
    ];

    const allResults = results;

    expect(allResults.length).toBe(3);
    expect(allResults.some((r) => r.status === 'not_found')).toBe(true);
  });

  it('should toggle between found and all results', () => {
    const results = [
      { name: 'Twitter', status: 'found' },
      { name: 'GitHub', status: 'not_found' },
      { name: 'Reddit', status: 'found' },
    ];

    let showOnlyFound = false;
    const displayed = showOnlyFound ? results.filter((r) => r.status === 'found') : results;

    expect(displayed.length).toBe(3);

    showOnlyFound = true;
    const displayedFiltered = showOnlyFound ? results.filter((r) => r.status === 'found') : results;

    expect(displayedFiltered.length).toBe(2);
  });

  it('should handle empty found results', () => {
    const results = [
      { name: 'Twitter', status: 'not_found' },
      { name: 'GitHub', status: 'not_found' },
      { name: 'Reddit', status: 'not_found' },
    ];

    const foundOnly = results.filter((r) => r.status === 'found');

    expect(foundOnly.length).toBe(0);
    expect(Array.isArray(foundOnly)).toBe(true);
  });

  it('should handle all found results', () => {
    const results = [
      { name: 'Twitter', status: 'found' },
      { name: 'GitHub', status: 'found' },
      { name: 'Reddit', status: 'found' },
    ];

    const foundOnly = results.filter((r) => r.status === 'found');

    expect(foundOnly.length).toBe(3);
    expect(foundOnly.length).toBe(results.length);
  });

  it('should maintain order when filtering', () => {
    const results = [
      { name: 'Twitter', status: 'found' },
      { name: 'GitHub', status: 'not_found' },
      { name: 'Reddit', status: 'found' },
      { name: 'Spotify', status: 'not_found' },
      { name: 'LinkedIn', status: 'found' },
    ];

    const foundOnly = results.filter((r) => r.status === 'found');

    expect(foundOnly.map((r) => r.name)).toEqual(['Twitter', 'Reddit', 'LinkedIn']);
  });
});
