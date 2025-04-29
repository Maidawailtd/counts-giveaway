import { GiftBox as GiftBoxType } from "@shared/schema";
import { cn } from "@/lib/utils";

interface GiftBoxProps {
  giftBox: GiftBoxType;
  onClick: () => void;
}

export default function GiftBox({ giftBox, onClick }: GiftBoxProps) {
  // Function to determine background color based on box type
  const getBoxGradient = () => {
    switch (giftBox.type) {
      case "GOLD":
        return "bg-gradient-to-br from-pepeGold/80 to-pepeGold";
      case "SILVER":
        return "bg-gradient-to-br from-zinc-400 to-zinc-500";
      case "BRONZE":
        return "bg-gradient-to-br from-amber-700 to-amber-800";
      default:
        return "bg-gradient-to-br from-gray-500 to-gray-600";
    }
  };

  // Function to determine hover shadow color based on box type
  const getHoverShadow = () => {
    switch (giftBox.type) {
      case "GOLD":
        return "hover:shadow-[0_0_15px_rgba(255,215,0,0.6)]";
      case "SILVER":
        return "hover:shadow-[0_0_15px_rgba(200,200,200,0.6)]";
      case "BRONZE":
        return "hover:shadow-[0_0_15px_rgba(180,130,70,0.6)]";
      default:
        return "hover:shadow-[0_0_15px_rgba(100,100,100,0.6)]";
    }
  };

  return (
    <div className="relative gift-box" onClick={onClick}>
      <div
        className={cn(
          getBoxGradient(),
          "rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer shine transform transition-all",
          getHoverShadow()
        )}
      >
        <img
          src={giftBox.image}
          alt={`${giftBox.name} Gift Box`}
          className="w-20 h-20 object-contain animate-float"
          style={{ animationDelay: giftBox.type === "SILVER" ? "0.5s" : giftBox.type === "BRONZE" ? "1s" : "0s" }}
        />
        <p className="mt-3 font-poppins font-bold">{giftBox.name}</p>
        <p className="text-xs mt-1 text-pepeDark">{giftBox.description}</p>
      </div>

      <div className="absolute -top-2 -right-2 bg-pepeGold text-pepeDark text-xs font-bold py-1 px-2 rounded-full">
        ${giftBox.price}
      </div>
    </div>
  );
}
