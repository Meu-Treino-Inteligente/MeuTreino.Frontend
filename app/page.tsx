import { HeaderNavigation } from "./components/header-navigation/header-navigation";
import { ThreeHero } from "./components/three-hero/three-hero";
import { FeaturesSection } from "./components/features-section/features-section";
import { AboutSection } from "./components/about-section/about-section";
import { CtaSection } from "./components/cta-section/cta-section";
import { FooterSection } from "./components/footer-section/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <HeaderNavigation />
      <ThreeHero />
      <FeaturesSection />
      <AboutSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
