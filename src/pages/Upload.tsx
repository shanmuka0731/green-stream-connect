
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
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface WasteSubtypeData {
  min: number;
  max: number;
  unit: string;
}

interface WasteTypeData {
  [key: string]: WasteSubtypeData;
}

interface WasteSubtypes {
  [key: string]: WasteTypeData;
}

// Updated waste pricing structure
const WASTE_SUBTYPES: WasteSubtypes = {
  metal: {
    copper: { min: 400, max: 570, unit: 'kg' },
    brass: { min: 300, max: 400, unit: 'kg' },
    aluminum: { min: 100, max: 140, unit: 'kg' },
    iron: { min: 22, max: 38, unit: 'kg' },
    tin: { min: 14, max: 16, unit: 'kg' },
    stainless: { min: 40, max: 45, unit: 'kg' }
  },
  paper: {
    newspaper: { min: 10, max: 10, unit: 'kg' },
    books: { min: 7, max: 8, unit: 'kg' },
    cardboard: { min: 4, max: 5, unit: 'kg' }
  },
  plastic: {
    hard: { min: 2, max: 2, unit: 'kg' },
    soft: { min: 6, max: 7, unit: 'kg' }
  },
  electronics: {
    general: { min: 20, max: 500, unit: 'kg' },
    laptops: { min: 150, max: 800, unit: 'piece' },
    phones: { min: 15, max: 40, unit: 'piece' },
    crt_tv: { min: 100, max: 200, unit: 'piece' },
    lcd_tv: { min: 100, max: 500, unit: 'piece' }
  },
  other: {
    tyres: { min: 3, max: 4, unit: 'kg' },
    batteries: { min: 50, max: 80, unit: 'piece' },
    mix: { min: 5, max: 6, unit: 'kg' }
  }
};

const Upload = () => {
  const [wasteType, setWasteType] = useState("");
  const [wasteSubtype, setWasteSubtype] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [wasteWeight, setWasteWeight] = useState<number | null>(null);
  const [weightError, setWeightError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

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
    if (!wasteWeight || !wasteType || !wasteSubtype || wasteWeight < 10) return { min: 0, max: 0 };
    
    const subtypeData = WASTE_SUBTYPES[wasteType]?.[wasteSubtype];
    if (!subtypeData) return { min: 0, max: 0 };
    
    const multiplier = subtypeData.unit === 'piece' ? 1 : wasteWeight;
    return {
      min: subtypeData.min * multiplier,
      max: subtypeData.max * multiplier
    };
  };

  const calculateEcoPoints = () => {
    if (!wasteWeight || wasteWeight < 10) return 0;
    return Math.floor(wasteWeight / 10) * 200; // 200 points per 10kg
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (!wasteType || !wasteSubtype) {
      toast({
        title: "Error",
        description: "Please select waste type and subtype",
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
    
    try {
      const earnings = calculateEarnings();
      const ecoPoints = calculateEcoPoints();
      const avgEarning = (earnings.min + earnings.max) / 2;
      
      const { error } = await supabase
        .from('pickup_orders')
        .insert({
          user_id: user.id,
          waste_type: wasteType,
          waste_subtype: wasteSubtype,
          weight: wasteWeight,
          description,
          image_url: image,
          reward_amount: avgEarning,
          status: 'pending'
        });

      if (error) throw error;

      // Store the reward calculations in localStorage for the reward page
      localStorage.setItem('rewardData', JSON.stringify({
        cashReward: avgEarning,
        ecoPoints: ecoPoints,
        weight: wasteWeight
      }));

      toast({
        title: "Success!",
        description: `Waste information uploaded successfully. Estimated earnings: ₹${earnings.min} - ₹${earnings.max}`,
      });
      navigate("/pickup");
    } catch (error) {
      console.error('Error creating pickup order:', error);
      toast({
        title: "Error",
        description: "Failed to create pickup order",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const earnings = calculateEarnings();
  const ecoPoints = calculateEcoPoints();
  const subtypeOptions = wasteType ? WASTE_SUBTYPES[wasteType] : {};

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
                  <Select value={wasteType} onValueChange={(value) => {
                    setWasteType(value);
                    setWasteSubtype("");
                  }}>
                    <SelectTrigger id="waste-type" className="w-full">
                      <SelectValue placeholder="Select waste type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metal">Metal</SelectItem>
                      <SelectItem value="paper">Paper</SelectItem>
                      <SelectItem value="plastic">Plastic</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {wasteType && (
                  <div className="space-y-2">
                    <Label htmlFor="waste-subtype">Select Specific Type</Label>
                    <Select value={wasteSubtype} onValueChange={setWasteSubtype}>
                      <SelectTrigger id="waste-subtype" className="w-full">
                        <SelectValue placeholder="Select specific type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(subtypeOptions).map(([key, data]) => (
                          <SelectItem key={key} value={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {wasteType && wasteSubtype && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-blue-800 font-medium mb-2">Pricing Information:</div>
                    <p className="text-blue-700 text-sm">
                      ₹{subtypeOptions[wasteSubtype]?.min}{subtypeOptions[wasteSubtype]?.min !== subtypeOptions[wasteSubtype]?.max ? ` - ₹${subtypeOptions[wasteSubtype]?.max}` : ''} per {subtypeOptions[wasteSubtype]?.unit}
                    </p>
                  </div>
                )}

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

                {wasteWeight && wasteWeight >= 10 && wasteType && wasteSubtype && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">Estimated Cash Earnings:</span>
                      <span className="text-green-600 font-bold text-xl flex items-center">
                        <IndianRupee className="h-5 w-5 mr-1" />
                        {earnings.min === earnings.max ? earnings.min.toFixed(2) : `${earnings.min.toFixed(2)} - ${earnings.max.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">Estimated Eco Points:</span>
                      <span className="text-green-600 font-bold text-xl">
                        {ecoPoints} pts
                      </span>
                    </div>
                    <p className="text-green-700 text-sm">
                      {wasteWeight}kg × ₹{earnings.min === earnings.max ? earnings.min : `${earnings.min} - ${earnings.max}`}/{subtypeOptions[wasteSubtype]?.unit || 'kg'} | {Math.floor(wasteWeight / 10)} × 200 pts
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isUploading || !wasteWeight || wasteWeight < 10 || !wasteType || !wasteSubtype}
                >
                  {isUploading ? "Uploading..." : (wasteWeight && wasteWeight >= 10) ? "Upload Waste Details" : "Upload Once Requirements Met"}
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
