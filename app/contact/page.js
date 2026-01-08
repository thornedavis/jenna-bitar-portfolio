'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import contentData from '@/data/content.json';
import styles from './contact.module.css';

function ContactForm() {
    const searchParams = useSearchParams();
    const { contact } = contentData;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        painting: '',
        location: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Pre-fill painting field from URL parameter
    useEffect(() => {
        const paintingParam = searchParams.get('painting');
        if (paintingParam) {
            setFormData(prev => ({
                ...prev,
                painting: paintingParam
            }));
        }
    }, [searchParams]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        setSubmitStatus('success');
        setIsSubmitting(false);
        setFormData({
            name: '',
            email: '',
            painting: '',
            location: '',
            notes: ''
        });
    };

    return (
        <div className="page">
            <div className={styles.contactContainer}>
                {/* Left side - Form */}
                <div className={styles.formSection}>
                    <h1 className={styles.title}>Request Form</h1>
                    <p className={styles.description}>
                        This form does not commit you to a purchase, it simply lets us know you're interested,
                        and we'll get back to you personally with next steps.
                    </p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formField}>
                            <label htmlFor="name" className={styles.label}>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="painting" className={styles.label}>Which painting are you interested in?</label>
                            <input
                                type="text"
                                id="painting"
                                name="painting"
                                value={formData.painting}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="location" className={styles.label}>Where are you based?</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="notes" className={styles.label}>Do you have any questions or notes?</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                className={styles.textarea}
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Request'}
                        </button>

                        {submitStatus === 'success' && (
                            <p className={styles.successMessage}>
                                Thank you for your request! We'll be in touch soon.
                            </p>
                        )}
                    </form>
                </div>

                {/* Right side - Image */}
                <div className={styles.imageSection}>
                    <div className={styles.contactImage}></div>
                </div>
            </div>

            {/* Footer section with contact info */}
            <div className={styles.contactFooter}>
                <div className={styles.contactLinks}>
                    <a href={`mailto:${contact.email}`} className={styles.contactLink}>
                        {contact.email.toUpperCase()}
                    </a>
                    <a
                        href={contact.instagramUrl}
                        className={styles.contactLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {contact.instagram.toUpperCase()}
                    </a>
                </div>
            </div>
        </div>
    );
}

// Wrap in Suspense for useSearchParams
export default function Contact() {
    return (
        <Suspense fallback={<div className="page">Loading...</div>}>
            <ContactForm />
        </Suspense>
    );
}
