import { content } from '@/lib/content';
import styles from './ServicesSection.module.css';

export default function ServicesSection() {
  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <p className="reveal">OUR EXPERTISE</p>
        </div>

        <div className={styles.list}>
          {content.services.items.map((item, index) => (
            <div key={index} className={`${styles.listItem} reveal`}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
