'use client'; 

import HeroSection from '@/components/HeroSection/HeroSection';
import AboutSection from '@/components/AboutSection/AboutSection';
import ServicesSection from '@/components/ServicesSection/ServicesSection';
import VisionSection from '@/components/VisionSection/VisionSection';
import FounderSection from '@/components/FounderSection/FounderSection';
import ContactSection from '@/components/ContactSection/ContactSection';
import Marquee from '@/components/Marquee/Marquee';
import FourCornerNav from '@/components/FourCornerNav/FourCornerNav';
import CustomCursor from '@/components/CustomCursor/CustomCursor';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function Home() {
  useScrollAnimation();

  return (
    <main>
      <CustomCursor />
      <FourCornerNav />
      {/* Old Navbar Removed */}
      
      <HeroSection />
      <Marquee />
      <AboutSection />
      <ServicesSection />
      <Marquee />
      <VisionSection />
      <FounderSection />
      <ContactSection />
    </main>
  );
}
