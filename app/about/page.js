import contentData from '@/data/content.json';

export const metadata = {
    title: 'About | Jenna Bitar',
    description: 'Learn more about artist Jenna Bitar, including biography, exhibitions, and awards.',
};

export default function About() {
    const { artist, cv } = contentData;

    // Split bio into two parts for staggered layout
    const bioLines = artist.fullBio.split('\n\n');
    const firstBioPart = bioLines.slice(0, Math.ceil(bioLines.length / 2)).join('\n\n');
    const secondBioPart = bioLines.slice(Math.ceil(bioLines.length / 2)).join('\n\n');

    return (
        <div className="page">
            <div className="container">
                <h1 style={{ marginBottom: '3rem' }}>About</h1>

                {/* First section: Image Left, Text Right */}
                <div className="about-grid">
                    <div className="about-image">
                        <div style={{
                            width: '100%',
                            height: '100%',
                            minHeight: '400px',
                            background: '#a8a8a8',
                        }} />
                    </div>
                    <div className="about-bio">
                        <p style={{ whiteSpace: 'pre-line' }}>{firstBioPart}</p>
                    </div>
                </div>

                {/* Second section: Text Left, Image Right */}
                <div className="about-grid" style={{ marginTop: '4rem' }}>
                    <div className="about-bio">
                        <p style={{ whiteSpace: 'pre-line' }}>{secondBioPart}</p>
                    </div>
                    <div className="about-image">
                        <div style={{
                            width: '100%',
                            height: '100%',
                            minHeight: '400px',
                            background: '#a8a8a8',
                        }} />
                    </div>
                </div>

                {/* CV Sections */}
                <div style={{ marginTop: '4rem' }}>
                    {cv.education && cv.education.length > 0 && (
                        <section className="cv-section">
                            <h3 className="cv-title">Education</h3>
                            <ul className="cv-list">
                                {cv.education.map((item, index) => (
                                    <li key={index} className="cv-item">
                                        {item.year} – {item.title}, {item.institution}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {cv.soloExhibitions && cv.soloExhibitions.length > 0 && (
                        <section className="cv-section">
                            <h3 className="cv-title">Solo Exhibitions</h3>
                            <ul className="cv-list">
                                {cv.soloExhibitions.map((item, index) => (
                                    <li key={index} className="cv-item">
                                        {item.year} – {item.title}, {item.venue}
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
                                        {item.year} – {item.title}, {item.venue}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {cv.awards && cv.awards.length > 0 && (
                        <section className="cv-section">
                            <h3 className="cv-title">Awards</h3>
                            <ul className="cv-list">
                                {cv.awards.map((item, index) => (
                                    <li key={index} className="cv-item">
                                        {item.year} – {item.title}
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
                                        {item.url && item.url !== '#' ? (
                                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                {item.year} – {item.title}, {item.publication}
                                            </a>
                                        ) : (
                                            <span>{item.year} – {item.title}, {item.publication}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
