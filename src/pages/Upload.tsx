
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Weight, AlertTriangle, IndianRupee } from "lucide-react";
import { Input } from "@/components/ui/input";

// Waste pricing per kg
const WASTE_PRICES = {
  plastic: 15,
  paper: 8,
  electronics: 25,
  glass: 5,
  metal: 30,
  organic: 3,
  other: 10
} as const;

const Upload = () => {
  const [wasteType, setWasteType] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [wasteWeight, setWasteWeight] = useState<number | null>(null);
  const [weightError, setWeightError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setWasteWeight(value);
    
    if (value < 10) {
      setWeightError(true);
      toast({
        title: "Weight below threshold",
        description: "Waste weight must be more than 10 kg",
        variant: "destructive",
      });
    } else {
      setWeightError(false);
    }
  };

  const calculateEarnings = () => {
    if (!wasteWeight || !wasteType || wasteWeight < 10) return 0;
    const pricePerKg = WASTE_PRICES[wasteType as keyof typeof WASTE_PRICES] || 0;
    return wasteWeight * pricePerKg;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!wasteType) {
      toast({
        title: "Error",
        description: "Please select a waste type",
        variant: "destructive",
      });
      return;
    }
    
    if (!wasteWeight) {
      toast({
        title: "Error",
        description: "Please enter the waste weight",
        variant: "destructive",
      });
      return;
    }
    
    if (wasteWeight < 10) {
      toast({
        title: "Order Rejected",
        description: "Waste weight must be more than 10 kg",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      const earnings = calculateEarnings();
      toast({
        title: "Success!",
        description: `Waste information uploaded successfully. Estimated earnings: ₹${earnings.toFixed(2)}`,
      });
      navigate("/pickup");
    }, 1500);
  };

  const earnings = calculateEarnings();

  return (
    <div className="min-h-screen flex flex-col" style={{ 
      backgroundBlendMode: "overlay", 
      backgroundColor: "rgba(14, 18, 16, 0.7)" 
    }}>
      <Navbar />
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-transparent bg-clip-text drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Upload Waste Details</h1>
            <p className="mt-2 text-gray-600">
              Tell us about the waste you want to recycle
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Waste Information</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="waste-type">Select Waste Type</Label>
                  <Select value={wasteType} onValueChange={setWasteType}>
                    <SelectTrigger id="waste-type" className="w-full">
                      <SelectValue placeholder="Select waste type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plastic">Plastic (₹{WASTE_PRICES.plastic}/kg)</SelectItem>
                      <SelectItem value="paper">Paper & Cardboard (₹{WASTE_PRICES.paper}/kg)</SelectItem>
                      <SelectItem value="electronics">Electronics (₹{WASTE_PRICES.electronics}/kg)</SelectItem>
                      <SelectItem value="glass">Glass (₹{WASTE_PRICES.glass}/kg)</SelectItem>
                      <SelectItem value="metal">Metal (₹{WASTE_PRICES.metal}/kg)</SelectItem>
                      <SelectItem value="organic">Organic Waste (₹{WASTE_PRICES.organic}/kg)</SelectItem>
                      <SelectItem value="other">Other (₹{WASTE_PRICES.other}/kg)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your waste (quantity, condition, etc.)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div className={`border-2 border-dashed rounded-lg p-6 text-center ${image ? 'border-green-300' : 'border-gray-300'}`}>
                  {!image ? (
                    <div className="flex flex-col items-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <div className="mt-4 flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                          <span>Upload a photo</span>
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only" 
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">of your waste</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-lg">
                        <img src={image} alt="Waste preview" className="w-full h-auto" />
                      </div>
                      
                      <div className="mt-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="text-sm"
                          onClick={() => {
                            setImage(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                        >
                          Remove photo & upload another
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="waste-weight" className="flex items-center gap-2">
                    <Weight className="h-4 w-4" />
                    Enter Waste Weight (kg)
                  </Label>
                  <Input
                    id="waste-weight"
                    type="number"
                    placeholder="Enter weight in kg"
                    min="0"
                    step="0.1"
                    className={weightError ? 'border-red-500' : ''}
                    onChange={handleWeightChange}
                  />
                  {weightError && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      Minimum weight requirement: 10 kg
                    </p>
                  )}
                </div>

                {wasteWeight && wasteWeight >= 10 && wasteType && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">Estimated Earnings:</span>
                      <span className="text-green-600 font-bold text-xl flex items-center">
                        <IndianRupee className="h-5 w-5 mr-1" />
                        {earnings.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      {wasteWeight}kg × ₹{WASTE_PRICES[wasteType as keyof typeof WASTE_PRICES]}/kg
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isUploading || !wasteWeight || wasteWeight < 10}
                >
                  {isUploading ? "Uploading..." : (wasteWeight && wasteWeight >= 10) ? "Upload Waste Details" : "Upload Once Weight Requirement Met"}
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

export default Upload;
