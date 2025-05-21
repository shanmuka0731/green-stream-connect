
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

const Reward = () => {
  const [selectedReward, setSelectedReward] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedReward) {
      toast({
        title: "Error",
        description: "Please select a reward option",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Success!",
        description: "Pickup confirmed and reward selected",
      });
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ 
      backgroundBlendMode: "overlay", 
      backgroundColor: "rgba(14, 18, 16, 0.7)" 
    }}>
      <Navbar />
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="bg-green-100 rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center p-2 bg-green-600 rounded-full">
                <Check className="h-6 w-6 text-white" />
              </div>
              <h2 className="mt-3 text-lg font-medium text-green-900">Pickup Confirmed</h2>
              <p className="mt-1 text-sm text-green-500">
                Your waste pickup has been scheduled successfully
              </p>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Select Your Reward</h1>
            <p className="mt-2 text-gray-600">
              Choose how you'd like to be rewarded for your contribution
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Reward Options</CardTitle>
              <CardDescription>
                Based on your waste type and quantity, you qualify for one of these rewards
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <RadioGroup value={selectedReward} onValueChange={setSelectedReward} className="space-y-4">
                  <div className="flex items-center space-x-2 border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Cash Reward</div>
                        <div className="text-sm text-gray-500">Receive payment directly to your bank account</div>
                      </div>
                    </Label>
                    <div className="text-green-600 font-bold">₹5.00</div>
                  </div>
                  
                  <div className="flex items-center space-x-2 border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="ecoscore" id="ecoscore" />
                    <Label htmlFor="ecoscore" className="flex flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Eco-Score Points</div>
                        <div className="text-sm text-gray-500">Earn points to redeem for eco-friendly products</div>
                      </div>
                    </Label>
                    <div className="text-green-600 font-bold">500 pts</div>
                  </div>
                  
                  <div className="flex items-center space-x-2 border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="egift" id="egift" />
                    <Label htmlFor="egift" className="flex flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">E-Gift Card</div>
                        <div className="text-sm text-gray-500">Get a digital gift card from popular retailers</div>
                      </div>
                    </Label>
                    <div className="text-green-600 font-bold">₹5.50</div>
                  </div>
                </RadioGroup>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Confirm Reward"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reward;
