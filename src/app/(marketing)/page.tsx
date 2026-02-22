import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { PersonaShowcase } from "@/components/landing/PersonaShowcase";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ThemeGallery } from "@/components/landing/ThemeGallery";
import { PlayModeDemo } from "@/components/landing/PlayModeDemo";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Problem />
      <BeforeAfter />
      <PersonaShowcase />
      <HowItWorks />
      <ThemeGallery />
      <PlayModeDemo />
      <Testimonials />
      <CTA />
    </>
  );
}
