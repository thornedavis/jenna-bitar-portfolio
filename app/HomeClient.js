'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SeriesSection from '@/components/SeriesSection';
import ArtworkModal from '@/components/ArtworkModal';
import FeatureCarousel from '@/components/FeatureCarousel';
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

// Query to fetch site settings
const settingsQuery = `
    *[_type == "siteSettings"][0] {
        artistName,
        tagline,
        shortBio,
        fullBio,
        profileImage,
        email,
        instagram,
        instagramUrl
    }
`;

export default function HomeClient() {
    const [collections, setCollections] = useState([]);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const [collectionsData, settingsData] = await Promise.all([
                    client.fetch(collectionsQuery),
                    client.fetch(settingsQuery),
                ]);
                setCollections(collectionsData || []);
                setSettings(settingsData || {});
            } catch (error) {
                console.error('Error fetching data:', error);
                setCollections([]);
                setSettings({});
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

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
                            Jenna is a contemporary abstract artist raised and based in Bali, where nature is both her studio and her greatest source of inspiration. Having grown up immersed in the island's elemental landscapes and spiritual rhythms, her work is shaped by a deep connection to the natural world and the patterns that quietly govern it. She works with mixed media often creating her own materials from organic derivatives such as seeds, natural inks, clay, sand, volcanic ash, tea, and leaf tints allowing the earth itself to become part of each composition.
                        </p>
                        <p className="artist-intro-bio">
                            Her practice explores patterns found across the micro and macrocosm, from the veins of a leaf to the lines of dried canyons and the ripples left by wind and water. These natural repetitions speak to a deeper meaning and order within life, forming the foundation of her visual language. Through layered textures and meditative forms, Jenna creates contemplative works that invite stillness, reflection, and a gentle reconnection to the rhythms of nature.
                        </p>
                    </div>
                    <div className="artist-intro-divider"></div>
                </div>
            </section>

            <section style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                {loading ? (
                    <div style={{ padding: '0 4rem', color: '#888' }}>Loading artworks...</div>
                ) : (
                    series.map((s) => (
                        <SeriesSection
                            key={s.id}
                            series={s}
                            onArtworkClick={handleArtworkClick}
                        />
                    ))
                )}
            </section>

            <FeatureCarousel />

            <ArtworkModal
                artwork={selectedArtwork}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}
