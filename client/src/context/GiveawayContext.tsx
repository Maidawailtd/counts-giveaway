import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { GiftBox, Prize, Winner, BoxType } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface UserState {
  id?: number;
  username?: string;
  walletAddress?: string;
  entriesRemaining: number;
  nextFreeEntry?: Date;
  isConnected: boolean;
}

interface GiveawayContextType {
  user: UserState;
  giftBoxes: GiftBox[];
  recentWinners: Winner[];
  legendaryPrizes: Prize[];
  epicPrizes: Prize[];
  rarePrizes: Prize[];
  selectedBox: GiftBox | null;
  isOpeningBox: boolean;
  winResult: {
    prize: Prize | null;
    isRevealed: boolean;
  };
  connectWallet: (username: string) => Promise<void>;
  disconnectWallet: () => void;
  selectBox: (box: GiftBox) => void;
  openBox: () => Promise<void>;
  resetReveal: () => void;
  fetchBoxes: () => Promise<void>;
  fetchWinners: () => Promise<void>;
  fetchPrizes: () => Promise<void>;
}

const defaultUser: UserState = {
  entriesRemaining: 0,
  isConnected: false,
};

const GiveawayContext = createContext<GiveawayContextType | undefined>(undefined);

export function GiveawayProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserState>(defaultUser);
  const [giftBoxes, setGiftBoxes] = useState<GiftBox[]>([]);
  const [recentWinners, setRecentWinners] = useState<Winner[]>([]);
  const [legendaryPrizes, setLegendaryPrizes] = useState<Prize[]>([]);
  const [epicPrizes, setEpicPrizes] = useState<Prize[]>([]);
  const [rarePrizes, setRarePrizes] = useState<Prize[]>([]);
  const [selectedBox, setSelectedBox] = useState<GiftBox | null>(null);
  const [isOpeningBox, setIsOpeningBox] = useState(false);
  const [winResult, setWinResult] = useState<{ prize: Prize | null; isRevealed: boolean }>({
    prize: null,
    isRevealed: false,
  });
  
  const { toast } = useToast();

  // Fetch initial data
  useEffect(() => {
    fetchBoxes();
    fetchWinners();
    fetchPrizes();
  }, []);

  const fetchBoxes = async () => {
    try {
      const response = await fetch("/api/gift-boxes");
      if (!response.ok) throw new Error("Failed to fetch gift boxes");
      const data = await response.json();
      setGiftBoxes(data);
    } catch (error) {
      console.error("Error fetching gift boxes:", error);
      setGiftBoxes([]);
      toast({
        title: "Error",
        description: "Failed to load gift boxes. Please refresh the page.",
        variant: "destructive",
      });
      toast({
        title: "Error",
        description: "Failed to load gift boxes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchWinners = async () => {
    try {
      const response = await fetch("/api/winners");
      if (!response.ok) throw new Error("Failed to fetch winners");
      const data = await response.json();
      setRecentWinners(data);
    } catch (error) {
      console.error("Error fetching winners:", error);
      toast({
        title: "Error",
        description: "Failed to load recent winners. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchPrizes = async () => {
    try {
      // Fetch legendary prizes
      const legendaryResponse = await fetch("/api/prizes/LEGENDARY");
      if (!legendaryResponse.ok) throw new Error("Failed to fetch legendary prizes");
      const legendaryData = await legendaryResponse.json();
      setLegendaryPrizes(legendaryData);

      // Fetch epic prizes
      const epicResponse = await fetch("/api/prizes/EPIC");
      if (!epicResponse.ok) throw new Error("Failed to fetch epic prizes");
      const epicData = await epicResponse.json();
      setEpicPrizes(epicData);

      // Fetch rare prizes
      const rareResponse = await fetch("/api/prizes/RARE");
      if (!rareResponse.ok) throw new Error("Failed to fetch rare prizes");
      const rareData = await rareResponse.json();
      setRarePrizes(rareData);
    } catch (error) {
      console.error("Error fetching prizes:", error);
      toast({
        title: "Error",
        description: "Failed to load prizes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const connectWallet = async (username: string) => {
    try {
      const response = await apiRequest("POST", "/api/users", {
        username,
        password: "tempPassword", // In a real app, we would generate this or use wallet authentication
        walletAddress: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}` // Simulated address
      });
      
      const userData = await response.json();
      
      setUser({
        id: userData.id,
        username: userData.username,
        walletAddress: userData.walletAddress,
        entriesRemaining: userData.entriesRemaining || 2,
        nextFreeEntry: userData.nextFreeEntry ? new Date(userData.nextFreeEntry) : undefined,
        isConnected: true,
      });
      
      toast({
        title: "Connected",
        description: "Wallet connected successfully!",
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    setUser(defaultUser);
    toast({
      title: "Disconnected",
      description: "Wallet disconnected successfully.",
    });
  };

  const selectBox = (box: GiftBox) => {
    setSelectedBox(box);
    setWinResult({ prize: null, isRevealed: false });
  };

  const openBox = async () => {
    if (!user.isConnected || !selectedBox || user.entriesRemaining <= 0) {
      toast({
        title: "Cannot open box",
        description: user.isConnected 
          ? "You have no entries remaining!" 
          : "Please connect your wallet first!",
        variant: "destructive",
      });
      return;
    }

    setIsOpeningBox(true);

    try {
      const response = await apiRequest("POST", "/api/open-box", {
        userId: user.id,
        boxType: selectedBox.type,
      });

      const result = await response.json();
      
      // Wait for animation
      setTimeout(() => {
        setWinResult({
          prize: result.prize,
          isRevealed: true,
        });
        
        // Update user entries
        setUser(prev => ({
          ...prev,
          entriesRemaining: result.entriesRemaining,
        }));
        
        // Refresh winners list
        fetchWinners();
        
        setIsOpeningBox(false);
      }, 1000);
    } catch (error) {
      setIsOpeningBox(false);
      console.error("Error opening box:", error);
      toast({
        title: "Error",
        description: "Failed to open the box. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetReveal = () => {
    setWinResult({ prize: null, isRevealed: false });
    setSelectedBox(null);
  };

  return (
    <GiveawayContext.Provider
      value={{
        user,
        giftBoxes,
        recentWinners,
        legendaryPrizes,
        epicPrizes,
        rarePrizes,
        selectedBox,
        isOpeningBox,
        winResult,
        connectWallet,
        disconnectWallet,
        selectBox,
        openBox,
        resetReveal,
        fetchBoxes,
        fetchWinners,
        fetchPrizes,
      }}
    >
      {children}
    </GiveawayContext.Provider>
  );
}

export const useGiveaway = () => {
  const context = useContext(GiveawayContext);
  if (context === undefined) {
    throw new Error("useGiveaway must be used within a GiveawayProvider");
  }
  return context;
};
