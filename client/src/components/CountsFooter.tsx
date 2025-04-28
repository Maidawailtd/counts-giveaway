import { Link } from "wouter";

export default function CountsFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white py-8 border-t border-[#cc0000]/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bebasNeue text-[#cc0000] mb-4">COUNTS KUSTOMS</h3>
            <p className="text-gray-400 text-sm">
              The official giveaway platform by Danny Koker. Win exclusive car parts, 
              merchandise, custom work, and more!
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bebasNeue text-[#cc0000] mb-4">LINKS</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-[#cc0000] transition-colors">Home</Link></li>
              <li><a href="#prizes" className="hover:text-[#cc0000] transition-colors">Prizes</a></li>
              <li><a href="#how-it-works" className="hover:text-[#cc0000] transition-colors">How It Works</a></li>
              <li><a href="#winners" className="hover:text-[#cc0000] transition-colors">Winners</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bebasNeue text-[#cc0000] mb-4">CONNECT</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#cc0000] transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-[#cc0000] transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-[#cc0000] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#cc0000] transition-colors">YouTube</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bebasNeue text-[#cc0000] mb-4">LEGAL</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#cc0000] transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#cc0000] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#cc0000] transition-colors">Giveaway Rules</a></li>
              <li><a href="#" className="hover:text-[#cc0000] transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {currentYear} Counts Kustoms Giveaway by Danny Koker. All rights reserved.</p>
          <p className="mt-2">Las Vegas, Nevada</p>
        </div>
      </div>
    </footer>
  );
}