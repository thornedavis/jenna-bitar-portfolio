'use client';

import { useState } from 'react';
import InfiniteCarousel from '@/components/InfiniteCarousel';
import ArtworkModal from '@/components/ArtworkModal';

export default function GalleryClient({ collections }) {
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
