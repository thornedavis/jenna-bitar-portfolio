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
            </section>

            {/* Artist Intro Section */}
            <section className="artist-intro">
                <div className="container">
                    <div className="artist-intro-grid">
                        <p className="artist-intro-bio">
                            Jenna Bitar is a Bali-based contemporary artist of French-Lebanese origin. Having moved to the island at a young age, she has spent most of her life immersed in the rich textures, vibrant colors, and spiritual rhythms of Indonesian culture. Her work explores the intersection of color, texture, and emotion through various mediums including oil painting, acrylics, and mixed media.
                        </p>
                        <p className="artist-intro-bio">
                            Drawing inspiration from Bali's natural landscapes, organic forms, and the subtle interplay of light and shadow, each piece invites contemplation and connection. Her practice is rooted in a deep reverence for the natural world and the ways in which materials can evoke memory, sensation, and feeling—inviting viewers to pause and discover the quiet beauty within each composition.
                        </p>
                    </div>
                    <div className="artist-intro-divider"></div>
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
