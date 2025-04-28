import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format wallet address for display
export function formatWalletAddress(address: string): string {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

// Format time remaining
export function formatTimeRemaining(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  
  if (diff <= 0) return "00:00:00";
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Create confetti effect styles
export function createConfettiStyles(count: number): React.CSSProperties[] {
  const colors = ['#5ABE42', '#FFD700', '#FF6B6B', '#3498db'];
  const styles: React.CSSProperties[] = [];
  
  for (let i = 0; i < count; i++) {
    styles.push({
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      left: `${Math.random() * 100}%`,
      top: '0',
      width: `${Math.random() * 10 + 5}px`,
      height: `${Math.random() * 10 + 5}px`,
      transform: `rotate(${Math.random() * 360}deg)`,
      opacity: 0,
      animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
      animationDelay: `${Math.random() * 0.5}s`,
      position: 'absolute',
    });
  }
  
  return styles;
}
