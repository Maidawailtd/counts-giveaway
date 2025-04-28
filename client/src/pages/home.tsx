import CountsHeader from "@/components/CountsHeader";
import HeroSection from "@/components/HeroSection";
import WinnersSection from "@/components/WinnersSection";
import PrizeShowcase from "@/components/PrizeShowcase";
import HowItWorks from "@/components/HowItWorks";
import CommunitySection from "@/components/CommunitySection";
import CountsFooter from "@/components/CountsFooter";
import BoxOpeningModal from "@/components/BoxOpeningModal";
import { useGiveaway } from "@/context/GiveawayContext";

export default function Home() {
  const { selectedBox } = useGiveaway();
  
  return (
    <div className="min-h-screen bg-countsBg text-white">
      <CountsHeader />
      <HeroSection />
      <WinnersSection />
      <PrizeShowcase />
      <HowItWorks />
      <CommunitySection />
      <CountsFooter />
      
      {/* Box opening modal will show when a box is selected */}
      {selectedBox && <BoxOpeningModal />}
    </div>
  );
}
