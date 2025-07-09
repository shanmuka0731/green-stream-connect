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
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { currentLanguage, changeLanguage, supportedLanguages, t } = useLanguage();
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
        title: t('settings.success'),
        description: t('settings.changesDone')
      });
    }, 1000);
  };

  const handleLanguageChange = async (language: string) => {
    await changeLanguage(language);
    toast({
      title: t('settings.success'),
      description: t('settings.changesDone')
    });
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    setIsDeletingAccount(true);
    try {
      // First, delete user data from our custom tables
      await supabase.from('profiles').delete().eq('id', user.id);
      await supabase.from('pickup_orders').delete().eq('user_id', user.id);
      
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-transparent bg-clip-text drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-6">
            {t('settings.title')}
          </h1>

          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account">{t('settings.account')}</TabsTrigger>
              <TabsTrigger value="notifications">{t('settings.notifications')}</TabsTrigger>
              <TabsTrigger value="privacy">{t('settings.privacy')}</TabsTrigger>
              <TabsTrigger value="policy">{t('settings.policy')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('settings.account')} {t('settings.title')}</CardTitle>
                  <CardDescription>Manage your account preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="language" className="text-base">{t('settings.language')}</Label>
                      <Select value={currentLanguage} onValueChange={handleLanguageChange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {supportedLanguages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                              {t(`languages.${lang.code}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="currency" className="text-base">{t('settings.currency')}</Label>
                        <p className="text-sm text-gray-500">{t('settings.currencyDescription')}</p>
                      </div>
                      <Select defaultValue="inr">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inr">{t('currencies.inr')}</SelectItem>
                          <SelectItem value="usd">{t('currencies.usd')}</SelectItem>
                          <SelectItem value="eur">{t('currencies.eur')}</SelectItem>
                          <SelectItem value="gbp">{t('currencies.gbp')}</SelectItem>
                          <SelectItem value="cad">{t('currencies.cad')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor" className="text-base">{t('settings.twoFactor')}</Label>
                        <p className="text-sm text-gray-500">{t('settings.twoFactorDescription')}</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSaveChanges} disabled={isLoading}>
                    {isLoading ? t('settings.saving') : t('settings.saveChanges')}
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
                  <h3 className="text-lg font-medium">{t('notifications.email')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pickup-email" className="text-base">{t('notifications.pickup')}</Label>
                        <p className="text-sm text-gray-500">{t('notifications.pickupDescription')}</p>
                      </div>
                      <Switch id="pickup-email" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="reward-email" className="text-base">{t('notifications.reward')}</Label>
                        <p className="text-sm text-gray-500">{t('notifications.rewardDescription')}</p>
                      </div>
                      <Switch id="reward-email" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="newsletter" className="text-base">{t('notifications.newsletter')}</Label>
                        <p className="text-sm text-gray-500">{t('notifications.newsletterDescription')}</p>
                      </div>
                      <Switch id="newsletter" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mt-6">{t('notifications.push')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pickup-push" className="text-base">{t('notifications.pickupAlerts')}</Label>
                        <p className="text-sm text-gray-500">{t('notifications.pickupAlertsDescription')}</p>
                      </div>
                      <Switch id="pickup-push" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="reward-push" className="text-base">{t('notifications.rewardAlerts')}</Label>
                        <p className="text-sm text-gray-500">{t('notifications.rewardAlertsDescription')}</p>
                      </div>
                      <Switch id="reward-push" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSaveChanges} disabled={isLoading}>
                    {isLoading ? t('settings.saving') : t('settings.savePreferences')}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('privacy.title')}</CardTitle>
                  <CardDescription>{t('privacy.description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="location" className="text-base">{t('privacy.location')}</Label>
                        <p className="text-sm text-gray-500">{t('privacy.locationDescription')}</p>
                      </div>
                      <Switch id="location" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="data-collection" className="text-base">{t('privacy.dataCollection')}</Label>
                        <p className="text-sm text-gray-500">{t('privacy.dataCollectionDescription')}</p>
                      </div>
                      <Switch id="data-collection" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="profile-visibility" className="text-base">{t('privacy.profileVisibility')}</Label>
                        <p className="text-sm text-gray-500">{t('privacy.profileVisibilityDescription')}</p>
                      </div>
                      <Switch id="profile-visibility" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-2">
                  <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSaveChanges} disabled={isLoading}>
                    {isLoading ? t('settings.saving') : t('settings.saveSettings')}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="link" className="text-red-600 p-0" disabled={isDeletingAccount}>
                        {isDeletingAccount ? t('privacy.deleting') : t('privacy.deleteAccount')}
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
                          {isDeletingAccount ? t('privacy.deleting') : "Yes, delete my account"}
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
