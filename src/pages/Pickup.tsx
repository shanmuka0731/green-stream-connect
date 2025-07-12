
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Pickup = () => {
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address || !phoneNumber || !pickupDate || !pickupTime) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsScheduling(true);
    
    // Simulate scheduling process
    setTimeout(() => {
      setIsScheduling(false);
      toast({
        title: "Success!",
        description: "Pickup scheduled successfully",
      });
      navigate("/reward");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ 
      backgroundImage: `url('/lovable-uploads/48ee0629-8763-44e6-9864-e0f9d62932bb.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: "overlay", 
      backgroundColor: "rgba(14, 18, 16, 0.7)" 
    }}>
      <Navbar />
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white">Schedule Pickup</h1>
            <p className="mt-2 text-white">
              Let us know when and where to collect your waste
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Pickup Details</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Pickup Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your full address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date">Pickup Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Pickup Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions for the pickup team"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isScheduling}
                >
                  {isScheduling ? "Scheduling..." : "Confirm Pickup"}
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

export default Pickup;
