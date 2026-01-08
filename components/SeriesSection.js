'use client';

import InfiniteCarousel from './InfiniteCarousel';

export default function SeriesSection({ series, onArtworkClick }) {
    return (
        <InfiniteCarousel
            artworks={series.artworks}
            seriesName={series.name}
            onArtworkClick={onArtworkClick}
        />
    );
}
