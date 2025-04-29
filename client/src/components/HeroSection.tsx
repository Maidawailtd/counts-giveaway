import { Button } from "@/components/ui/button";
import { Gift, Info } from "lucide-react";
import countsLogo from "@/assets/images/counts-main-logo.png";

export default function HeroSection() {
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen bg-black bg-opacity-90 py-20">
      <div className="absolute inset-0 bg-[url('/bg-pattern.jpg')] opacity-20 mix-blend-overlay"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <img src={countsLogo} alt="Counts Kustoms Logo" className="w-64 md:w-96 mx-auto mb-8" />
          <h1 className="text-4xl md:text-6xl font-bebasNeue font-bold mb-6 text-counts-gold">
            WELCOME TO COUNTS KUSTOMS
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Home of Danny "The Count" Koker and the world's most incredible custom vehicles
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              className="bg-counts-gold hover:bg-counts-gold/80 text-black text-lg px-8 py-6"
              onClick={() => handleScrollToSection("showcase")}
            >
              View Our Builds
            </Button>
            <Button 
              className="bg-counts-red hover:bg-counts-red/80 text-white text-lg px-8 py-6"
              onClick={() => handleScrollToSection("contact")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}