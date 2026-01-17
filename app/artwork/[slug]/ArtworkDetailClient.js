'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageCarousel from '@/components/ImageCarousel';
import Accordion from '@/components/Accordion';
import styles from './ArtworkDetail.module.css';

export default function ArtworkDetailClient({ artwork }) {
    const router = useRouter();
    const [openAccordion, setOpenAccordion] = useState(null);

    const handleRequest = () => {
        router.push(`/contact?painting=${encodeURIComponent(artwork.title)}`);
    };

    const handleAccordionToggle = (accordionId) => {
        setOpenAccordion(openAccordion === accordionId ? null : accordionId);
    };

    return (
        <div className={styles.page}>
            <Link href="/gallery" className={styles.backLink}>
                &lt; Back to gallery
            </Link>

            <div className={styles.container}>
                <div className={styles.imageSection}>
                    <ImageCarousel images={artwork.images} />
                </div>

                <div className={styles.infoSection}>
                    <h1 className={styles.title}>{artwork.title}</h1>

                    <div className={styles.meta}>
                        {artwork.year && <p className={styles.year}>{artwork.year}</p>}
                        {artwork.dimensions && <p className={styles.dimensions}>{artwork.dimensions}</p>}
                        {artwork.medium && <p className={styles.medium}>{artwork.medium}</p>}
                    </div>

                    {artwork.description && (
                        <div className={styles.description}>
                            {artwork.description.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    )}

                    <div className={styles.accordions}>
                        <Accordion
                            title="Artwork Information"
                            isOpen={openAccordion === 'info'}
                            onToggle={() => handleAccordionToggle('info')}
                        >
                            {artwork.artworkInformation}
                        </Accordion>
                        <Accordion
                            title="Framing"
                            isOpen={openAccordion === 'framing'}
                            onToggle={() => handleAccordionToggle('framing')}
                        >
                            {artwork.framing}
                        </Accordion>
                        <Accordion
                            title="Shipping"
                            isOpen={openAccordion === 'shipping'}
                            onToggle={() => handleAccordionToggle('shipping')}
                        >
                            {artwork.shipping}
                        </Accordion>
                    </div>

                    <button
                        className={styles.requestButton}
                        onClick={handleRequest}
                    >
                        REQUEST →
                    </button>
                </div>
            </div>
        </div>
    );
}
