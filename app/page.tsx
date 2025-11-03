import { HeaderNavigation } from "./components/header-navigation/header-navigation";
import { HeroSection } from "./components/hero-section/hero-section";
import { FeaturesSection } from "./components/features-section/features-section";
import { AboutSection } from "./components/about-section/about-section";
import { CtaSection } from "./components/cta-section/cta-section";
import { FooterSection } from "./components/footer-section/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <HeaderNavigation />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
