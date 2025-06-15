
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IndianRupee, Award, Gift, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  id: string;
  full_name: string | null;
  username: string | null;
  phone_number: string | null;
}

interface PickupOrder {
  id: string;
  waste_type: string;
  waste_subtype: string;
  weight: number;
  status: string;
  created_at: string;
  reward_amount: number;
}

interface RewardData {
  cashReward: number;
  ecoPoints: number;
  weight: number;
  selectedRewardType: string;
}

const Account = () => {
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [pickupOrders, setPickupOrders] = useState<PickupOrder[]>([]);
  const [rewardData, setRewardData] = useState<RewardData | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    phone_number: ''
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Load user profile and pickup orders
  useEffect(() => {
    if (user) {
      loadProfile();
      loadPickupOrders();
      loadRewardData();
    }
  }, [user]);

  const loadRewardData = () => {
    const storedRewardData = localStorage.getItem('rewardData');
    if (storedRewardData) {
      try {
        const parsedData = JSON.parse(storedRewardData);
        setRewardData(parsedData);
      } catch (error) {
        console.error('Error parsing reward data:', error);
      }
    }
  };

  const clearRewardData = () => {
    localStorage.removeItem('rewardData');
    setRewardData(null);
  };

  const loadProfile = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, username, phone_number')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || '',
          username: data.username || '',
          phone_number: data.phone_number || ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadPickupOrders = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('pickup_orders')
        .select('id, waste_type, waste_subtype, weight, status, created_at, reward_amount')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error loading pickup orders:', error);
        return;
      }

      setPickupOrders(data || []);
    } catch (error) {
      console.error('Error loading pickup orders:', error);
    }
  };

  const handleSaveChanges = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...formData
        });

      if (error) throw error;

      await loadProfile();
      setEditMode(false);
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate total rewards from completed orders and latest reward data
  const calculateTotalCash = () => {
    let total = pickupOrders
      .filter(order => order.status === 'completed' && order.reward_amount)
      .reduce((sum, order) => sum + order.reward_amount, 0);
    
    if (rewardData && rewardData.selectedRewardType === 'cash') {
      total += rewardData.cashReward;
    }
    return total;
  };

  const calculateTotalEcoPoints = () => {
    // Since we don't have eco points in pickup_orders, only count from latest reward
    if (rewardData && rewardData.selectedRewardType === 'ecoscore') {
      return rewardData.ecoPoints;
    }
    return 0;
  };

  const getTotalOrders = () => {
    return pickupOrders.filter(order => order.status === 'completed').length;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Replace userInitials with emoji avatars
  const getRandomEmoji = () => {
    const emojis = ['👤', '🙂', '😊', '🌟', '🎯', '🚀', '💚', '🌱', '♻️', '🌍'];
    const userId = user.id || '';
    const index = userId ? userId.charCodeAt(0) % emojis.length : 0;
    return emojis[index];
  };

  const userEmoji = getRandomEmoji();

  const getRewardIcon = (rewardType: string) => {
    switch (rewardType) {
      case 'cash':
        return <IndianRupee className="h-5 w-5" />;
      case 'ecoscore':
        return <Star className="h-5 w-5" />;
      case 'egift':
        return <Gift className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  const getRewardTitle = (rewardType: string) => {
    switch (rewardType) {
      case 'cash':
        return 'Cash Reward';
      case 'ecoscore':
        return 'Eco-Score Points';
      case 'egift':
        return 'E-Gift Card';
      default:
        return 'Latest Upload Reward';
    }
  };

  const getRewardValue = (rewardType: string, rewardData: RewardData) => {
    switch (rewardType) {
      case 'cash':
        return (
          <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
            <IndianRupee size={20} className="mr-1" />
            {rewardData.cashReward.toFixed(2)}
          </div>
        );
      case 'ecoscore':
        return (
          <div className="text-2xl font-bold text-green-600">
            {rewardData.ecoPoints} pts
          </div>
        );
      case 'egift':
        return (
          <div className="text-2xl font-bold text-green-600">
            Gift Card
          </div>
        );
      default:
        return (
          <div className="text-2xl font-bold text-green-600">
            Reward
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200">
      <Navbar />
      <main style={{
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(14, 18, 16, 0.7)'
      }} className="flex-grow py-10 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-3xl bg-green-100">
                  {userEmoji}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-transparent bg-clip-text drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  {profile?.full_name || 'User'}
                </h1>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button variant="outline" className="bg-white" onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel Edit' : 'Edit Profile'}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <Card className="transition-colors hover:bg-white">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    {editMode ? 'Update your personal details here.' : 'Your personal information.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full name</Label>
                      <Input 
                        id="full-name" 
                        value={formData.full_name} 
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} 
                        disabled={!editMode} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        value={formData.username} 
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
                        disabled={!editMode} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user.email || ''} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input 
                      id="phone" 
                      value={formData.phone_number} 
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} 
                      disabled={!editMode} 
                    />
                  </div>
                </CardContent>
                {editMode && (
                  <CardFooter>
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white" 
                      onClick={handleSaveChanges} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="rewards" className="mt-6">
              <div className="space-y-6">
                {/* Latest Upload Reward - Only show the selected reward type */}
                {rewardData && (
                  <Card className="transition-colors hover:bg-white border-2 border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-700">
                        {getRewardIcon(rewardData.selectedRewardType)}
                        {getRewardTitle(rewardData.selectedRewardType)}
                      </CardTitle>
                      <CardDescription>
                        Your selected reward from the most recent waste upload
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-white rounded-lg border">
                          {getRewardValue(rewardData.selectedRewardType, rewardData)}
                          <div className="text-sm text-gray-600 mt-1">
                            {rewardData.selectedRewardType === 'cash' ? 'Cash Reward' : 
                             rewardData.selectedRewardType === 'ecoscore' ? 'Eco Points' : 
                             'Gift Card Value'}
                          </div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg border">
                          <div className="text-2xl font-bold text-green-600">
                            {rewardData.weight} kg
                          </div>
                          <div className="text-sm text-gray-600 mt-1">Waste Weight</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" onClick={clearRewardData} className="w-full">
                        Clear Latest Reward Data
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {/* Overall Rewards */}
                <Card className="transition-colors hover:bg-white">
                  <CardHeader>
                    <CardTitle>Your Total Rewards</CardTitle>
                    <CardDescription>Track your overall earnings and points (including latest reward).</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <Card className="transition-colors hover:bg-white">
                        <CardHeader className="pb-2">
                          <CardDescription>Total Cash Earned</CardDescription>
                          <CardTitle className="text-2xl text-green-600 flex items-center">
                            <IndianRupee size={20} className="mr-1" />
                            {calculateTotalCash().toFixed(2)}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                      <Card className="transition-colors hover:bg-white">
                        <CardHeader className="pb-2">
                          <CardDescription>Eco-Score Points</CardDescription>
                          <CardTitle className="text-2xl text-green-600">
                            {calculateTotalEcoPoints()} pts
                          </CardTitle>
                        </CardHeader>
                      </Card>
                      <Card className="transition-colors hover:bg-white">
                        <CardHeader className="pb-2">
                          <CardDescription>Total Orders</CardDescription>
                          <CardTitle className="text-2xl text-green-600">
                            {getTotalOrders()}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </div>
                    
                    <h3 className="text-lg font-medium mb-4">Recent Rewards</h3>
                    <div className="space-y-4">
                      {pickupOrders.filter(order => order.status === 'completed').slice(0, 3).map((order, i) => (
                        <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg transition-colors hover:bg-white">
                          <div>
                            <p className="font-medium">
                              Cash Reward - {order.waste_type} ({order.waste_subtype})
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="font-bold text-green-600 flex items-center">
                            <IndianRupee size={16} className="mr-1" />
                            {order.reward_amount?.toFixed(2) || '0.00'}
                          </p>
                        </div>
                      ))}
                      {pickupOrders.filter(order => order.status === 'completed').length === 0 && (
                        <p className="text-gray-500 text-center py-4">No completed orders yet.</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Rewards</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
