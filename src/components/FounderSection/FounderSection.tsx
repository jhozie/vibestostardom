import { content } from '@/lib/content';
import styles from './FounderSection.module.css';

export default function FounderSection() {
    return (
        <section id="founder" className={styles.section}>
            <div className={styles.container}>

                {/* Massive Header */}
                <div className={styles.headerWrapper}>
                    <h2 className={`${styles.headline} reveal`}>Why We Exist</h2>
                    <p className={`${styles.subheadline} reveal stagger-1`}>{content.founder.subheadline}</p>
                </div>

                <div className={styles.grid}>
                    {/* Image Column */}
                    <div className={`${styles.imageCol} reveal stagger-2`}>
                        <img
                            src="/mako.jpg"
                            alt="Founder"
                            className={styles.founderImage}
                        />
                    </div>

                    {/* Text Column */}
                    <div className={styles.textCol}>
                        {content.founder.paragraphs.map((para, i) => (
                            <p key={i} className={`${styles.paragraph} reveal stagger-${i + 1}`}>
                                {para}
                            </p>
                        ))}

                        <div className={`${styles.highlightBox} reveal`}>
                            <p className={styles.visionStatement}>
                                &quot;{content.founder.vision_statement}&quot;
                            </p>
                        </div>

                        <div className={`${styles.ctaWrapper} reveal`}>
                            <button className={`btn ${styles.invertBtn}`}>{content.founder.cta}</button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
