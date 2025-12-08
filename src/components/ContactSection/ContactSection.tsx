import { content } from '@/lib/content';
import styles from './ContactSection.module.css';

export default function ContactSection() {
    return (
        <section id="contact" className={styles.section}>
            <div className={styles.container}>
                <h2 className={`${styles.headline} reveal`}>{content.contact.headline}</h2>
                <p className="reveal stagger-1">{content.contact.copy}</p>
                <div className="reveal stagger-2">
                    <button className={`btn ${styles.btnLg}`}>{content.contact.cta}</button>
                </div>
            </div>
        </section>
    );
}
