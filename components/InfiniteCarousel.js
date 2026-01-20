'use client';

import { useRef } from 'react';
import ArtworkCard from './ArtworkCard';
import styles from './InfiniteCarousel.module.css';

export default function InfiniteCarousel({ artworks, seriesName, onArtworkClick }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const cardWidth = 300 + 24; // card width + gap
        const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;

        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>{seriesName}</h2>
                <div className={styles.arrows}>
                    <button
                        className={styles.arrow}
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        ‹
                    </button>
                    <button
                        className={styles.arrow}
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                    >
                        ›
                    </button>
                </div>
            </div>
            <div className={styles.carousel} ref={scrollRef}>
                <div className={styles.scrollContent}>
                    {artworks.map((artwork) => (
                        <div key={artwork._id || artwork.id} className={styles.cardWrapper}>
                            <ArtworkCard
                                artwork={artwork}
                                onClick={onArtworkClick}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
