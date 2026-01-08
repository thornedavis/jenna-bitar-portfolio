'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { urlFor } from '@/lib/sanity';

export default function ArtworkCard({ artwork, onClick }) {
    const router = useRouter();

    const handleRequestClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        router.push(`/contact?painting=${encodeURIComponent(artwork.title)}`);
    };

    // Handle both Sanity images and legacy local images
    const getImageUrl = () => {
        if (artwork.image?.asset) {
            return urlFor(artwork.image).width(600).height(800).url();
        }
        return artwork.image;
    };

    // Get the artwork link - use slug if available, otherwise fallback to onClick
    const artworkHref = artwork.slug ? `/artwork/${artwork.slug}` : null;

    const handleCardClick = (e) => {
        if (artworkHref) {
            // Let the Link handle navigation
            return;
        }
        // Fallback for legacy data without slugs
        if (onClick) {
            onClick(artwork);
        }
    };

    const cardContent = (
        <>
            <div className="artwork-image">
                {artwork.image ? (
                    <img src={getImageUrl()} alt={artwork.title} loading="lazy" />
                ) : null}
            </div>
            <div className="artwork-info">
                <h3 className="artwork-title">{artwork.title}</h3>
                {artwork.year && (
                    <p className="artwork-year">{artwork.year}</p>
                )}
                {artwork.dimensions && (
                    <p className="artwork-dimensions">{artwork.dimensions}</p>
                )}
                {artwork.medium && (
                    <p className="artwork-medium">{artwork.medium}</p>
                )}
                {artwork.available ? (
                    <button
                        className="artwork-request-btn"
                        onClick={handleRequestClick}
                    >
                        Available on request
                    </button>
                ) : (
                    <span className="artwork-sold">
                        <span className="artwork-sold-dot"></span>
                        Sold
                    </span>
                )}
            </div>
        </>
    );

    // If we have a slug, wrap in Link for navigation
    if (artworkHref) {
        return (
            <Link href={artworkHref} className="artwork-card artwork-card-link">
                {cardContent}
            </Link>
        );
    }

    // Fallback to div with onClick for legacy data
    return (
        <div className="artwork-card" onClick={handleCardClick}>
            {cardContent}
        </div>
    );
}
