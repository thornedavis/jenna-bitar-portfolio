import { getAllArtworkSlugs } from '@/lib/sanity';
import ArtworkDetailClient from './ArtworkDetailClient';

// Pre-generate all artwork pages at build time for static export
// The client component will still fetch fresh data when the page loads
export async function generateStaticParams() {
    try {
        const artworks = await getAllArtworkSlugs();
        return artworks.map((artwork) => ({
            slug: artwork.slug,
        }));
    } catch (error) {
        console.error('Error fetching artwork slugs:', error);
        return [];
    }
}

export const metadata = {
    title: 'Artwork | Jenna Bitar',
    description: 'View artwork details by Jenna Bitar',
};

export default function ArtworkPage() {
    return <ArtworkDetailClient />;
}
