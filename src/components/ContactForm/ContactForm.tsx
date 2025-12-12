"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './ContactForm.module.css';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string,
        };

        try {
            const { error } = await supabase
                .from('messages')
                .insert([data]);

            if (error) throw error;

            setStatus('success');
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className={styles.formContainer} style={{ textAlign: 'center', padding: '4rem' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Message Sent</h3>
                <p>Thank you for reaching out. We have received your inquiry.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className={styles.submitBtn}
                    style={{ marginTop: '2rem', width: 'auto', padding: '1rem 2rem' }}
                >
                    Send Another
                </button>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className={styles.formContainer} style={{ textAlign: 'center', padding: '4rem' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong</h3>
                <p>Please try again later or email us directly.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className={styles.submitBtn}
                    style={{ marginTop: '2rem', width: 'auto', padding: '1rem 2rem' }}
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input type="text" name="name" id="name" required className={styles.input} placeholder="Enter your name" />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input type="email" name="email" id="email" required className={styles.input} placeholder="name@example.com" />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <select name="subject" id="subject" className={styles.input}>
                    <option value="talent">Talent Representation</option>
                    <option value="brand">Brand Partnership</option>
                    <option value="general">General Inquiry</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea name="message" id="message" required className={styles.textarea} placeholder="Tell us about yourself..."></textarea>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}
