import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { useGiveaway } from "@/context/GiveawayContext";
import { formatDistanceToNow } from "date-fns";

export default function WinnersSection() {
  const { recentWinners } = useGiveaway();

  const formatTimeAgo = (timestamp: string | Date) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return "some time ago";
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-pepeBg to-pepeDark px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-center mb-10 text-pepeGold flex items-center justify-center">
          <Trophy className="mr-2 h-8 w-8" /> Recent Winners
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentWinners.length > 0 ? (
            recentWinners.slice(0, 6).map((winner) => (
              <Card 
                key={winner.id} 
                className="bg-pepeDark/80 rounded-xl border border-pepeGreen/20 transform transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(90,190,66,0.3)]"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-pepeGold bg-pepeGreen/30 flex items-center justify-center text-xl">
                      🐸
                    </div>
                    <div className="ml-4">
                      <h3 className="font-poppins font-bold text-pepeGold">
                        {winner.walletAddress ? 
                          winner.walletAddress.substring(0, 6) + "..." + winner.walletAddress.substring(winner.walletAddress.length - 4) : 
                          winner.username
                        }
                      </h3>
                      <p className="text-sm text-gray-400">{formatTimeAgo(winner.timestamp)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      {winner.boxType === "GOLD" ? (
                        <div className="w-16 h-16 bg-gradient-to-br from-pepeGold/80 to-pepeGold rounded-md flex items-center justify-center">
                          <span className="text-3xl">🏆</span>
                        </div>
                      ) : winner.boxType === "SILVER" ? (
                        <div className="w-16 h-16 bg-gradient-to-br from-zinc-400 to-zinc-500 rounded-md flex items-center justify-center">
                          <span className="text-3xl">🥈</span>
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-700 to-amber-800 rounded-md flex items-center justify-center">
                          <span className="text-3xl">🥉</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">Won <span className="text-pepeGold">{winner.prizeId}</span></p>
                      <p className="text-sm text-gray-400">From {winner.boxType.charAt(0) + winner.boxType.slice(1).toLowerCase()} Box</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-1 md:col-span-3 text-center py-10">
              <p className="text-gray-400">No winners yet. Be the first one!</p>
            </div>
          )}
        </div>
        
        {recentWinners.length > 6 && (
          <div className="text-center mt-10">
            <Button 
              className="bg-pepeDark hover:bg-opacity-80 px-6 py-3 rounded-lg font-poppins font-semibold border border-pepeGold/40 transition-all transform hover:scale-105"
            >
              View All Winners
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
