
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
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Reward = () => {
  const [selectedReward, setSelectedReward] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedReward) {
      toast({
        title: "Error",
        description: "Please select a reward option",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Error",
        description: "Please login to continue",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Get existing reward data and update it with the selected reward type
      const storedRewardData = localStorage.getItem('rewardData');
      if (storedRewardData) {
        const parsedData = JSON.parse(storedRewardData);
        const updatedRewardData = {
          ...parsedData,
          selectedRewardType: selectedReward
        };
        localStorage.setItem('rewardData', JSON.stringify(updatedRewardData));
      }

      toast({
        title: "Success!",
        description: `Pickup confirmed and ${selectedReward === 'ecoscore' ? 'eco-points' : selectedReward === 'egift' ? 'e-gift card' : 'cash reward'} selected`,
      });
      navigate("/account");
    } catch (error) {
      console.error('Error processing reward:', error);
      toast({
        title: "Error",
        description: "Failed to process reward",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ 
      backgroundImage: `url('/lovable-uploads/5512866f-fcf9-4c93-9c83-5c8f75a252d8.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      //backgroundBlendMode: "overlay", 
      backgroundColor: "rgba(14, 18, 16, 0.7)" 
    }}>
      <Navbar />
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-4xl font-bold text-white">Select Your Reward</h1>
            <p className="mt-2 text-white">
              Choose how you'd like to be rewarded for your contribution
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Reward Options</CardTitle>
              <CardDescription>
                Choose your preferred reward type for your waste contribution
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
                  </div>
                  
                  <div className="flex items-center space-x-2 border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="ecoscore" id="ecoscore" />
                    <Label htmlFor="ecoscore" className="flex flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Eco-Score Points</div>
                        <div className="text-sm text-gray-500">Earn points to redeem for eco-friendly products</div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="egift" id="egift" />
                    <Label htmlFor="egift" className="flex flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">E-Gift Card</div>
                        <div className="text-sm text-gray-500">Get a digital gift card from popular retailers</div>
                      </div>
                    </Label>
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
