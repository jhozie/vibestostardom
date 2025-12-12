import Link from 'next/link';
import { content } from '@/lib/content';
import styles from './ContactSection.module.css';

export default function ContactSection() {
    return (
        <section id="contact" className={styles.section}>
            <div className={styles.container}>
                <h2 className={`${styles.headline} reveal`}>{content.contact.headline}</h2>
                <p className="reveal stagger-1">{content.contact.copy}</p>
                <div className="reveal stagger-2">
                    <Link href="/contact" className={`btn ${styles.btnLg}`}>{content.contact.cta}</Link>
                </div>
            </div>
        </section>
    );
}
