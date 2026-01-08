'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuLinks = [
        { href: '/', label: 'Home' },
        { href: '/gallery', label: 'Gallery' },
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
                        width={120}
                        height={40}
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
                    <div className="menu-image">
                        {/* Placeholder for menu image */}
                    </div>
                </div>

                <div className="menu-footer">
                    <div className="menu-footer-left">
                        <a href="mailto:hello@jennabitar.com">hello@jennabitar.com</a>
                        <a href="https://instagram.com/jennabitar" target="_blank" rel="noopener noreferrer">@jenna_bitar</a>
                    </div>
                    <div className="menu-footer-center">
                        <Image
                            src="/images/jenna-bitar-art-logo.webp"
                            alt="Jenna Bitar"
                            width={80}
                            height={30}
                        />
                    </div>
                    <div className="menu-footer-right">
                        <span>© Jenna Bitar {new Date().getFullYear()}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
