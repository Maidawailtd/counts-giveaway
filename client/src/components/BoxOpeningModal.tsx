import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGiveaway } from "@/context/GiveawayContext";
import { useState } from "react";

interface PaymentInfo {
  email: string;
  phone: string;
  method: string;
}

export default function BoxOpeningModal() {
  const { selectedBox, isOpeningBox, winResult, openBox, resetReveal } = useGiveaway();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    email: "",
    phone: "",
    method: "creditCard"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await openBox(paymentInfo);
  };

  return (
    <Dialog open={!!selectedBox} onOpenChange={() => resetReveal()}>
      <DialogContent className="bg-counts-black text-counts-silver border-counts-red/30">
        <DialogHeader>
          <DialogTitle className="text-counts-gold">Payment Request</DialogTitle>
          <DialogDescription>
            Enter your details to purchase {selectedBox?.name} for ${selectedBox?.price}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              required
              value={paymentInfo.email}
              onChange={(e) => setPaymentInfo(prev => ({...prev, email: e.target.value}))}
              className="bg-counts-grey"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <Input
              type="tel"
              required
              value={paymentInfo.phone}
              onChange={(e) => setPaymentInfo(prev => ({...prev, phone: e.target.value}))}
              className="bg-counts-grey"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Payment Method</label>
            <Select
              value={paymentInfo.method}
              onValueChange={(value) => setPaymentInfo(prev => ({...prev, method: value}))}>
              <SelectTrigger className="bg-counts-grey">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="creditCard">Credit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="crypto">Cryptocurrency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button 
              type="submit"
              disabled={isOpeningBox}
              className="bg-counts-gold hover:bg-counts-gold/80 text-counts-black"
            >
              {isOpeningBox ? "Processing..." : "Submit Payment Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}