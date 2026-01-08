'use client';

import { useEffect } from 'react';
import { urlFor } from '@/lib/sanity';

export default function ArtworkModal({ artwork, isOpen, onClose }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!artwork) return null;

    // Handle both Sanity images and legacy local images
    const getImageUrl = () => {
        if (artwork.image?.asset) {
            return urlFor(artwork.image).width(1200).height(1600).url();
        }
        return artwork.image;
    };

    return (
        <div
            className={`modal-overlay ${isOpen ? 'open' : ''}`}
            onClick={onClose}
        >
            <button className="modal-close" onClick={onClose}>×</button>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-image">
                    {artwork.image ? (
                        <img src={getImageUrl()} alt={artwork.title} />
                    ) : (
                        <div style={{
                            width: '100%',
                            height: '400px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '1.5rem',
                            borderRadius: '8px'
                        }}>
                            {artwork.title}
                        </div>
                    )}
                </div>
                <div className="modal-info">
                    <h2 className="modal-title">{artwork.title}</h2>
                    <div className="modal-meta">
                        {artwork.year && <p>{artwork.year}</p>}
                        {artwork.medium && <p>{artwork.medium}</p>}
                        {artwork.dimensions && <p>{artwork.dimensions}</p>}
                        {artwork.available !== undefined && (
                            <p style={{ marginTop: '1rem', color: artwork.available ? '#4ade80' : '#999' }}>
                                {artwork.available ? 'Available' : 'Sold'}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
