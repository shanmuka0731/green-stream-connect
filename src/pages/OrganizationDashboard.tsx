
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarDays, MapPin, User, Trash2, Building2, Mail, Phone, MapPinIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface PickupOrder {
  id: string;
  user_id: string;
  waste_type: string;
  waste_subtype: string | null;
  weight: number;
  description: string | null;
  image_url: string | null;
  pickup_date: string | null;
  pickup_address: string | null;
  status: string;
  organization_id: string | null;
  created_at: string;
  reward_amount: number | null;
  reward_type: string | null;
}

interface UserProfile {
  id: string;
  full_name: string;
  username: string;
  phone_number: string | null;
}

interface Organization {
  id: string;
  organization_name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  waste_types: string;
  created_at: string;
}

const OrganizationDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [pickupOrders, setPickupOrders] = useState<PickupOrder[]>([]);
  const [userProfiles, setUserProfiles] = useState<Record<string, UserProfile>>({});
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrganization();
      loadPickupOrders();
      loadUserProfiles();
      
      // Set up real-time subscription
      const channel = supabase
        .channel('pickup-orders-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'pickup_orders'
          },
          () => {
            loadPickupOrders();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadOrganization = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('register_organizations')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading organization:', error);
        return;
      }

      setOrganization(data);
    } catch (error) {
      console.error('Error loading organization:', error);
    }
  };

  const loadPickupOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('pickup_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPickupOrders(data || []);
    } catch (error) {
      console.error('Error loading pickup orders:', error);
      toast({
        title: "Error",
        description: "Failed to load pickup orders",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) throw error;
      
      const profilesMap = (data || []).reduce((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {} as Record<string, UserProfile>);
      
      setUserProfiles(profilesMap);
    } catch (error) {
      console.error('Error loading user profiles:', error);
    }
  };

  const handleConfirmPickup = async (orderId: string) => {
    if (!organization) {
      toast({
        title: "Error",
        description: "No organization found. Please register your organization first.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('pickup_orders')
        .update({ 
          status: 'confirmed',
          organization_id: organization.id
        })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Pickup confirmed successfully"
      });
    } catch (error) {
      console.error('Error confirming pickup:', error);
      toast({
        title: "Error",
        description: "Failed to confirm pickup",
        variant: "destructive"
      });
    }
  };

  const handleAcceptPickup = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('pickup_orders')
        .update({ status: 'in_progress' })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Pickup accepted and marked as in progress"
      });
    } catch (error) {
      console.error('Error accepting pickup:', error);
      toast({
        title: "Error",
        description: "Failed to accept pickup",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-4">Please log in to access the organization dashboard.</p>
            <Link to="/auth">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Log In
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading organization dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Organization Found</h2>
            <p className="text-gray-600 mb-4">You need to register your organization first to access this dashboard.</p>
            <Link to="/register">
              <Button className="bg-green-600 hover:bg-green-700">
                Register Organization
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Organization Dashboard</h1>
            <p className="text-gray-600">Manage pickup orders from users in your area</p>
          </div>

          {/* Organization Profile Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Organization Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{organization.organization_name}</h3>
                    <p className="text-gray-600 mt-2">{organization.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{organization.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{organization.phone}</span>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <MapPinIcon className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="text-gray-600">{organization.address}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Waste Types Collected:</h4>
                  <div className="flex flex-wrap gap-2">
                    {organization.waste_types.split(',').map((type, index) => (
                      <Badge key={index} variant="secondary">
                        {type.trim()}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Registered on {new Date(organization.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pickup Orders Section */}
          <div className="grid gap-6">
            <h2 className="text-2xl font-bold text-gray-900">Pickup Orders</h2>
            
            {pickupOrders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Trash2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pickup orders yet</h3>
                  <p className="text-gray-500">Check back later for new pickup requests from users.</p>
                </CardContent>
              </Card>
            ) : (
              pickupOrders.map((order) => {
                const userProfile = userProfiles[order.user_id];
                return (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            Order #{order.id.slice(0, 8)}
                          </CardTitle>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">
                              {userProfile?.full_name || 'Unknown User'}
                            </span>
                            {userProfile?.phone_number && (
                              <span className="text-gray-500">
                                • {userProfile.phone_number}
                              </span>
                            )}
                          </div>

                          <div>
                            <p className="font-medium text-gray-900">Waste Type:</p>
                            <p className="text-gray-600">
                              {order.waste_type}
                              {order.waste_subtype && ` - ${order.waste_subtype}`}
                            </p>
                          </div>

                          <div>
                            <p className="font-medium text-gray-900">Weight:</p>
                            <p className="text-gray-600">{order.weight} kg</p>
                          </div>

                          {order.pickup_date && (
                            <div className="flex items-center space-x-2">
                              <CalendarDays className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">
                                {new Date(order.pickup_date).toLocaleString()}
                              </span>
                            </div>
                          )}

                          {order.pickup_address && (
                            <div className="flex items-start space-x-2">
                              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                              <span className="text-gray-600">{order.pickup_address}</span>
                            </div>
                          )}

                          {order.description && (
                            <div>
                              <p className="font-medium text-gray-900">Description:</p>
                              <p className="text-gray-600">{order.description}</p>
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          {order.image_url && (
                            <div>
                              <p className="font-medium text-gray-900 mb-2">Uploaded Image:</p>
                              <img
                                src={order.image_url}
                                alt="Waste item"
                                className="w-full h-48 object-cover rounded-lg border"
                              />
                            </div>
                          )}

                          <div className="flex flex-col space-y-2">
                            {order.status === 'pending' && (
                              <Button 
                                onClick={() => handleConfirmPickup(order.id)}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                              >
                                Confirm Pickup
                              </Button>
                            )}
                            
                            {order.status === 'confirmed' && (
                              <Button 
                                onClick={() => handleAcceptPickup(order.id)}
                                className="w-full bg-green-600 hover:bg-green-700"
                              >
                                Accept Pickup
                              </Button>
                            )}

                            {(order.status === 'in_progress' || order.status === 'completed') && (
                              <Button disabled className="w-full">
                                {order.status === 'in_progress' ? 'In Progress' : 'Completed'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrganizationDashboard;
