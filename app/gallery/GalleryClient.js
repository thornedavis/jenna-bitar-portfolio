'use client';

import { useState, useEffect } from 'react';
import InfiniteCarousel from '@/components/InfiniteCarousel';
import ArtworkModal from '@/components/ArtworkModal';
import { client } from '@/lib/sanity';

// Query to fetch collections with artworks
const collectionsQuery = `
    *[_type == "collection"] | order(order asc) {
        _id,
        name,
        "slug": slug.current,
        description,
        order,
        "artworks": *[_type == "artwork" && references(^._id)] | order(order asc) {
            _id,
            title,
            "slug": slug.current,
            "image": images[0],
            images,
            dimensions,
            medium,
            year,
            available,
            description,
            artworkInformation,
            framing,
            shipping,
            order
        }
    }
`;

export default function GalleryClient() {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchCollections() {
            try {
                const data = await client.fetch(collectionsQuery);
                setCollections(data || []);
            } catch (error) {
                console.error('Error fetching collections:', error);
                setCollections([]);
            } finally {
                setLoading(false);
            }
        }
        fetchCollections();
    }, []);

    const handleArtworkClick = (artwork) => {
        setSelectedArtwork(artwork);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedArtwork(null), 300);
    };

    // Transform data to match expected format
    const series = collections.map(collection => ({
        id: collection._id || collection.id,
        name: collection.name,
        artworks: collection.artworks || [],
    }));

    if (loading) {
        return (
            <div className="page">
                <h1 style={{ padding: '0 4rem', marginBottom: '3rem' }}>Gallery</h1>
                <div style={{ padding: '0 4rem', color: '#888' }}>Loading...</div>
            </div>
        );
    }

    return (
        <div className="page">
            <h1 style={{ padding: '0 4rem', marginBottom: '3rem' }}>Gallery</h1>

            {series.map((s) => (
                <InfiniteCarousel
                    key={s.id}
                    artworks={s.artworks}
                    seriesName={s.name}
                    onArtworkClick={handleArtworkClick}
                />
            ))}

            <ArtworkModal
                artwork={selectedArtwork}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
}
