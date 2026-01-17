import contentData from '@/data/content.json';

export const metadata = {
    title: 'About | Jenna Bitar',
    description: 'Learn more about artist Jenna Bitar, including biography, exhibitions, and awards.',
};

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
                    <div style={{
                        marginTop: '2rem',
                        marginBottom: '2rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: '2rem 1rem',
                        alignItems: 'center',
                        justifyItems: 'center',
                    }}>
                        {/* Placeholder logos - replace with actual brand images */}
                        {[
                            'Maison Margiela', 'Jotun', 'House & Garden', 'Marie Claire', 'Mojeh',
                            'Interior Design', 'Khamsa', 'Rainbow Studios', 'Two FT', 'Madame Arabia'
                        ].map((brand, index) => (
                            <div
                                key={index}
                                style={{
                                    width: '100px',
                                    height: '60px',
                                    background: '#d0d0d0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.65rem',
                                    color: '#666',
                                    textAlign: 'center',
                                    padding: '0.5rem',
                                }}
                            >
                                {brand}
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
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                }}>
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
