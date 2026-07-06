import { Navbar } from "@/components/Navbar";
import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
import { Timeline } from "@/components/Timeline";
import { Philosophy } from "@/components/Philosophy";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black w-full overflow-clip selection:bg-white selection:text-black">
      <Navbar />
      <ScrollyCanvas />
      <Marquee />
      <About />
      <Projects />
      <TechStack />
      <Timeline />
      <Philosophy />
      <FAQ />
      <Footer />
    </main>
  );
}
