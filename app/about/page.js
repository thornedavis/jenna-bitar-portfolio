import Image from 'next/image';
import contentData from '@/data/content.json';

export const metadata = {
    title: 'About | Jenna Bitar',
    description: 'Learn more about artist Jenna Bitar, including biography, exhibitions, and awards.',
};

// Brand logos data
const brandLogos = [
    { name: 'Maison Margiela', src: '/images/jenna-bitar-art-maison-margiela-logo.svg' },
    { name: 'House & Garden', src: '/images/jenna-bitar-art-house-and-garden-logo.svg' },
    { name: 'Marie Claire', src: '/images/jenna-bitar-art-marie-claire-logo.svg' },
    { name: 'Mojeh', src: '/images/jenna-bitar-art-mojeh-logo.svg' },
    { name: 'One & Only Dubai', src: '/images/jenna-bitar-art-one-and-only-dubai-logo.svg' },
    { name: 'Mille', src: '/images/jenna-bitar-art-mille-logo.svg' },
    { name: 'Art Korero', src: '/images/jenna-bitar-art-art-korero-logo.svg' },
    { name: 'Khamsa', src: '/images/jenna-bitar-art-khamsa-logo.svg' },
    { name: 'Rainbow Studios', src: '/images/jenna-bitar-art-rainbow-studioes-logo.svg' },
    { name: 'Madame Arabia', src: '/images/jenna-bitar-art-madame-arabia-logo.svg' },
];

export default function About() {
    const { artist, cv } = contentData;

    // Split bio into paragraphs
    const bioLines = artist.fullBio.split('\n\n');

    return (
        <div className="page">
            <div className="container">
                {/* Full-width hero image */}
                <div style={{
                    width: '100%',
                    height: '400px',
                    background: '#a8a8a8',
                    marginBottom: '3rem',
                }} />

                {/* Brand Logos Section */}
                <div style={{ marginBottom: '3rem' }}>
                    <h3 className="cv-title">Featured In</h3>
                    <div style={{
                        borderBottom: '1px solid var(--foreground)',
                    }} />
                    <div className="brand-logos-grid">
                        {brandLogos.map((brand, index) => (
                            <div key={index} className="brand-logo-item">
                                <Image
                                    src={brand.src}
                                    alt={brand.name}
                                    width={100}
                                    height={50}
                                    style={{
                                        objectFit: 'contain',
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '50px',
                                        filter: 'brightness(0) invert(9%)',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div style={{
                    borderBottom: '1px solid var(--foreground)',
                    marginBottom: '3rem',
                }} />

                {/* Two-column layout: Bio left, CV right */}
                <div className="about-content-grid">
                    {/* Left column: About/Bio */}
                    <div>
                        <h3 className="cv-title">About</h3>
                        <div className="about-bio">
                            {bioLines.map((paragraph, index) => (
                                <p key={index} style={{ marginBottom: '1.5rem' }}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    {/* Right column: CV Sections */}
                    <div>
                        {cv.soloExhibitions && cv.soloExhibitions.length > 0 && (
                            <section className="cv-section">
                                <h3 className="cv-title">Solo Exhibitions</h3>
                                <ul className="cv-list">
                                    {cv.soloExhibitions.map((item, index) => (
                                        <li key={index} className="cv-item">
                                            <span className="cv-item-year">{item.year}</span>
                                            <span className="cv-item-content">{item.title}, {item.venue}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {cv.groupExhibitions && cv.groupExhibitions.length > 0 && (
                            <section className="cv-section">
                                <h3 className="cv-title">Group Exhibitions</h3>
                                <ul className="cv-list">
                                    {cv.groupExhibitions.map((item, index) => (
                                        <li key={index} className="cv-item">
                                            <span className="cv-item-year">{item.year}</span>
                                            <span className="cv-item-content">{item.title}, {item.venue}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {cv.collaborations && cv.collaborations.length > 0 && (
                            <section className="cv-section">
                                <h3 className="cv-title">Collaborations</h3>
                                <ul className="cv-list">
                                    {cv.collaborations.map((item, index) => (
                                        <li key={index} className="cv-item">
                                            <span className="cv-item-year">{item.year}</span>
                                            <span className="cv-item-content">{item.title}, {item.description}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {cv.press && cv.press.length > 0 && (
                            <section className="cv-section">
                                <h3 className="cv-title">Press</h3>
                                <ul className="cv-list">
                                    {cv.press.map((item, index) => (
                                        <li key={index} className="cv-item">
                                            <span className="cv-item-year">{item.year}</span>
                                            <span className="cv-item-content">
                                                {item.url && item.url !== '#' ? (
                                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                        {item.title}, {item.publication}
                                                    </a>
                                                ) : (
                                                    <span>{item.title}, {item.publication}</span>
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
