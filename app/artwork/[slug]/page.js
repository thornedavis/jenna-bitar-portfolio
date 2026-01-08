import { getArtworkBySlug, getAllArtworkSlugs } from '@/lib/sanity';
import ArtworkDetailClient from './ArtworkDetailClient';
import { notFound } from 'next/navigation';

// Generate static params for all artworks
export async function generateStaticParams() {
    const artworks = await getAllArtworkSlugs();
    return artworks.map((artwork) => ({
        slug: artwork.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const artwork = await getArtworkBySlug(slug);

    if (!artwork) {
        return { title: 'Artwork Not Found' };
    }

    return {
        title: `${artwork.title} | Jenna Bitar`,
        description: artwork.description?.substring(0, 160) || `${artwork.title} - ${artwork.medium}`,
    };
}

export default async function ArtworkPage({ params }) {
    const { slug } = await params;
    const artwork = await getArtworkBySlug(slug);

    if (!artwork) {
        notFound();
    }

    return <ArtworkDetailClient artwork={artwork} />;
}
