import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Car, Facebook, Instagram } from "lucide-react";
import { useState } from "react";
import { useGiveaway } from "@/context/GiveawayContext";

export default function CountsHeader() {
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
    <header className="bg-counts-black py-4 px-4 md:px-8 lg:px-12 border-b border-counts-red/30">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img 
            src="/src/assets/svg/counts-logo.svg" 
            alt="Counts Kustoms Logo" 
            className="w-12 h-12 mr-3 animate-float" 
          />
          <h1 className="font-bebas text-2xl md:text-3xl text-counts-silver tracking-wide">
            COUNTS <span className="text-counts-red">KUSTOMS</span>
          </h1>
        </div>
        <div className="flex space-x-4">
          {user.isConnected ? (
            <Button 
              className="bg-counts-red hover:bg-opacity-80 px-4 py-2 rounded-lg font-bebas tracking-wide transition-all transform hover:scale-105"
              onClick={disconnectWallet}
            >
              <Wallet className="mr-2 h-4 w-4" /> 
              {user.walletAddress?.substring(0, 8)}...
            </Button>
          ) : (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-counts-red hover:bg-opacity-80 px-4 py-2 rounded-lg font-bebas tracking-wide transition-all transform hover:scale-105"
                >
                  <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-counts-black border border-counts-red/20">
                <DialogHeader>
                  <DialogTitle className="text-counts-silver text-xl font-bebas">Connect Wallet</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="username" className="text-white mb-2 block">Enter username</Label>
                  <Input 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Your username" 
                    className="bg-counts-bg text-white border-gray-700"
                  />
                </div>
                <DialogFooter>
                  <Button 
                    onClick={handleConnect}
                    className="bg-counts-red text-white hover:bg-opacity-80"
                  >
                    Connect
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-white hover:text-counts-red transition-colors">
              <Car className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-counts-red transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-counts-red transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}