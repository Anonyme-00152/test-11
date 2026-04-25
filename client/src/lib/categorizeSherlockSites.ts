export interface CategorizedSite {
  name: string;
  url: string;
  category: string;
  urlMain: string;
}

export const SITE_CATEGORIES = {
  'Social Media': [
    'Twitter', 'Facebook', 'Instagram', 'TikTok', 'Snapchat', 'LinkedIn', 'Pinterest',
    'Reddit', 'Mastodon', 'Bluesky', 'Threads', 'Tumblr', 'WeChat', 'WhatsApp',
    'Telegram', 'Discord', 'Slack', 'Viber', 'Signal', 'Nextdoor', 'Quora',
    'Medium', 'Dev.to', 'Hashnode', 'BeReal', 'Vimeo', 'Dailymotion', 'YouTube',
    'Twitch', 'Kick', 'Rumble', 'Odysee', 'Bitchute', 'Gettr', 'Truth Social',
    'Gab', 'Parler', 'Mewe', 'Minds', 'Pixelfed', 'Peertube', 'Lemmy',
    'Kbin', 'Threads', 'Bluesky', 'Nostr', 'Farcaster', 'Lens', 'Mastodon',
  ],
  'Professional Networks': [
    'LinkedIn', 'GitHub', 'GitLab', 'Bitbucket', 'Stack Overflow', 'HackerNews',
    'Dev.to', 'Hashnode', 'Medium', 'Substack', 'Patreon', 'Ko-fi', 'Buy Me A Coffee',
    'Gumroad', 'Etsy', 'Fiverr', 'Upwork', 'Freelancer', 'PeoplePerHour',
    'Toptal', 'Guru', 'Behance', 'Dribbble', 'ArtStation', 'DeviantArt',
  ],
  'Dating & Relationships': [
    'Tinder', 'Bumble', 'Hinge', 'Match', 'OkCupid', 'Plenty of Fish', 'eHarmony',
    'Badoo', 'Grindr', 'Scruff', 'Jackd', 'Feeld', 'OkCupid', 'Zoosk',
    'Meetme', 'Tagged', 'Skout', 'Yubo', 'Omegle', 'Chatroulette',
  ],
  'Gaming & Entertainment': [
    'Steam', 'Epic Games', 'GOG', 'Ubisoft', 'Origin', 'Battle.net', 'PlayStation',
    'Xbox', 'Nintendo', 'Twitch', 'YouTube Gaming', 'Mixer', 'Kick', 'Rumble',
    'Roblox', 'Fortnite', 'Minecraft', 'Discord', 'Reddit', 'Imgur',
    'MyAnimeList', 'AniList', 'Mangadex', 'Crunchyroll', 'Netflix', 'Disney+',
    'HBO Max', 'Hulu', 'Prime Video', 'Apple TV+', 'Peacock', 'Paramount+',
  ],
  'Forums & Communities': [
    'Reddit', 'Discord', 'Slack', 'Telegram', 'WhatsApp', 'Signal', 'Viber',
    'Nextdoor', 'Quora', 'Stack Exchange', 'Stack Overflow', 'Lemmy', 'Kbin',
    '4chan', '8kun', 'Voat', 'Gab', 'Parler', 'Truth Social', 'Gettr',
    'Minds', 'Pixelfed', 'Peertube', 'Mastodon', 'Bluesky', 'Threads',
  ],
  'Blogging & Publishing': [
    'Medium', 'Dev.to', 'Hashnode', 'Substack', 'Ghost', 'WordPress', 'Blogger',
    'Tumblr', 'Wix', 'Squarespace', 'Weebly', 'Joomla', 'Drupal', 'Statamic',
    'Craft CMS', 'Contentful', 'Strapi', 'Sanity', 'Webflow', 'Notion',
  ],
  'E-commerce': [
    'Amazon', 'eBay', 'Etsy', 'Shopify', 'WooCommerce', 'Magento', 'BigCommerce',
    'Alibaba', 'AliExpress', 'Wish', 'Wayfair', 'Overstock', 'Walmart', 'Target',
    'Best Buy', 'Newegg', 'Micro Center', 'B&H Photo', 'Adorama', 'Sweetwater',
  ],
  'Streaming & Media': [
    'Netflix', 'Disney+', 'Hulu', 'HBO Max', 'Prime Video', 'Apple TV+', 'Peacock',
    'Paramount+', 'Crunchyroll', 'Funimation', 'HIDIVE', 'Spotify', 'Apple Music',
    'Amazon Music', 'YouTube Music', 'Tidal', 'Deezer', 'Pandora', 'SoundCloud',
    'Bandcamp', 'Twitch', 'YouTube', 'Vimeo', 'Dailymotion', 'Rumble', 'Odysee',
  ],
  'Developer Tools': [
    'GitHub', 'GitLab', 'Bitbucket', 'Stack Overflow', 'HackerNews', 'Dev.to',
    'Hashnode', 'NPM', 'PyPI', 'Cargo', 'Maven', 'NuGet', 'RubyGems',
    'Packagist', 'CPAN', 'CRAN', 'Homebrew', 'Chocolatey', 'Snap', 'Flatpak',
  ],
  'Photo & Video': [
    'Flickr', 'Picasa', 'SmugMug', 'Zenfolio', 'Photobucket', 'ImageShack',
    'Imgur', 'Giphy', 'Tenor', 'YouTube', 'Vimeo', 'Dailymotion', 'Rumble',
    'Odysee', 'Bitchute', 'Peertube', 'Instagram', 'TikTok', 'Snapchat',
    'Pinterest', 'WeChat', 'Viber', 'Telegram', 'Signal', 'WhatsApp',
  ],
  'Music & Audio': [
    'Spotify', 'Apple Music', 'Amazon Music', 'YouTube Music', 'Tidal', 'Deezer',
    'Pandora', 'SoundCloud', 'Bandcamp', 'Last.fm', 'MusicBrainz', 'Discogs',
    'Genius', 'AZLyrics', 'Genius', 'Musixmatch', 'Shazam', 'Beatport',
  ],
  'News & Media': [
    'BBC', 'CNN', 'Reuters', 'AP News', 'BBC', 'The Guardian', 'New York Times',
    'Washington Post', 'Wall Street Journal', 'Financial Times', 'The Economist',
    'Medium', 'Dev.to', 'Hashnode', 'Substack', 'Patreon', 'Substack',
  ],
  'All': [],
};

export function categorizeSherlockSites(
  sites: Record<string, any>
): Record<string, CategorizedSite[]> {
  const categorized: Record<string, CategorizedSite[]> = {};

  // Initialize all categories
  Object.keys(SITE_CATEGORIES).forEach((cat) => {
    categorized[cat] = [];
  });

  // Categorize each site
  for (const [siteName, siteData] of Object.entries(sites)) {
    if (siteName === '$schema') continue;

    let foundCategory = false;

    // Check if site name matches any category keywords
    for (const [category, keywords] of Object.entries(SITE_CATEGORIES)) {
      if (category === 'All') continue;

      if (keywords.some((keyword) => siteName.toLowerCase().includes(keyword.toLowerCase()))) {
        categorized[category].push({
          name: siteName,
          url: siteData.url,
          category,
          urlMain: siteData.urlMain,
        });
        foundCategory = true;
        break;
      }
    }

    // If not categorized, add to "Other"
    if (!foundCategory) {
      if (!categorized['Other']) {
        categorized['Other'] = [];
      }
      categorized['Other'].push({
        name: siteName,
        url: siteData.url,
        category: 'Other',
        urlMain: siteData.urlMain,
      });
    }
  }

  // Populate "All" category
  categorized['All'] = Object.values(categorized)
    .flat()
    .filter((site) => site.category !== 'All');

  return categorized;
}

export function getTopCategories(): string[] {
  return [
    'All',
    'Social Media',
    'Professional Networks',
    'Forums & Communities',
    'Developer Tools',
    'Streaming & Media',
    'E-commerce',
    'Gaming & Entertainment',
    'Other',
  ];
}
