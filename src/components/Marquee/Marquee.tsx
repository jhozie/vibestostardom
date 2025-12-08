import styles from './Marquee.module.css';

export default function Marquee() {
    const words = ["Talent", "Vision", "Impact", "Creativity", "Culture", "Future", "Stardom", "Vibes"];

    return (
        <div className={styles.marqueeContainer}>
            <div className={styles.track}>
                {/* Repeat content enough times to fill screen + overflow loop */}
                {[...words, ...words, ...words, ...words].map((word, i) => (
                    <div key={i} className={styles.item}>
                        {word} <span className={styles.dot}></span>
                    </div>
                ))}
            </div>
        </div>
    );
}
