import PepeHeader from "@/components/PepeHeader";
import HeroSection from "@/components/HeroSection";
import WinnersSection from "@/components/WinnersSection";
import PrizeShowcase from "@/components/PrizeShowcase";
import HowItWorks from "@/components/HowItWorks";
import CommunitySection from "@/components/CommunitySection";
import PepeFooter from "@/components/PepeFooter";
import BoxOpeningModal from "@/components/BoxOpeningModal";
import { useGiveaway } from "@/context/GiveawayContext";

export default function Home() {
  const { selectedBox } = useGiveaway();
  
  return (
    <div className="min-h-screen bg-pepeBg text-white">
      <PepeHeader />
      <HeroSection />
      <WinnersSection />
      <PrizeShowcase />
      <HowItWorks />
      <CommunitySection />
      <PepeFooter />
      
      {/* Box opening modal will show when a box is selected */}
      {selectedBox && <BoxOpeningModal />}
    </div>
  );
}
