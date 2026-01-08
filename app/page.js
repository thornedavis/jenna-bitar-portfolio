import { getCollectionsWithArtworks, getSiteSettings } from '@/lib/sanity';
import HomeClient from './HomeClient';

// Fallback data for when Sanity isn't configured yet
import artworksData from '@/data/artworks.json';
import contentData from '@/data/content.json';

export default async function Home() {
  let collections;
  let settings;

  try {
    // Try to fetch from Sanity
    collections = await getCollectionsWithArtworks();
    settings = await getSiteSettings();

    // If Sanity returns empty data, use fallback
    if (!collections || collections.length === 0) {
      collections = artworksData.series;
    }
    if (!settings) {
      settings = {
        artistName: contentData.artist.name,
        shortBio: contentData.artist.shortBio,
        fullBio: contentData.artist.fullBio,
      };
    }
  } catch (error) {
    // Fallback to local JSON if Sanity isn't configured
    console.log('Using fallback data (Sanity not configured):', error.message);
    collections = artworksData.series;
    settings = {
      artistName: contentData.artist.name,
      shortBio: contentData.artist.shortBio,
      fullBio: contentData.artist.fullBio,
    };
  }

  return <HomeClient collections={collections} settings={settings} />;
}
