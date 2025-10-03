import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import AnimatedText from "@/components/AnimatedText";

export default function Home() {
  return (
    <main>
      <Hero>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Shipping Made <AnimatedText words={["Simple", "Secure", "Seamless"]} />
        </h1>
      </Hero>
      <About imageUrl="/1.png" />
      <Services imageUrl="/2.png" />
      <Contact />
    </main>
  );
}
