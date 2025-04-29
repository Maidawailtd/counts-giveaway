import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Twitter, Send, Github } from "lucide-react";
import { useState } from "react";
import { useGiveaway } from "@/context/GiveawayContext";

export default function PepeHeader() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const { user, connectWallet, disconnectWallet } = useGiveaway();

  const handleConnect = async () => {
    if (username.trim()) {
      await connectWallet(username);
      setDialogOpen(false);
    }
  };

  return (
    <header className="bg-pepeDark py-4 px-4 md:px-8 lg:px-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <a href="/" className="hover:opacity-80 transition-opacity">
            <img 
              src="/src/assets/svg/pepe-logo.svg" 
              alt="Pepe Millonario Logo" 
              className="w-12 h-12 rounded-full mr-3 animate-float" 
            />
          </a>
          <h1 className="font-poppins font-bold text-2xl md:text-3xl text-pepeGold">
            Pepe <span className="text-pepeGreen">Millonario</span>
          </h1>
        </div>
        <div className="flex space-x-4">
          {user.isConnected ? (
            <Button 
              className="bg-pepeGreen hover:bg-opacity-80 px-4 py-2 rounded-lg font-poppins font-semibold transition-all transform hover:scale-105"
              onClick={disconnectWallet}
            >
              <Wallet className="mr-2 h-4 w-4" /> 
              {user.walletAddress?.substring(0, 8)}...
            </Button>
          ) : (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-pepeGreen hover:bg-opacity-80 px-4 py-2 rounded-lg font-poppins font-semibold transition-all transform hover:scale-105"
                >
                  <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-pepeDark border border-pepeGreen/20">
                <DialogHeader>
                  <DialogTitle className="text-pepeGold text-xl">Connect Wallet</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="username" className="text-white mb-2 block">Enter username</Label>
                  <Input 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Your username" 
                    className="bg-pepeBg text-white border-gray-700"
                  />
                </div>
                <DialogFooter>
                  <Button 
                    onClick={handleConnect}
                    className="bg-pepeGold text-pepeDark hover:bg-opacity-80"
                  >
                    Connect
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="hover:text-pepeGold transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-pepeGold transition-colors">
              <Send className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-pepeGold transition-colors">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
