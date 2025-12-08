'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.navContext}`}>
                <a href="#" className={styles.logo}>
                    VIBES<span>TO</span>STARDOM
                </a>
                <div className={styles.links}>
                    <a href="#about" className={styles.link}>About</a>
                    <a href="#services" className={styles.link}>Services</a>
                    <a href="#vision" className={styles.link}>Vision</a>
                    <a href="#founder" className={styles.link}>Founder</a>
                    <a href="#contact" className={styles.link}>Contact</a>
                </div>
                <button className="btn">Join Roster</button>
            </div>
        </nav>
    );
}
