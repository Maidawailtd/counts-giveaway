import { useState } from "react";
import { useGiveaway } from "@/context/GiveawayContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { formatWalletAddress } from "@/lib/utils";
import countsMainLogoSrc from "@/assets/images/counts-main-logo.png";
import countsFlameLogoSrc from "@/assets/images/counts-flame-logo.png";

export default function CountsHeader() {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  
  const { user, connectWallet, disconnectWallet } = useGiveaway();
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username to connect",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    try {
      await connectWallet(username);
      setIsConnectOpen(false);
      toast({
        title: "Connected successfully",
        description: "You're now connected and ready to open gift boxes!",
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    toast({
      title: "Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  return (
    <header className="bg-counts-black py-4 px-4 md:px-8 border-b border-counts-red/30">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col items-center md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <img 
              src={countsMainLogoSrc} 
              alt="Counts Kustoms" 
              className="h-16 md:h-20 mb-2 md:mb-0"
            />
            <img 
              src={countsFlameLogoSrc} 
              alt="Counts Kustoms Flames" 
              className="h-8 md:h-10 mt-1 md:mt-0"
            />
          </div>
          <div className="ml-0 md:ml-4 mt-2 md:mt-0 border-t-2 md:border-t-0 md:border-l-2 border-counts-gold pt-2 md:pt-0 md:pl-4 flex flex-col items-center md:items-start">
            <h1 className="text-xl md:text-2xl font-bold font-bebasNeue text-counts-gold">
              GIVEAWAY
            </h1>
            <p className="text-xs text-counts-silver mt-0.5 font-bebasNeue">BY DANNY KOKER</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {user.isConnected ? (
            <>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm text-counts-silver">Connected as</span>
                <span className="font-semibold text-counts-red">{user.username}</span>
                <span className="text-xs text-gray-400">
                  {formatWalletAddress(user.walletAddress || "")}
                </span>
              </div>
              <Button 
                className="bg-counts-red hover:bg-counts-red/80 border-none" 
                size="sm"
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </>
          ) : (
            <Button 
              className="bg-counts-red hover:bg-counts-red/80 border-none"
              onClick={() => setIsConnectOpen(true)}
            >
              Connect
            </Button>
          )}
        </div>
      </div>

      {/* Connect Dialog */}
      <Dialog open={isConnectOpen} onOpenChange={setIsConnectOpen}>
        <DialogContent className="sm:max-w-md bg-counts-black border border-counts-red/30">
          <DialogHeader>
            <DialogTitle className="text-xl font-bebasNeue text-counts-red">CONNECT TO GIVEAWAY</DialogTitle>
            <DialogDescription className="text-counts-silver">
              Enter a username to participate in the Counts Kustoms giveaway
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-counts-silver">
                Username
              </label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-counts-grey border-counts-red/30 text-white"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              className="border-counts-red/50 text-counts-silver hover:bg-counts-grey"
              variant="outline"
              onClick={() => setIsConnectOpen(false)}
              disabled={isConnecting}
            >
              Cancel
            </Button>
            <Button 
              className="bg-counts-red hover:bg-counts-red/80 border-none"
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}