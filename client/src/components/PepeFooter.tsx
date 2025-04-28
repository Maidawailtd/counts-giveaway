import { Twitter, Instagram, Youtube, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import countsLogoSrc from "@/assets/svg/counts-logo.svg";

export default function PepeFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-counts-black py-8 px-4 border-t border-counts-red/30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <img 
              src={countsLogoSrc} 
              alt="Counts Kustoms Logo" 
              className="h-12 mr-3" 
            />
            <div>
              <h2 className="font-bebasNeue text-xl text-white">
                <span className="text-counts-red">GIVEAWAY</span> by Danny Koker
              </h2>
              <p className="text-xs text-counts-silver">Las Vegas, Nevada</p>
            </div>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-counts-silver hover:text-counts-red transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-counts-silver hover:text-counts-red transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-counts-silver hover:text-counts-red transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-counts-silver hover:text-counts-red transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <Separator className="bg-counts-grey my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-counts-silver text-sm mb-4 md:mb-0">© {currentYear} Counts Kustoms Giveaway by Danny Koker. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-counts-silver hover:text-counts-red transition-colors text-sm">Terms & Conditions</a>
            <a href="#" className="text-counts-silver hover:text-counts-red transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-counts-silver hover:text-counts-red transition-colors text-sm">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
