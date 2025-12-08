import { content } from '@/lib/content';
import styles from './VisionSection.module.css';

export default function VisionSection() {
    return (
        <section id="vision" className={styles.section}>
            <div className={styles.container}>

                <div className={styles.manifestoWrapper}>
                    {/* Broken down headline for effect */}
                    <h2 className={`${styles.outlineText} reveal`}>More Than</h2>
                    <h2 className={`${styles.outlineText} reveal stagger-1`}>Management</h2>

                    <h2 className={`${styles.solidText} reveal stagger-2`}>A MOVEMENT</h2>
                </div>

                <div className={`${styles.copyWrapper} reveal stagger-3`}>
                    <p className={styles.copy}>
                        {content.vision.copy}
                    </p>
                </div>

            </div>
        </section>
    );
}
