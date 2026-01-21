'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavigationAlt() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Don't render navigation on admin pages - Sanity Studio needs full viewport
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    const navLinks = [
        { href: '/gallery', label: 'Gallery' },
        { href: '/commissions', label: 'Commissions' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    const menuLinks = [
        { href: '/', label: 'Home' },
        ...navLinks,
    ];

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className="nav-alt">
                {/* Logo on the left */}
                <Link href="/" className="nav-alt-logo">
                    <Image
                        src="/images/jenna-bitar-art-logo.webp"
                        alt="Jenna Bitar"
                        width={140}
                        height={47}
                        priority
                    />
                </Link>

                {/* Navigation links - visible on desktop, hidden on tablet/mobile */}
                <div className="nav-alt-links">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`nav-alt-link ${pathname === link.href ? 'active' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Hamburger menu button - visible on tablet/mobile, on the right */}
                <button
                    className="nav-alt-menu-btn"
                    onClick={() => setIsMenuOpen(true)}
                >
                    Menu
                </button>
            </nav>

            {/* Full-screen menu overlay - for tablet/mobile */}
            <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}>
                <nav className="nav-alt">
                    <Link href="/" className="nav-alt-logo" onClick={handleLinkClick}>
                        <Image
                            src="/images/jenna-bitar-art-logo.webp"
                            alt="Jenna Bitar"
                            width={120}
                            height={40}
                            priority
                        />
                    </Link>

                    {/* Empty spacer for layout balance - hidden on mobile */}
                    <div className="nav-alt-links" style={{ visibility: 'hidden' }}>
                        <span>Contact</span>
                    </div>

                    <button
                        className="nav-alt-menu-btn"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Close
                    </button>
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
                        <a href="https://instagram.com/jennabitar" target="_blank" rel="noopener noreferrer">
                            @jennabitar
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
