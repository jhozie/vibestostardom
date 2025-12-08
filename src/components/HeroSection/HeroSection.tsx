import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* Centered "Artistic" Image/Video visual */}
      <img 
        src="https://images.unsplash.com/photo-1547407139-4c926860742f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
        className={`${styles.videoBg} reveal`}
        alt="Artistic Abstract"
      />
      
      <h1 className={styles.headline}>
        <span className={`${styles.line} reveal stagger-1`}>FROM <span className={styles.serif}>Raw Talent</span></span>
        <span className={`${styles.line} reveal stagger-2`}>TO <span className={styles.serif}>Stardom</span></span>
      </h1>
    </section>
  );
}
