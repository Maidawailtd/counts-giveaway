import { Twitter, Instagram, Youtube, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import countsLogoSrc from "@/assets/svg/counts-logo.svg";

export default function PepeFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black py-8 px-4 border-t border-[#cc0000]/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <img 
              src={countsLogoSrc} 
              alt="Counts Kustoms Logo" 
              className="h-12 mr-3" 
            />
            <h2 className="font-bebasNeue text-xl text-white">
              <span className="text-[#cc0000]">GIVEAWAY</span> by Danny Koker
            </h2>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-[#cc0000] transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#cc0000] transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#cc0000] transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#cc0000] transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <Separator className="bg-gray-800 my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© {currentYear} Counts Kustoms Giveaway by Danny Koker. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-[#cc0000] transition-colors text-sm">Terms & Conditions</a>
            <a href="#" className="text-gray-400 hover:text-[#cc0000] transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-[#cc0000] transition-colors text-sm">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
