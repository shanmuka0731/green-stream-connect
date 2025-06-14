
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
import { IndianRupee, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Leaderboard from "@/components/Leaderboard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface UserProfile {
  id: string;
  full_name: string | null;
  username: string | null;
  phone_number: string | null;
  avatar_url: string | null;
}

interface LeaderboardData {
  total_cash_earned: number;
  total_eco_points: number;
  total_orders: number;
}

const Account = () => {
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
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

  // Load user profile and leaderboard data
  useEffect(() => {
    if (user) {
      loadProfile();
      loadLeaderboardData();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, username, phone_number, avatar_url')
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

  const loadLeaderboardData = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('eco_score_leaderboard')
        .select('total_cash_earned, total_eco_points, total_orders')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading leaderboard data:', error);
        return;
      }

      setLeaderboardData(data);
    } catch (error) {
      console.error('Error loading leaderboard data:', error);
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

  const userInitials = profile?.full_name 
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase() 
    : user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main style={{
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(14, 18, 16, 0.7)'
      }} className="flex-grow py-10 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile?.avatar_url || ""} alt="User" />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-transparent bg-clip-text drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  {profile?.full_name || 'User'}
                </h1>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-white">
                    <Trophy className="h-4 w-4 mr-2" />
                    Leaderboard
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Eco-Score Leaderboard</DialogTitle>
                  </DialogHeader>
                  <Leaderboard />
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="bg-white" onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel Edit' : 'Edit Profile'}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
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
            
            <TabsContent value="activity" className="mt-6">
              <Card className="transition-colors hover:bg-white">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent waste collection activities.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              {["Plastic", "Paper", "Electronics", "Glass", "Mixed"][i % 5]} Waste Collection
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(2025, 4, 8 - i).toLocaleDateString()}
                            </p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          {i === 0 ? "3.2kg of recyclable waste" : 
                           i === 1 ? "2.5kg of paper and cardboard" : 
                           i === 2 ? "1 old laptop and 2 mobile phones" : 
                           i === 3 ? "5 glass bottles and containers" : 
                           "1.8kg of mixed recyclables"}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Activity</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="rewards" className="mt-6">
              <Card className="transition-colors hover:bg-white">
                <CardHeader>
                  <CardTitle>Your Rewards</CardTitle>
                  <CardDescription>Track your earnings and points.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="transition-colors hover:bg-white">
                      <CardHeader className="pb-2">
                        <CardDescription>Total Cash Earned</CardDescription>
                        <CardTitle className="text-2xl text-green-600 flex items-center">
                          <IndianRupee size={20} className="mr-1" />
                          {leaderboardData?.total_cash_earned?.toFixed(2) || '0.00'}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card className="transition-colors hover:bg-white">
                      <CardHeader className="pb-2">
                        <CardDescription>Eco-Score Points</CardDescription>
                        <CardTitle className="text-2xl text-green-600">
                          {leaderboardData?.total_eco_points || 0} pts
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card className="transition-colors hover:bg-white">
                      <CardHeader className="pb-2">
                        <CardDescription>Total Orders</CardDescription>
                        <CardTitle className="text-2xl text-green-600">
                          {leaderboardData?.total_orders || 0}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-4">Recent Rewards</h3>
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex justify-between items-center p-4 border rounded-lg transition-colors hover:bg-white">
                        <div>
                          <p className="font-medium">
                            {i === 0 ? "Cash Reward" : i === 1 ? "Eco-Score Points" : "E-Gift Card (Amazon)"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(2025, 4, 5 - i * 3).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="font-bold text-green-600 flex items-center">
                          {i === 0 ? (
                            <>
                              <IndianRupee size={16} className="mr-1" />
                              375.00
                            </>
                          ) : i === 1 ? (
                            "500 pts"
                          ) : (
                            <>
                              <IndianRupee size={16} className="mr-1" />
                              412.50
                            </>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Rewards</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
