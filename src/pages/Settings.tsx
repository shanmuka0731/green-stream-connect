import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const handleSaveChanges = () => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      // Show toast notification
      toast({
        title: "Success",
        description: "Changes done successfully"
      });
    }, 1000);
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    setIsDeletingAccount(true);
    try {
      // First, delete user data from our custom tables
      await supabase.from('profiles').delete().eq('id', user.id);
      await supabase.from('pickup_orders').delete().eq('user_id', user.id);
      await supabase.from('eco_score_leaderboard').delete().eq('user_id', user.id);
      
      // Then delete the auth user (this will cascade to related data)
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      
      if (error) {
        // If admin delete fails, try regular account deletion
        const { error: deleteError } = await supabase.auth.signOut();
        if (deleteError) throw deleteError;
      }

      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted."
      });

      // Redirect to home page after successful deletion
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main style={{
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(14, 18, 16, 0.7)'
      }} className="flex-grow py-10 px-4 lg:px-8 bg-gray-900 rounded-none mx-0 sm:px-[24px]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-transparent bg-clip-text drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-6">Settings</h1>

          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="policy">Policies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="language" className="text-base">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="currency" className="text-base">Currency</Label>
                        <p className="text-sm text-gray-500">Currency used for rewards</p>
                      </div>
                      <Select defaultValue="inr">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inr">INR (₹)</SelectItem>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                          <SelectItem value="cad">CAD ($)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor" className="text-base">Two-factor authentication</Label>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSaveChanges} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive updates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pickup-email" className="text-base">Pickup Reminders</Label>
                        <p className="text-sm text-gray-500">Get notified about upcoming pickups</p>
                      </div>
                      <Switch id="pickup-email" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="reward-email" className="text-base">Reward Confirmations</Label>
                        <p className="text-sm text-gray-500">Get notified when you receive rewards</p>
                      </div>
                      <Switch id="reward-email" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="newsletter" className="text-base">Newsletter</Label>
                        <p className="text-sm text-gray-500">Receive updates, tips, and sustainability news</p>
                      </div>
                      <Switch id="newsletter" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mt-6">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pickup-push" className="text-base">Pickup Alerts</Label>
                        <p className="text-sm text-gray-500">Get notifications about pickup status</p>
                      </div>
                      <Switch id="pickup-push" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="reward-push" className="text-base">Reward Alerts</Label>
                        <p className="text-sm text-gray-500">Get notifications about new rewards</p>
                      </div>
                      <Switch id="reward-push" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSaveChanges} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Preferences"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your data and privacy options.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="location" className="text-base">Location Services</Label>
                        <p className="text-sm text-gray-500">Allow access to your location for better pickup service</p>
                      </div>
                      <Switch id="location" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="data-collection" className="text-base">Data Collection</Label>
                        <p className="text-sm text-gray-500">Help us improve by sharing usage data</p>
                      </div>
                      <Switch id="data-collection" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="profile-visibility" className="text-base">Profile Visibility</Label>
                        <p className="text-sm text-gray-500">Make your profile visible to other users</p>
                      </div>
                      <Switch id="profile-visibility" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-2">
                  <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSaveChanges} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Settings"}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="link" className="text-red-600 p-0" disabled={isDeletingAccount}>
                        {isDeletingAccount ? "Deleting..." : "Delete My Account"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove all of your data from our servers, including:
                          <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>Your profile information</li>
                            <li>All pickup orders and history</li>
                            <li>Your eco-score and leaderboard data</li>
                            <li>All rewards and cash earnings</li>
                          </ul>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleDeleteAccount}
                          className="bg-red-600 hover:bg-red-700"
                          disabled={isDeletingAccount}
                        >
                          {isDeletingAccount ? "Deleting..." : "Yes, delete my account"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="policy" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Policies and Terms</CardTitle>
                  <CardDescription>Important information about our service.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Terms of Service</h3>
                      <p className="text-sm text-gray-600 mt-2">
                        By using the Trash2Cash platform, you agree to abide by our terms and conditions, 
                        which govern how you interact with our service and the responsibilities of all parties involved.
                      </p>
                      <Button variant="link" className="px-0 text-green-600">Read Full Terms of Service</Button>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Privacy Policy</h3>
                      <p className="text-sm text-gray-600 mt-2">
                        Our privacy policy outlines how we collect, use, and protect your personal information
                        when you use our platform. We are committed to safeguarding your data and transparency.
                      </p>
                      <Button variant="link" className="px-0 text-green-600">Read Privacy Policy</Button>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Cookie Policy</h3>
                      <p className="text-sm text-gray-600 mt-2">
                        Our cookie policy explains how we use cookies and similar technologies to enhance your 
                        experience on our website and the options you have regarding their usage.
                      </p>
                      <Button variant="link" className="px-0 text-green-600">Read Cookie Policy</Button>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Environmental Commitment</h3>
                      <p className="text-sm text-gray-600 mt-2">
                        Learn about our commitment to environmental sustainability and how our platform 
                        contributes to reducing waste and promoting a circular economy.
                      </p>
                      <Button variant="link" className="px-0 text-green-600">Read Environmental Policy</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">
                    Last updated: April 25, 2025. If you have questions about our policies, 
                    please contact our support team.
                  </p>
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

export default Settings;
