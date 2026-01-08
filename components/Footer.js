import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="mailto:hello@jennabitar.com">hello@jennabitar.com</a>
                <a href="https://instagram.com/jennabitar" target="_blank" rel="noopener noreferrer">
                    @jennabitar
                </a>
            </div>
            <div>
                <span>© Jenna Bitar {currentYear}</span>
            </div>
        </footer>
    );
}
