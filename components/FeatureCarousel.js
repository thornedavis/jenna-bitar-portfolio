'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// Collaboration images - 9x16 portrait format, shown in pairs
const carouselImages = [
    '/images/collaborations/jenna-bitar-art-maison-margiela-1.webp',
    '/images/collaborations/jenna-bitar-art-maison-margiela-2.webp',
    '/images/collaborations/jenna-bitar-art-maison-margiela-3.webp',
    '/images/collaborations/jenna-bitar-art-maison-margiela-4.webp',
    '/images/collaborations/jenna-bitar-art-maison-margiela-5.webp',
    '/images/collaborations/jenna-bitar-art-maison-margiela-6.webp',
];

// Group images into pairs for display
const getImagePairs = () => {
    const pairs = [];
    for (let i = 0; i < carouselImages.length; i += 2) {
        pairs.push(carouselImages.slice(i, i + 2));
    }
    return pairs;
};

export default function FeatureCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const imagePairs = getImagePairs();

    const goToSlide = useCallback((index) => {
        setCurrentIndex(index);
    }, []);

    // Auto-pagination
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imagePairs.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [imagePairs.length]);

    return (
        <section className="feature-carousel-section">
            <div className="container">
                <div className="feature-carousel-grid">
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        paddingBottom: '2rem'
                    }}>
                        <h2 style={{ marginBottom: '0.5rem' }}>Jenna Bitar x Maison Margiela</h2>
                        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.8 }}>From the Garden</p>
                        <p style={{ marginBottom: '1.5rem', maxWidth: '480px', lineHeight: 1.7 }}>
                            For Maison Margiela Fragrances' Replica series and their fragrance From the Garden, I collaborated with the brand to translate scent into visual language. The project centered on my studio practice in Bali, weaving together my relationship with nature, material, and memory.
                        </p>
                        <p style={{ marginBottom: '1.5rem', maxWidth: '480px', lineHeight: 1.7 }}>
                            We filmed at the base of a volcano on a tomato farm, where I gathered tomato leaves to create natural pigments and collected volcanic ash to add to my apothecary of organic mediums. These elements drawn directly from the environment that inspired the fragrance's top notes were incorporated into an artwork created specifically for From the Garden.
                        </p>
                        <p style={{ marginBottom: '1.5rem', maxWidth: '480px', lineHeight: 1.7 }}>
                            The film follows my process from foraging to making, blending storytelling with material experimentation as I narrated my journey as an artist. It is an exploration of how scent, place, and creative ritual intersect capturing the essence of From the Garden through earth, pigment, and motion.
                        </p>
                        <a
                            href="https://www.instagram.com/p/DFF8Crft7GN/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-link"
                        >
                            Watch the film →
                        </a>
                    </div>
                    <div className="feature-carousel-images">
                        {/* Carousel - showing pairs of images */}
                        <div style={{
                            display: 'flex',
                            transition: 'transform 0.6s ease-in-out',
                            transform: `translateX(-${currentIndex * 100}%)`,
                            height: '100%',
                        }}>
                            {imagePairs.map((pair, pairIndex) => (
                                <div
                                    key={pairIndex}
                                    style={{
                                        minWidth: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        gap: '1rem',
                                        padding: '0',
                                    }}
                                >
                                    {pair.map((src, imgIndex) => (
                                        <div
                                            key={imgIndex}
                                            style={{
                                                flex: 1,
                                                height: '100%',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <img
                                                src={src}
                                                alt={`Jenna Bitar x Maison Margiela ${pairIndex * 2 + imgIndex + 1}`}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Dot Indicators */}
                        <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '10px',
                            zIndex: 10,
                        }}>
                            {imagePairs.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        border: 'none',
                                        backgroundColor: currentIndex === index ? '#1a1a1a' : 'rgba(255, 255, 255, 0.7)',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease',
                                        padding: 0,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
