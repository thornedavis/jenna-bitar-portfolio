'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Don't render navigation on admin pages - Sanity Studio needs full viewport
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    const menuLinks = [
        { href: '/', label: 'Home' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/commissions', label: 'Commissions' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className="nav">
                <button
                    className="nav-menu-btn"
                    onClick={() => setIsMenuOpen(true)}
                >
                    {isMenuOpen ? 'Close' : 'Menu'}
                </button>

                <Link href="/" className="nav-logo-center">
                    <Image
                        src="/images/jenna-bitar-art-logo.webp"
                        alt="Jenna Bitar"
                        width={160}
                        height={53}
                        priority
                    />
                </Link>

                <Link href="/contact" className="nav-contact-btn">
                    Contact
                </Link>
            </nav>

            {/* Full-screen menu overlay */}
            <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}>
                <nav className="nav">
                    <button
                        className="nav-menu-btn"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Close
                    </button>

                    <Link href="/" className="nav-logo-center" onClick={handleLinkClick}>
                        <Image
                            src="/images/jenna-bitar-art-logo.webp"
                            alt="Jenna Bitar"
                            width={120}
                            height={40}
                            priority
                        />
                    </Link>

                    <Link href="/contact" className="nav-contact-btn" onClick={handleLinkClick}>
                        Contact
                    </Link>
                </nav>

                <div className="menu-content">
                    <div className="menu-links">
                        {menuLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="menu-link"
                                onClick={handleLinkClick}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="footer">
                    <div className="footer-links">
                        <a href="mailto:hello@jennabitar.com">hello@jennabitar.com</a>
                        <a href="https://instagram.com/jenna.bitar.art" target="_blank" rel="noopener noreferrer">
                            @jenna.bitar.art
                        </a>
                    </div>
                    <div>
                        <span>© Jenna Bitar {new Date().getFullYear()}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
