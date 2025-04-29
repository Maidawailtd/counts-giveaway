import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGiveaway } from "@/context/GiveawayContext";
import { cn } from "@/lib/utils";

export default function PrizeShowcase() {
  const { legendaryPrizes, epicPrizes, rarePrizes, isLoading } = useGiveaway();

  if (isLoading) {
    return (
      <section className="py-12 px-4 bg-pepeBg">
        <div className="container mx-auto text-center">
          <div className="animate-pulse">Loading prizes...</div>
        </div>
      </section>
    );
  }

  // Function to render prize items in a grid
  const renderPrizeGrid = (prizes: any[]) => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {prizes.map((prize, index) => (
          <div key={index} className="bg-pepeDark/50 rounded-lg p-3 text-center transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:bg-pepeDark/70">
            {prize.type === "TOKEN" ? (
              <div className="w-full h-32 bg-gradient-to-br from-pepeGreen to-pepeGold rounded-md mb-2 flex items-center justify-center">
                <span className="text-3xl">💰</span>
              </div>
            ) : prize.type === "CALL" ? (
              <div className="w-full h-32 bg-gradient-to-br from-pepeGold to-amber-700 rounded-md mb-2 flex items-center justify-center">
                <span className="text-3xl">🤝</span>
              </div>
            ) : prize.type === "ROLE" ? (
              <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-md mb-2 flex items-center justify-center">
                <span className="text-3xl">🎟️</span>
              </div>
            ) : (
              <img 
                src={prize.image} 
                alt={prize.name} 
                className="w-full h-32 object-cover rounded-md mb-2" 
              />
            )}
            <p className="font-medium">{prize.name}</p>
            <p className="text-xs text-pepeGold">{prize.value}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="prizes" className="py-12 px-4 bg-pepeBg scroll-mt-20">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-center mb-4 text-pepeGold">Prize Showcase 💎</h2>
        <p className="text-center max-w-3xl mx-auto mb-10 text-gray-300">Discover the exciting prizes waiting for you inside the Pepe Millonario mystery boxes!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Legendary Prizes */}
          <Card className="bg-gradient-to-br from-pepeDark to-pepeDark/70 rounded-xl overflow-hidden border border-pepeGold/20">
            <CardHeader className={cn(
              "bg-pepeGold text-pepeDark font-poppins font-bold text-center py-2 px-6",
              "flex flex-row items-center justify-center"
            )}>
              LEGENDARY PRIZES
            </CardHeader>
            <CardContent className="p-6">
              {renderPrizeGrid(legendaryPrizes)}
            </CardContent>
          </Card>

          {/* Epic Prizes */}
          <Card className="bg-gradient-to-br from-pepeDark to-pepeDark/70 rounded-xl overflow-hidden border border-zinc-400/20">
            <CardHeader className={cn(
              "bg-zinc-400 text-pepeDark font-poppins font-bold text-center py-2 px-6",
              "flex flex-row items-center justify-center"
            )}>
              EPIC PRIZES
            </CardHeader>
            <CardContent className="p-6">
              {renderPrizeGrid(epicPrizes)}
            </CardContent>
          </Card>

          {/* Rare Prizes */}
          <Card className="bg-gradient-to-br from-pepeDark to-pepeDark/70 rounded-xl overflow-hidden border border-amber-700/20">
            <CardHeader className={cn(
              "bg-amber-700 text-white font-poppins font-bold text-center py-2 px-6",
              "flex flex-row items-center justify-center"
            )}>
              RARE PRIZES
            </CardHeader>
            <CardContent className="p-6">
              {renderPrizeGrid(rarePrizes)}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}