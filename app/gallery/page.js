import { getCollectionsWithArtworks } from '@/lib/sanity';
import GalleryClient from './GalleryClient';

// Fallback data
import artworksData from '@/data/artworks.json';

export default async function Gallery() {
    let collections;

    try {
        collections = await getCollectionsWithArtworks();

        if (!collections || collections.length === 0) {
            collections = artworksData.series;
        }
    } catch (error) {
        console.log('Using fallback data:', error.message);
        collections = artworksData.series;
    }

    return <GalleryClient collections={collections} />;
}
