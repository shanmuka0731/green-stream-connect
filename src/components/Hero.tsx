
import { ArrowRight, Recycle, DollarSign, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/upload');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Turn Your
                <span className="text-green-600"> Trash </span>
                Into
                <span className="text-green-600"> Cash</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join the eco-revolution! Upload photos of your recyclable waste, 
                schedule pickups, and earn money while saving the planet.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                onClick={handleGetStarted}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg"
                onClick={() => navigate('/about')}
              >
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Recycle className="h-8 w-8 text-green-600" />
                </div>
                <p className="font-semibold text-gray-900">Easy Upload</p>
                <p className="text-sm text-gray-600">Simple photo upload process</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
                <p className="font-semibold text-gray-900">Earn Money</p>
                <p className="text-sm text-gray-600">Get paid for recycling</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <p className="font-semibold text-gray-900">Save Planet</p>
                <p className="text-sm text-gray-600">Contribute to sustainability</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-green-200 to-blue-200 rounded-2xl overflow-hidden">
              <img 
                src="/lovable-uploads/525c58f8-4f0d-4eb5-820b-06671ac23d8c.png" 
                alt="Recycling and earning money" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Live Tracking Available</span>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 border">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">₹50+</p>
                <p className="text-xs text-gray-600">Avg. Daily Earnings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
