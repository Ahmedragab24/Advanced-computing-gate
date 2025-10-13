import { Navigation } from "@/components/Layout/navigation";
import { HeroSection } from "@/components/Sections/hero/HeroSection";
import { AboutSection } from "@/components/Sections/about/AboutSection";
import { ServicesSection } from "@/components/Sections/services/ServicesSection";
import { PortfolioSection } from "@/components/Sections/portfolio/PortfolioSection";
import { TeamSection } from "@/components/Sections/team/TeamSection";
import { TestimonialsSection } from "@/components/Sections/testimonials/TestimonialsSection";
import { ContactSection } from "@/components/Sections/contact/ContactSection";
import { Footer } from "@/components/Layout/footer";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <TeamSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
