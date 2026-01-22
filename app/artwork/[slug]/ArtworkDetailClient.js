'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageCarousel from '@/components/ImageCarousel';
import Accordion from '@/components/Accordion';
import { client } from '@/lib/sanity';
import styles from './ArtworkDetail.module.css';

// Query to fetch artwork by slug
const artworkQuery = `
    *[_type == "artwork" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        images,
        dimensions,
        medium,
        year,
        available,
        description,
        artworkInformation,
        framing,
        shipping,
        "collection": collection->{
            _id,
            name,
            "slug": slug.current
        }
    }
`;

export default function ArtworkDetailClient() {
    const params = useParams();
    const router = useRouter();
    const [artwork, setArtwork] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openAccordion, setOpenAccordion] = useState(null);

    useEffect(() => {
        async function fetchArtwork() {
            if (!params.slug) return;

            try {
                const data = await client.fetch(artworkQuery, { slug: params.slug });
                setArtwork(data);
            } catch (error) {
                console.error('Error fetching artwork:', error);
                setArtwork(null);
            } finally {
                setLoading(false);
            }
        }
        fetchArtwork();
    }, [params.slug]);

    const handleRequest = () => {
        if (artwork) {
            router.push(`/contact?painting=${encodeURIComponent(artwork.title)}`);
        }
    };

    const handleAccordionToggle = (accordionId) => {
        setOpenAccordion(openAccordion === accordionId ? null : accordionId);
    };

    if (loading) {
        return (
            <div className={styles.page}>
                <Link href="/gallery" className={styles.backLink}>
                    &lt; Back to gallery
                </Link>
                <div style={{ padding: '2rem', color: '#888' }}>Loading...</div>
            </div>
        );
    }

    if (!artwork) {
        return (
            <div className={styles.page}>
                <Link href="/gallery" className={styles.backLink}>
                    &lt; Back to gallery
                </Link>
                <div style={{ padding: '2rem' }}>Artwork not found</div>
            </div>
        );
    }

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

                    {artwork.available !== false ? (
                        <button
                            className={styles.requestButton}
                            onClick={handleRequest}
                        >
                            REQUEST →
                        </button>
                    ) : (
                        <div className={styles.soldIndicator}>
                            <span className={styles.soldDot}></span>
                            SOLD
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
