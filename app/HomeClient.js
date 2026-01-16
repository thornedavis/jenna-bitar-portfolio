'use client';

import { useState } from 'react';
import Link from 'next/link';
import SeriesSection from '@/components/SeriesSection';
import ArtworkModal from '@/components/ArtworkModal';

export default function HomeClient({ collections, settings }) {
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

    // Transform Sanity data to match expected format
    const series = collections.map(collection => ({
        id: collection._id || collection.id,
        name: collection.name,
        artworks: collection.artworks || [],
    }));

    return (
        <>
            <section className="hero">
                {/* Background Video */}
                <video
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/hero-poster.jpg"
                >
                    <source src="/video/jenna-bitar-art-hero-video.mp4" type="video/mp4" />
                </video>
                <div className="hero-overlay" />

                <div className="container">
                    <h1 className="hero-title">{settings?.artistName || 'Artist Name'}</h1>
                    <p className="hero-subtitle">{settings?.shortBio || ''}</p>
                    <Link href="/gallery" style={{
                        display: 'inline-block',
                        marginTop: '2rem',
                        padding: '1rem 2rem',
                        border: '1px solid #fff',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        transition: 'all 0.3s ease',
                        color: '#fff'
                    }}>
                        View Gallery
                    </Link>
                </div>
            </section>

            <section style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                {series.map((s) => (
                    <SeriesSection
                        key={s.id}
                        series={s}
                        onArtworkClick={handleArtworkClick}
                    />
                ))}
            </section>

            <section style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '4rem',
                        minHeight: '500px'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            paddingBottom: '2rem'
                        }}>
                            <h2 style={{ marginBottom: '1.5rem' }}>About the Artist</h2>
                            <p style={{ marginBottom: '1.5rem', maxWidth: '450px' }}>{settings?.shortBio || ''}</p>
                            <Link href="/about" className="text-link">
                                Find out more →
                            </Link>
                        </div>
                        <div style={{
                            background: '#a8a8a8',
                            width: '100%',
                            height: '500px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#666'
                        }}>
                            Artist Photo
                        </div>
                    </div>
                </div>
            </section>

            <ArtworkModal
                artwork={selectedArtwork}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}
