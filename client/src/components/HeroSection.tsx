import { Button } from "@/components/ui/button";
import { Gift, Info } from "lucide-react";
import { useGiveaway } from "@/context/GiveawayContext";
import GiftBox from "./GiftBox";
import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export default function HeroSection() {
  const { user, giftBoxes, selectBox } = useGiveaway();
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getNextFreeEntry = () => {
    if (!user.nextFreeEntry) return "Soon";
    
    try {
      if (user.nextFreeEntry > new Date()) {
        return formatDistanceToNow(user.nextFreeEntry, { addSuffix: true });
      } else {
        return "Available now";
      }
    } catch (error) {
      return "Soon";
    }
  };

  return (
    <section className="py-8 md:py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-9xl text-counts-red animate-float">🏍️</div>
        <div className="absolute bottom-10 right-10 text-9xl text-counts-red animate-float" style={{ animationDelay: "1s" }}>🏎️</div>
        <div className="absolute top-40 right-20 text-8xl text-counts-red animate-float" style={{ animationDelay: "2s" }}>🔧</div>
        <div className="absolute bottom-40 left-20 text-8xl text-counts-red animate-float" style={{ animationDelay: "1.5s" }}>🔥</div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebasNeue font-bold mb-6">
            <span className="text-counts-gold">COUNTS KUSTOMS</span> <span className="text-counts-red">GIVEAWAY</span>
          </h2>
          <p className="text-lg md:text-xl text-counts-silver mb-8">
            Open mystery boxes and win custom car parts, shop merch, exclusive tours, and cash prizes! 
            Join the Counts Kustoms community and become the next winner with Danny Koker.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <Button 
              className="bg-counts-gold hover:bg-counts-gold/80 px-6 py-6 rounded-lg font-bebasNeue font-bold text-counts-black transition-all transform hover:scale-105 shadow-lg h-12 focus:ring-2 focus:ring-offset-2 focus:ring-counts-gold"
              onClick={() => handleScrollToSection("giftBoxes")}
              aria-label="Participate in giveaway"
            >
              <Gift className="mr-2 h-5 w-5" aria-hidden="true" /> Participate Now
            </Button>
            <Button 
              className="bg-counts-red hover:bg-counts-red/80 px-6 py-6 rounded-lg font-bebasNeue font-bold text-white transition-all transform hover:scale-105 shadow-lg h-12"
              onClick={() => setHowItWorksOpen(true)}
            >
              <Info className="mr-2 h-5 w-5" /> How It Works
            </Button>
          </div>
        </div>
        
        <div id="giftBoxes" className="bg-counts-black/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-counts-red/30 max-w-2xl mx-auto shadow-lg">
          <div className="text-center mb-6">
            <h3 className="font-bebasNeue text-2xl font-bold text-counts-gold mb-3">CURRENT GIVEAWAYS</h3>
            <p className="text-counts-silver">Choose a mystery box to reveal your car prize!</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {giftBoxes.map((box) => (
              <GiftBox 
                key={box.id}
                giftBox={box}
                onClick={() => selectBox(box)}
              />
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-counts-silver mb-4">
              You have {user.isConnected ? user.entriesRemaining : 0} free entries remaining today
            </p>
            <div className="inline-block bg-counts-grey px-4 py-2 rounded-full">
              <span className="text-sm text-counts-silver">Next free box in: </span>
              <span className="font-mono font-bold text-counts-gold">
                {user.isConnected ? getNextFreeEntry() : "Connect wallet"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={howItWorksOpen} onOpenChange={setHowItWorksOpen}>
        <DialogContent className="bg-counts-black border border-counts-red/30">
          <DialogHeader>
            <DialogTitle className="text-counts-gold text-2xl mb-4 font-bebasNeue">HOW IT WORKS 🏁</DialogTitle>
            <DialogDescription className="text-white">
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-counts-red text-white w-6 h-6 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">1</span>
                  <span><strong className="text-counts-gold">Connect</strong> - Enter a username to verify your identity and track your prizes.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-counts-red text-white w-6 h-6 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">2</span>
                  <span><strong className="text-counts-gold">Choose a Box</strong> - Select from gold, silver, bronze, chrome, flames, or custom mystery boxes, each with different prize tiers.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-counts-red text-white w-6 h-6 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">3</span>
                  <span><strong className="text-counts-gold">Win Prizes</strong> - Reveal your prize instantly! Car parts, merchandise, cash or exclusive Counts Kustoms experiences will be awarded to you.</span>
                </li>
              </ol>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}
