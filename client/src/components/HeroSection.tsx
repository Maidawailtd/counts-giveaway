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
        <div className="absolute top-10 left-10 text-9xl text-pepeGreen animate-float">🐸</div>
        <div className="absolute bottom-10 right-10 text-9xl text-pepeGreen animate-float" style={{ animationDelay: "1s" }}>💰</div>
        <div className="absolute top-40 right-20 text-8xl text-pepeGreen animate-float" style={{ animationDelay: "2s" }}>🚀</div>
        <div className="absolute bottom-40 left-20 text-8xl text-pepeGreen animate-float" style={{ animationDelay: "1.5s" }}>💎</div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold mb-6 text-pepeGold">
            Epic <span className="text-pepeGreen">Pepe</span> Giveaway
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Open mystery boxes, win $PEPE tokens, NFTs, and exclusive merch! 
            Join the Pepe Millonario community and become the next crypto winner.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <Button 
              className="bg-pepeGold hover:bg-opacity-80 px-6 py-6 rounded-lg font-poppins font-bold text-pepeDark transition-all transform hover:scale-105 shadow-lg h-12"
              onClick={() => handleScrollToSection("giftBoxes")}
            >
              <Gift className="mr-2 h-5 w-5" /> Participate Now
            </Button>
            <Button 
              className="bg-pepeGreen hover:bg-opacity-80 px-6 py-6 rounded-lg font-poppins font-bold transition-all transform hover:scale-105 shadow-lg h-12"
              onClick={() => setHowItWorksOpen(true)}
            >
              <Info className="mr-2 h-5 w-5" /> How It Works
            </Button>
          </div>
        </div>
        
        <div id="giftBoxes" className="bg-pepeDark/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-pepeGreen/20 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="font-poppins text-2xl font-bold text-pepeGold mb-3">Current Giveaways</h3>
            <p className="text-gray-300">Choose a mystery box to reveal your prize!</p>
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
            <p className="text-sm text-gray-400 mb-4">
              You have {user.isConnected ? user.entriesRemaining : 0} free entries remaining today
            </p>
            <div className="inline-block bg-pepeDark px-4 py-2 rounded-full">
              <span className="text-sm text-gray-300">Next free box in: </span>
              <span className="font-mono font-bold text-pepeGold">
                {user.isConnected ? getNextFreeEntry() : "Connect wallet"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={howItWorksOpen} onOpenChange={setHowItWorksOpen}>
        <DialogContent className="bg-pepeDark border border-pepeGreen/20">
          <DialogHeader>
            <DialogTitle className="text-pepeGold text-2xl mb-4">How It Works 🎮</DialogTitle>
            <DialogDescription className="text-white">
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-pepeGreen text-pepeDark w-6 h-6 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">1</span>
                  <span><strong className="text-pepeGold">Connect Wallet</strong> - Link your crypto wallet to verify your identity and track your rewards.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-pepeGreen text-pepeDark w-6 h-6 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">2</span>
                  <span><strong className="text-pepeGold">Choose a Box</strong> - Select from gold, silver, or bronze mystery boxes, each with different prize tiers.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-pepeGreen text-pepeDark w-6 h-6 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">3</span>
                  <span><strong className="text-pepeGold">Win Prizes</strong> - Reveal your prize instantly! Tokens will be sent to your wallet, physical prizes shipped to you.</span>
                </li>
              </ol>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}
