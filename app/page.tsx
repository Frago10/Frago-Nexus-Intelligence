import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { BrandBridge } from "@/components/sections/BrandBridge";
import { MorphSection } from "@/components/sections/MorphSection";
import { Stats } from "@/components/sections/Stats";
import { Capabilities } from "@/components/sections/Capabilities";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";
import { Anatomy } from "@/components/sections/Anatomy";
import { PorQueNexus } from "@/components/sections/PorQueNexus";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Process } from "@/components/sections/Process";
import { Manifesto } from "@/components/sections/Manifesto";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { IntroProvider } from "@/components/intro/IntroContext";
import { CinematicLoader } from "@/components/intro/CinematicLoader";
import { MagneticCursor } from "@/components/interaction/MagneticCursor";

export default function HomePage() {
  return (
    <IntroProvider>
      <MagneticCursor />
      <CinematicLoader />
      <main className="relative noise">
        <Nav />
        <Hero />
        <BrandBridge />
        <MorphSection />
        <Stats />
        <Capabilities />
        <Services />
        <TechStack />
        <Anatomy />
        <PorQueNexus />
        <CaseStudies />
        <Process />
        <Manifesto />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </IntroProvider>
  );
}
