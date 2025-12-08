'use client';

import { useState } from 'react';
import styles from './FourCornerNav.module.css';

export default function FourCornerNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Top Left: LOGO */}
      <div className={`${styles.corner} ${styles.topLeft}`}>
        VIBESTOSTARDOM™
      </div>

      {/* Top Right: CLICKABLE MENU */}
      <div className={`${styles.corner} ${styles.topRight}`} onClick={toggleMenu}>
        {menuOpen ? 'CLOSE' : 'MENU'}
      </div>

      {/* Bottom Left: Location/Scroll Info */}
      <div className={`${styles.corner} ${styles.bottomLeft}`}>
        LAGOS — 2025
      </div>

      {/* Bottom Right: CTA */}
      <div className={`${styles.corner} ${styles.bottomRight}`}>
        <a href="#contact">JOIN ROSTER</a>
      </div>

      {/* Full Screen Menu Overlay */}
      <div className={`${styles.menuOverlay} ${menuOpen ? styles.open : ''}`}>
        <a href="#about" className={styles.menuItem} onClick={toggleMenu}>About</a>
        <a href="#services" className={styles.menuItem} onClick={toggleMenu}>Services</a>
        <a href="#vision" className={styles.menuItem} onClick={toggleMenu}>Vision</a>
        <a href="#contact" className={styles.menuItem} onClick={toggleMenu}>Contact</a>
      </div>
    </>
  );
}
