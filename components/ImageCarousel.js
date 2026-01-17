'use client';

import { useState } from 'react';
import { urlFor } from '@/lib/sanity';
import styles from './ImageCarousel.module.css';

export default function ImageCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className={styles.placeholder}>
                No images available
            </div>
        );
    }

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const getImageUrl = (image) => {
        if (image?.asset) {
            return urlFor(image).width(800).auto('format').quality(85).url();
        }
        return image;
    };

    return (
        <div className={styles.carousel}>
            <div className={styles.imageContainer}>
                {images.length > 1 && (
                    <button
                        className={`${styles.arrow} ${styles.arrowLeft}`}
                        onClick={goToPrevious}
                        aria-label="Previous image"
                    >
                        ‹
                    </button>
                )}

                <img
                    src={getImageUrl(images[currentIndex])}
                    alt={`Image ${currentIndex + 1}`}
                    className={styles.image}
                />

                {images.length > 1 && (
                    <button
                        className={`${styles.arrow} ${styles.arrowRight}`}
                        onClick={goToNext}
                        aria-label="Next image"
                    >
                        ›
                    </button>
                )}
            </div>

            {images.length > 1 && (
                <div className={styles.dots}>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
