import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  walletAddress: text("wallet_address"),
  entriesRemaining: integer("entries_remaining").default(2),
  nextFreeEntry: timestamp("next_free_entry"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  walletAddress: true,
});

export const prizes = pgTable("prizes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // NFT, TOKEN, MERCH
  tier: text("tier").notNull(), // LEGENDARY, EPIC, RARE
  image: text("image").notNull(),
  value: text("value"),
});

export const insertPrizeSchema = createInsertSchema(prizes).pick({
  name: true,
  description: true,
  type: true,
  tier: true,
  image: true,
  value: true,
});

export const giftBoxes = pgTable("gift_boxes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // GOLD, SILVER, BRONZE
  description: text("description").notNull(),
  image: text("image").notNull(),
  isPremium: boolean("is_premium").default(false),
  price: text("price").notNull(),
});

export const insertGiftBoxSchema = createInsertSchema(giftBoxes).pick({
  name: true,
  type: true,
  description: true,
  image: true,
  isPremium: true,
});

export const winners = pgTable("winners", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  prizeId: integer("prize_id").notNull(),
  boxType: text("box_type").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  walletAddress: text("wallet_address"),
  username: text("username").notNull(),
});

export const insertWinnerSchema = createInsertSchema(winners).pick({
  userId: true,
  prizeId: true,
  boxType: true,
  walletAddress: true,
  username: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPrize = z.infer<typeof insertPrizeSchema>;
export type Prize = typeof prizes.$inferSelect;

export type InsertGiftBox = z.infer<typeof insertGiftBoxSchema>;
export type GiftBox = typeof giftBoxes.$inferSelect;

export type InsertWinner = z.infer<typeof insertWinnerSchema>;
export type Winner = typeof winners.$inferSelect;

// Box types
export enum BoxType {
  GOLD = "GOLD",
  SILVER = "SILVER",
  BRONZE = "BRONZE",
  CHROME = "CHROME",
  FLAMES = "FLAMES",
  CUSTOM = "CUSTOM",
}

// Prize tiers
export enum PrizeTier {
  LEGENDARY = "LEGENDARY",
  EPIC = "EPIC",
  RARE = "RARE",
}

// Prize types
export enum PrizeType {
  NFT = "NFT",
  CASH = "CASH",
  MERCH = "MERCH",
  CARPART = "CARPART",
  TOUR = "TOUR",
  ART = "ART",
  EXPERIENCE = "EXPERIENCE",
}
