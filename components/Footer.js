'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();

    // Don't render footer on admin pages - Sanity Studio needs full viewport
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="mailto:hello@jennabitar.com">hello@jennabitar.com</a>
                <a href="https://instagram.com/jennabitar.art" target="_blank" rel="noopener noreferrer">
                    @jennabitar.art
                </a>
            </div>
            <div>
                <span>© Jenna Bitar {currentYear}</span>
            </div>
        </footer>
    );
}
