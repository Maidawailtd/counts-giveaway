import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Send, Github } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CommunitySection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Subscribed!",
      description: "You've been subscribed to exclusive drops",
    });
    
    setEmail("");
  };

  return (
    <section className="py-12 px-4 bg-pepeBg">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6 text-pepeGold">Join the Pepe Community</h2>
        <p className="max-w-2xl mx-auto mb-8 text-gray-300">Connect with fellow Pepe enthusiasts, share your wins, and stay updated on upcoming giveaways and events!</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            className="flex items-center bg-[#1DA1F2] hover:bg-opacity-80 px-5 py-6 h-12 rounded-lg font-medium transition-all"
            variant="ghost"
          >
            <Twitter className="mr-2 h-5 w-5" /> Twitter
          </Button>
          <Button 
            className="flex items-center bg-[#0088cc] hover:bg-opacity-80 px-5 py-6 h-12 rounded-lg font-medium transition-all"
            variant="ghost"
          >
            <Send className="mr-2 h-5 w-5" /> Telegram
          </Button>
          <Button 
            className="flex items-center bg-[#5865F2] hover:bg-opacity-80 px-5 py-6 h-12 rounded-lg font-medium transition-all"
            variant="ghost"
          >
            <Github className="mr-2 h-5 w-5" /> Discord
          </Button>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-pepeDark/50 rounded-xl p-6 border border-pepeGreen/20">
            <CardContent className="p-0">
              <h3 className="font-poppins font-bold text-xl mb-4 text-pepeGold">Subscribe for Exclusive Drops</h3>
              <p className="text-gray-300 mb-6">Get notified about new giveaways and receive bonus entries!</p>
              <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto" onSubmit={handleSubscribe}>
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-lg bg-pepeDark border border-gray-700 focus:border-pepeGreen outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-pepeGreen hover:bg-opacity-80 px-6 py-3 rounded-lg font-poppins font-semibold transition-all"
                >
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
