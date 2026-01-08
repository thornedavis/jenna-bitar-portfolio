'use client';

import styles from './Accordion.module.css';

export default function Accordion({ title, children, isOpen, onToggle }) {
    if (!children) return null;

    return (
        <div className={styles.accordion}>
            <button
                className={styles.header}
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <span className={styles.title}>{title}</span>
                <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
            </button>
            <div className={`${styles.content} ${isOpen ? styles.contentOpen : ''}`}>
                <div className={styles.contentInner}>
                    {children}
                </div>
            </div>
        </div>
    );
}
