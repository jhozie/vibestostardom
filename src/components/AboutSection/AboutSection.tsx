import { content } from '@/lib/content';
import styles from './AboutSection.module.css';

export default function AboutSection() {
    return (
        <section id="about" className={styles.section}>
            <div className="container" style={{ maxWidth: '1600px' }}> {/* Wider container for this layou */}
                <div className={styles.wrapper}>

                    {/* Background Image Layer */}
                    <div className={`${styles.imageContainer} reveal`}>
                        <img
                            src="/fash.jpg"
                            alt="Talent"
                            className={styles.image}
                        />
                    </div>

                    {/* Floating Content Layer */}
                    <div className={`${styles.contentCard} reveal stagger-1`}>
                        <h2 className={styles.headline}>{content.about.headline}</h2>
                        {/* Split copy into paragraphs if it's long, or keep as is */}
                        <p className={styles.copy}>{content.about.copy}</p>

                        <div style={{ marginTop: '2rem' }}>
                            <button className="btn btn-outline">{content.about.cta}</button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
