import { Twitter, Send, Github, Newspaper } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function PepeFooter() {
  return (
    <footer className="bg-pepeDark py-8 px-4 border-t border-pepeGreen/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <img 
              src="/src/assets/svg/pepe-logo.svg" 
              alt="Pepe Millonario Logo" 
              className="w-10 h-10 rounded-full mr-3" 
            />
            <h2 className="font-poppins font-bold text-xl text-pepeGold">
              Pepe <span className="text-pepeGreen">Millonario</span>
            </h2>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-pepeGold transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-pepeGold transition-colors">
              <Send className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-pepeGold transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-pepeGold transition-colors">
              <Newspaper className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <Separator className="bg-gray-800 my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2023 Pepe Millonario. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-pepeGold transition-colors text-sm">Terms & Conditions</a>
            <a href="#" className="text-gray-400 hover:text-pepeGold transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-pepeGold transition-colors text-sm">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
