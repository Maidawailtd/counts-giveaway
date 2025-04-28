import { 
  users, User, InsertUser, 
  prizes, Prize, InsertPrize, 
  giftBoxes, GiftBox, InsertGiftBox, 
  winners, Winner, InsertWinner,
  BoxType, PrizeTier, PrizeType
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserEntries(userId: number, entriesRemaining: number, nextFreeEntry?: Date): Promise<User | undefined>;

  // Prize methods
  getPrizes(): Promise<Prize[]>;
  getPrizesByTier(tier: PrizeTier): Promise<Prize[]>;
  createPrize(prize: InsertPrize): Promise<Prize>;

  // GiftBox methods
  getGiftBoxes(): Promise<GiftBox[]>;
  getGiftBoxByType(type: BoxType): Promise<GiftBox | undefined>;
  createGiftBox(giftBox: InsertGiftBox): Promise<GiftBox>;

  // Winner methods
  createWinner(winner: InsertWinner): Promise<Winner>;
  getRecentWinners(limit?: number): Promise<Winner[]>;
  getRandomPrizeForBox(boxType: BoxType): Promise<Prize | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private prizes: Map<number, Prize>;
  private giftBoxes: Map<number, GiftBox>;
  private winners: Map<number, Winner>;
  private currentUserId: number;
  private currentPrizeId: number;
  private currentGiftBoxId: number;
  private currentWinnerId: number;

  constructor() {
    this.users = new Map();
    this.prizes = new Map();
    this.giftBoxes = new Map();
    this.winners = new Map();
    this.currentUserId = 1;
    this.currentPrizeId = 1;
    this.currentGiftBoxId = 1;
    this.currentWinnerId = 1;

    // Initialize with default gift boxes
    this.initializeGiftBoxes();
    
    // Initialize with default prizes
    this.initializePrizes();
  }

  private initializeGiftBoxes() {
    // Gold box
    this.createGiftBox({
      name: "Gold Box",
      type: BoxType.GOLD,
      description: "Cash & NFT Prizes",
      image: "/src/assets/svg/gift-box-gold.svg",
      isPremium: true,
    });

    // Silver box
    this.createGiftBox({
      name: "Silver Box",
      type: BoxType.SILVER,
      description: "Cash & Merchandise",
      image: "/src/assets/svg/gift-box-silver.svg",
      isPremium: false,
    });

    // Bronze box
    this.createGiftBox({
      name: "Bronze Box",
      type: BoxType.BRONZE,
      description: "Collectibles & Merch",
      image: "/src/assets/svg/gift-box-bronze.svg",
      isPremium: false,
    });
    
    // Chrome box
    this.createGiftBox({
      name: "Chrome Box",
      type: BoxType.CHROME,
      description: "Premium Car Parts",
      image: "/src/assets/svg/gift-box-chrome.svg",
      isPremium: true,
    });
    
    // Flames box
    this.createGiftBox({
      name: "Flames Box",
      type: BoxType.FLAMES,
      description: "Custom Paint Jobs",
      image: "/src/assets/svg/gift-box-flames.svg",
      isPremium: true,
    });
    
    // Custom box
    this.createGiftBox({
      name: "Custom Box",
      type: BoxType.CUSTOM,
      description: "VIP Experiences",
      image: "/src/assets/svg/gift-box-custom.svg",
      isPremium: true,
    });
  }

  private initializePrizes() {
    // Legendary prizes
    this.createPrize({
      name: "Rare Pepe NFT",
      description: "A limited edition Pepe NFT worth ~$1000",
      type: PrizeType.NFT,
      tier: PrizeTier.LEGENDARY,
      image: "/src/assets/svg/pepe-nft.svg",
      value: "~$1000",
    });

    this.createPrize({
      name: "1M $PEPE",
      description: "One million Pepe tokens",
      type: PrizeType.TOKEN,
      tier: PrizeTier.LEGENDARY,
      image: "/src/assets/svg/pepe-token.svg",
      value: "1,000,000 $PEPE",
    });

    this.createPrize({
      name: "Signed Merch",
      description: "Exclusive signed merchandise from the Pepe Millonario team",
      type: PrizeType.MERCH,
      tier: PrizeTier.LEGENDARY,
      image: "/src/assets/svg/pepe-merch.svg",
      value: "Limited Edition",
    });

    this.createPrize({
      name: "1:1 Call",
      description: "Private call with the Pepe Millonario founder",
      type: PrizeType.CALL,
      tier: PrizeTier.LEGENDARY,
      image: "/src/assets/svg/pepe-merch.svg",
      value: "With Founder",
    });

    // Epic prizes
    this.createPrize({
      name: "Pepe Hoodie",
      description: "Premium Pepe Millonario hoodie",
      type: PrizeType.MERCH,
      tier: PrizeTier.EPIC,
      image: "/src/assets/svg/pepe-merch.svg",
      value: "Premium Merch",
    });

    this.createPrize({
      name: "250K $PEPE",
      description: "250,000 Pepe tokens",
      type: PrizeType.TOKEN,
      tier: PrizeTier.EPIC,
      image: "/src/assets/svg/pepe-token.svg",
      value: "250,000 $PEPE",
    });

    this.createPrize({
      name: "WL Access",
      description: "Whitelist access to next NFT drop",
      type: PrizeType.NFT,
      tier: PrizeTier.EPIC,
      image: "/src/assets/svg/pepe-nft.svg",
      value: "Next NFT Drop",
    });

    this.createPrize({
      name: "Discord Role",
      description: "VIP access to exclusive Discord channels",
      type: PrizeType.ROLE,
      tier: PrizeTier.EPIC,
      image: "/src/assets/svg/pepe-merch.svg",
      value: "VIP Access",
    });

    // Rare prizes
    this.createPrize({
      name: "50K $PEPE",
      description: "50,000 Pepe tokens",
      type: PrizeType.TOKEN,
      tier: PrizeTier.RARE,
      image: "/src/assets/svg/pepe-token.svg",
      value: "50,000 $PEPE",
    });

    this.createPrize({
      name: "Pepe Cap",
      description: "Stylish Pepe Millonario cap",
      type: PrizeType.MERCH,
      tier: PrizeTier.RARE,
      image: "/src/assets/svg/pepe-merch.svg",
      value: "Stylish Merch",
    });

    this.createPrize({
      name: "Stickers",
      description: "Set of collectible Pepe stickers",
      type: PrizeType.MERCH,
      tier: PrizeTier.RARE,
      image: "/src/assets/svg/pepe-merch.svg",
      value: "Collectible Set",
    });

    this.createPrize({
      name: "Digital Art",
      description: "Exclusive Pepe digital art wallpapers",
      type: PrizeType.ART,
      tier: PrizeTier.RARE,
      image: "/src/assets/svg/pepe-nft.svg",
      value: "Exclusive Design",
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const nextFreeEntry = new Date();
    nextFreeEntry.setHours(nextFreeEntry.getHours() + 24);
    
    const user: User = { 
      ...insertUser, 
      id, 
      entriesRemaining: 2,
      nextFreeEntry
    };
    
    this.users.set(id, user);
    return user;
  }

  async updateUserEntries(userId: number, entriesRemaining: number, nextFreeEntry?: Date): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;

    const updatedUser: User = {
      ...user,
      entriesRemaining,
      nextFreeEntry: nextFreeEntry || user.nextFreeEntry
    };

    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Prize methods
  async getPrizes(): Promise<Prize[]> {
    return Array.from(this.prizes.values());
  }

  async getPrizesByTier(tier: PrizeTier): Promise<Prize[]> {
    return Array.from(this.prizes.values()).filter(prize => prize.tier === tier);
  }

  async createPrize(insertPrize: InsertPrize): Promise<Prize> {
    const id = this.currentPrizeId++;
    const prize: Prize = { ...insertPrize, id };
    this.prizes.set(id, prize);
    return prize;
  }

  // GiftBox methods
  async getGiftBoxes(): Promise<GiftBox[]> {
    return Array.from(this.giftBoxes.values());
  }

  async getGiftBoxByType(type: BoxType): Promise<GiftBox | undefined> {
    return Array.from(this.giftBoxes.values()).find(box => box.type === type);
  }

  async createGiftBox(insertGiftBox: InsertGiftBox): Promise<GiftBox> {
    const id = this.currentGiftBoxId++;
    const giftBox: GiftBox = { ...insertGiftBox, id };
    this.giftBoxes.set(id, giftBox);
    return giftBox;
  }

  // Winner methods
  async createWinner(insertWinner: InsertWinner): Promise<Winner> {
    const id = this.currentWinnerId++;
    const timestamp = new Date();
    const winner: Winner = { ...insertWinner, id, timestamp };
    this.winners.set(id, winner);
    return winner;
  }

  async getRecentWinners(limit = 10): Promise<Winner[]> {
    return Array.from(this.winners.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async getRandomPrizeForBox(boxType: BoxType): Promise<Prize | undefined> {
    let eligiblePrizes: Prize[] = [];
    
    switch (boxType) {
      case BoxType.GOLD:
        // Gold boxes can yield legendary prizes
        eligiblePrizes = await this.getPrizesByTier(PrizeTier.LEGENDARY);
        break;
      case BoxType.SILVER:
        // Silver boxes can yield epic prizes
        eligiblePrizes = await this.getPrizesByTier(PrizeTier.EPIC);
        break;
      case BoxType.BRONZE:
        // Bronze boxes can yield rare prizes
        eligiblePrizes = await this.getPrizesByTier(PrizeTier.RARE);
        break;
      case BoxType.CHROME:
        // Chrome boxes can yield legendary or epic prizes
        const chromePrizes = [
          ...(await this.getPrizesByTier(PrizeTier.LEGENDARY)),
          ...(await this.getPrizesByTier(PrizeTier.EPIC))
        ];
        eligiblePrizes = chromePrizes;
        break;
      case BoxType.FLAMES:
        // Flames boxes can yield epic prizes with higher chance of legendary
        const flamesPrizes = [
          ...(await this.getPrizesByTier(PrizeTier.LEGENDARY)),
          ...(await this.getPrizesByTier(PrizeTier.LEGENDARY)),
          ...(await this.getPrizesByTier(PrizeTier.EPIC))
        ];
        eligiblePrizes = flamesPrizes;
        break;
      case BoxType.CUSTOM:
        // Custom boxes can yield any prize with higher chance of legendary
        const customPrizes = [
          ...(await this.getPrizesByTier(PrizeTier.LEGENDARY)),
          ...(await this.getPrizesByTier(PrizeTier.LEGENDARY)),
          ...(await this.getPrizesByTier(PrizeTier.EPIC)),
          ...(await this.getPrizesByTier(PrizeTier.RARE))
        ];
        eligiblePrizes = customPrizes;
        break;
      default:
        return undefined;
    }
    
    if (eligiblePrizes.length === 0) return undefined;
    
    // Get random prize from eligible prizes
    const randomIndex = Math.floor(Math.random() * eligiblePrizes.length);
    return eligiblePrizes[randomIndex];
  }
}

export const storage = new MemStorage();
