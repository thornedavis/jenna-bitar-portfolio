'use client';

import { useState, Suspense } from 'react';
import styles from './commissions.module.css';

function CommissionsForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: '',
        location: '',
        budget: '',
        timeline: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/commissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                projectType: '',
                location: '',
                budget: '',
                timeline: '',
                description: ''
            });
        } catch (error) {
            console.error('Commission form error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page">
            <div className={styles.contactContainer}>
                {/* Left side - Form */}
                <div className={styles.formSection}>
                    <h1 className={styles.title}>Commissions</h1>
                    <p className={styles.description}>
                        Interested in commissioning a custom piece? Fill out the form below to share your vision,
                        and I'll be in touch to discuss how we can bring it to life.
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
                            <label htmlFor="projectType" className={styles.label}>Is this for a business or personal home?</label>
                            <select
                                id="projectType"
                                name="projectType"
                                value={formData.projectType}
                                onChange={handleChange}
                                required
                                className={styles.select}
                            >
                                <option value="">Select an option</option>
                                <option value="personal">Personal / Home</option>
                                <option value="business">Business / Commercial</option>
                                <option value="gift">Gift for someone</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="location" className={styles.label}>Where are you located?</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="City, Country"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="budget" className={styles.label}>What is your budget range?</label>
                            <select
                                id="budget"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                required
                                className={styles.select}
                            >
                                <option value="">Select a range</option>
                                <option value="under-2500">Under $2,500</option>
                                <option value="2500-5000">$2,500 - $5,000</option>
                                <option value="5000-10000">$5,000 - $10,000</option>
                                <option value="10000-25000">$10,000 - $25,000</option>
                                <option value="over-25000">$25,000+</option>
                                <option value="flexible">Flexible / Not sure</option>
                            </select>
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="timeline" className={styles.label}>Do you have a timeline in mind?</label>
                            <input
                                type="text"
                                id="timeline"
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleChange}
                                placeholder="e.g., 3 months, No rush, By December"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="description" className={styles.label}>Tell me about your vision</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the piece you're envisioning – size, colors, style, subject matter, or any inspiration..."
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
                                Thank you for your commission inquiry! I'll review your request and be in touch soon.
                            </p>
                        )}

                        {submitStatus === 'error' && (
                            <p className={styles.errorMessage} style={{ color: '#d32f2f', marginTop: '1rem' }}>
                                Something went wrong. Please try again or email us directly.
                            </p>
                        )}
                    </form>
                </div>

                {/* Right side - Image */}
                <div className={styles.imageSection}>
                    <img
                        src="/images/jenna-bitar-art-commission-image.webp"
                        alt="Jenna Bitar Art Commission"
                        className={styles.contactImage}
                    />
                </div>
            </div>
        </div>
    );
}

// Wrap in Suspense for consistency
export default function Commissions() {
    return (
        <Suspense fallback={<div className="page">Loading...</div>}>
            <CommissionsForm />
        </Suspense>
    );
}
