import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Twitter, Send, Github } from "lucide-react";
import { useGiveaway } from "@/context/GiveawayContext";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function BoxOpeningModal() {
  const { selectedBox, isOpeningBox, winResult, openBox, resetReveal } = useGiveaway();
  const [isOpen, setIsOpen] = useState(true);
  const [confetti, setConfetti] = useState<{id: number, style: React.CSSProperties}[]>([]);
  
  const handleClose = () => {
    setIsOpen(false);
    resetReveal();
  };
  
  const createConfetti = () => {
    const colors = ['#5ABE42', '#FFD700', '#FF6B6B', '#3498db'];
    const newConfetti = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      style: {
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.random() * 100}%`,
        top: '0',
        width: `${Math.random() * 10 + 5}px`,
        height: `${Math.random() * 10 + 5}px`,
        transform: `rotate(${Math.random() * 360}deg)`,
        opacity: 0,
        animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
        animationDelay: `${Math.random() * 0.5}s`,
        position: 'absolute',
      } as React.CSSProperties
    }));
    
    setConfetti(newConfetti);
    
    // Clean up confetti after animation
    setTimeout(() => {
      setConfetti([]);
    }, 5000);
  };
  
  const handleOpenBox = () => {
    openBox();
    createConfetti();
  };
  
  if (!selectedBox) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="bg-gradient-to-br from-pepeDark to-pepeBg rounded-2xl p-6 max-w-md w-full mx-4 relative border border-pepeGreen/30"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={handleClose}
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="text-center">
          <h3 className="font-poppins font-bold text-2xl mb-2 text-pepeGold">
            Opening {selectedBox.name}
          </h3>
          <p className="text-gray-300 mb-6">
            {winResult.isRevealed ? "Here's what you won!" : "Let's see what you've won!"}
          </p>
          
          <div className="relative">
            {confetti.map((c) => (
              <div key={c.id} className="confetti" style={c.style} />
            ))}
            
            <div className={cn(
              "w-48 h-48 mx-auto relative mb-6",
              isOpeningBox && "opening-animation",
              winResult.isRevealed && "hidden"
            )}>
              <img 
                src={selectedBox.image} 
                alt={selectedBox.name} 
                className="w-full h-full object-contain" 
              />
            </div>
            
            {winResult.isRevealed && winResult.prize && (
              <div className="text-center">
                <div className="w-48 h-48 mx-auto relative mb-4">
                  <img 
                    src={winResult.prize.image} 
                    alt={winResult.prize.name} 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <h4 className="font-poppins font-bold text-xl text-pepeGold mb-2">
                  {winResult.prize.name}!
                </h4>
                <p className="text-gray-300 mb-6">
                  {winResult.prize.description}
                </p>
              </div>
            )}
          </div>
          
          {!winResult.isRevealed && (
            <>
              {selectedBox.isPremium && (
                <p className="text-sm text-gray-400 mb-2">
                  This is a premium box. Payment required to open.
                </p>
              )}
              <Button 
                className="bg-pepeGold hover:bg-opacity-80 px-6 py-3 rounded-lg font-poppins font-bold text-pepeDark transition-all transform hover:scale-105 mb-4 w-full"
                onClick={handleOpenBox}
                disabled={isOpeningBox}
              >
                {isOpeningBox ? "Opening..." : selectedBox.isPremium ? `Pay to Open (${selectedBox.type === 'GOLD' ? '0.1 ETH' : '0.05 ETH'})` : "Open Box"}
              </Button>
            </>
          )}
          
          {winResult.isRevealed && (
            <div>
              <p className="text-sm text-gray-400 mb-3">Share your win:</p>
              <div className="flex justify-center space-x-4">
                <Button 
                  className="bg-[#1DA1F2] hover:bg-opacity-80 w-10 h-10 rounded-full flex items-center justify-center transition-all p-0"
                  size="icon"
                  variant="ghost"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button 
                  className="bg-[#0088cc] hover:bg-opacity-80 w-10 h-10 rounded-full flex items-center justify-center transition-all p-0"
                  size="icon"
                  variant="ghost"
                >
                  <Send className="h-5 w-5" />
                </Button>
                <Button 
                  className="bg-[#5865F2] hover:bg-opacity-80 w-10 h-10 rounded-full flex items-center justify-center transition-all p-0"
                  size="icon"
                  variant="ghost"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
