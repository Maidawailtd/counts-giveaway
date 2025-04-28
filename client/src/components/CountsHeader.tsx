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
import countsLogoSrc from "@/assets/svg/counts-logo.svg";

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
    <header className="bg-black py-4 px-4 md:px-8 border-b border-[#cc0000]/20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src={countsLogoSrc} 
            alt="Counts Kustoms" 
            className="h-12 md:h-16"
          />
          <h1 className="text-xl md:text-2xl font-bold font-bebasNeue text-[#cc0000] ml-2">
            GIVEAWAY
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {user.isConnected ? (
            <>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm text-gray-300">Connected as</span>
                <span className="font-semibold text-[#cc0000]">{user.username}</span>
                <span className="text-xs text-gray-400">
                  {formatWalletAddress(user.walletAddress || "")}
                </span>
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </>
          ) : (
            <Button 
              variant="destructive"
              onClick={() => setIsConnectOpen(true)}
            >
              Connect
            </Button>
          )}
        </div>
      </div>

      {/* Connect Dialog */}
      <Dialog open={isConnectOpen} onOpenChange={setIsConnectOpen}>
        <DialogContent className="sm:max-w-md bg-black border border-[#cc0000]/20">
          <DialogHeader>
            <DialogTitle className="text-xl font-bebasNeue text-[#cc0000]">CONNECT TO GIVEAWAY</DialogTitle>
            <DialogDescription>
              Enter a username to participate in the Counts Kustoms giveaway
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-zinc-900 border-zinc-700"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConnectOpen(false)}
              disabled={isConnecting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
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