import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Gift, Trophy } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 px-4 bg-gradient-to-b from-pepeDark to-pepeBg">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-center mb-12 text-pepeGold">How It Works 🎮</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-pepeDark/50 rounded-xl p-6 border border-pepeGreen/20 text-center relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-pepeGreen text-pepeDark w-10 h-10 rounded-full flex items-center justify-center font-poppins font-bold text-xl">1</div>
            <div className="h-24 flex items-center justify-center mb-4">
              <Wallet className="h-16 w-16 text-pepeGold" />
            </div>
            <h3 className="font-poppins font-bold text-lg mb-3 text-pepeGold">Connect Wallet</h3>
            <p className="text-gray-300 text-sm">Link your crypto wallet to verify your identity and track your rewards.</p>
          </div>

          <div className="bg-pepeDark/50 rounded-xl p-6 border border-pepeGreen/20 text-center relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-pepeGreen text-pepeDark w-10 h-10 rounded-full flex items-center justify-center font-poppins font-bold text-xl">2</div>
            <div className="h-24 flex items-center justify-center mb-4">
              <Gift className="h-16 w-16 text-pepeGold" />
            </div>
            <h3 className="font-poppins font-bold text-lg mb-3 text-pepeGold">Choose a Box</h3>
            <p className="text-gray-300 text-sm">Select from gold, silver, or bronze mystery boxes, each with different prize tiers.</p>
          </div>

          <div className="bg-pepeDark/50 rounded-xl p-6 border border-pepeGreen/20 text-center relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-pepeGreen text-pepeDark w-10 h-10 rounded-full flex items-center justify-center font-poppins font-bold text-xl">3</div>
            <div className="h-24 flex items-center justify-center mb-4">
              <Trophy className="h-16 w-16 text-pepeGold" />
            </div>
            <h3 className="font-poppins font-bold text-lg mb-3 text-pepeGold">Win Prizes</h3>
            <p className="text-gray-300 text-sm">Reveal your prize instantly! Tokens will be sent to your wallet, physical prizes shipped to you.</p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-pepeDark/50 rounded-xl border border-pepeGreen/20">
          <h3 className="font-poppins font-bold text-xl mb-4 text-pepeGold text-center">Free & Premium Entries</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-pepeDark/70 p-4 rounded-lg border border-gray-700">
              <h4 className="font-poppins font-semibold mb-2 flex items-center">
                <Gift className="h-4 w-4 mr-2 text-pepeGreen" /> Free Entries
              </h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="text-pepeGreen mr-2">✓</span>
                  <span>2 free entries every 24 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pepeGreen mr-2">✓</span>
                  <span>Access to bronze and silver boxes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pepeGreen mr-2">✓</span>
                  <span>Chance to win common and rare prizes</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pepeGold/20 to-pepeGold/5 p-4 rounded-lg border border-pepeGold/30">
              <h4 className="font-poppins font-semibold mb-2 flex items-center">
                <div className="mr-2 text-pepeGold">👑</div> Premium Entries
              </h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="text-pepeGold mr-2">✓</span>
                  <span>Purchase additional entries anytime</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pepeGold mr-2">✓</span>
                  <span>Access to all box types including gold</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pepeGold mr-2">✓</span>
                  <span>Higher chance for legendary prizes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}