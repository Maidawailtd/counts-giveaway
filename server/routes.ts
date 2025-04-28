import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { BoxType, insertUserSchema, insertWinnerSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get gift boxes
  app.get("/api/gift-boxes", async (req, res) => {
    try {
      const giftBoxes = await storage.getGiftBoxes();
      res.json(giftBoxes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gift boxes" });
    }
  });

  // Get recent winners
  app.get("/api/winners", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const winners = await storage.getRecentWinners(limit);
      res.json(winners);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch winners" });
    }
  });

  // Get prizes by tier
  app.get("/api/prizes/:tier", async (req, res) => {
    try {
      const tier = req.params.tier;
      const prizes = await storage.getPrizesByTier(tier as any);
      res.json(prizes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prizes" });
    }
  });

  // Get all prizes
  app.get("/api/prizes", async (req, res) => {
    try {
      const prizes = await storage.getPrizes();
      res.json(prizes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prizes" });
    }
  });

  // Create or login user with wallet address
  app.post("/api/users", async (req, res) => {
    try {
      const userDataSchema = z.object({
        username: z.string(),
        walletAddress: z.string().optional(),
        password: z.string()
      });
      
      const userData = userDataSchema.parse(req.body);
      
      // Check if user already exists
      let user = await storage.getUserByUsername(userData.username);
      
      if (!user) {
        // Create new user
        user = await storage.createUser({
          username: userData.username,
          password: userData.password,
          walletAddress: userData.walletAddress
        });
      }
      
      // Return user data without password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  // Open gift box
  app.post("/api/open-box", async (req, res) => {
    try {
      const openBoxSchema = z.object({
        userId: z.number(),
        boxType: z.nativeEnum(BoxType)
      });
      
      const { userId, boxType } = openBoxSchema.parse(req.body);
      
      // Get user
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Check if user has entries remaining
      if (user.entriesRemaining <= 0) {
        return res.status(400).json({ message: "No entries remaining" });
      }
      
      // Get gift box
      const giftBox = await storage.getGiftBoxByType(boxType);
      if (!giftBox) {
        return res.status(404).json({ message: "Gift box not found" });
      }
      
      // Check if box is premium and handle accordingly
      // For this MVP, we're allowing any box to be opened with remaining entries
      
      // Get random prize for the box
      const prize = await storage.getRandomPrizeForBox(boxType);
      if (!prize) {
        return res.status(500).json({ message: "Failed to get a prize" });
      }
      
      // Create winner record
      const winner = await storage.createWinner({
        userId,
        prizeId: prize.id,
        boxType,
        username: user.username,
        walletAddress: user.walletAddress
      });
      
      // Update user entries
      const updatedUser = await storage.updateUserEntries(userId, user.entriesRemaining - 1);
      
      res.json({ 
        prize,
        winner,
        entriesRemaining: updatedUser?.entriesRemaining || 0
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid data for opening a box" });
    }
  });

  // Reset free entries (would normally be handled by a cron job)
  app.post("/api/reset-entries", async (req, res) => {
    try {
      const resetSchema = z.object({
        userId: z.number()
      });
      
      const { userId } = resetSchema.parse(req.body);
      
      // Get user
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Reset entries and set next free entry time
      const nextFreeEntry = new Date();
      nextFreeEntry.setHours(nextFreeEntry.getHours() + 24);
      
      const updatedUser = await storage.updateUserEntries(userId, 2, nextFreeEntry);
      
      const { password, ...userWithoutPassword } = updatedUser!;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ message: "Invalid data for resetting entries" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
