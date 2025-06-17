
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

// Define form validation schema
const formSchema = z.object({
  organizationName: z.string().min(2, "Organization name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address is required"),
  description: z.string().min(10, "Please provide a brief description"),
  wasteTypes: z.string().min(3, "Please specify waste types you collect")
});

type FormValues = z.infer<typeof formSchema>;

interface RegisteredOrg {
  id: string;
  organization_name: string;
  email: string;
  phone: string;
  address: string;
  waste_types: string;
  created_at: string;
}

const Register = () => {
  const { toast } = useToast();
  const [registrations, setRegistrations] = useState<FormValues[]>([]);
  const [registeredOrgs, setRegisteredOrgs] = useState<RegisteredOrg[]>([]);
  const [pickups] = useState([
    { id: 1, location: "123 Green St", status: "Pending", wasteType: "Plastic" },
    { id: 2, location: "456 Eco Ave", status: "Confirmed", wasteType: "Paper" },
    { id: 3, location: "789 Recycle Rd", status: "Completed", wasteType: "Metal" }
  ]);

  useEffect(() => {
    loadRegisteredOrgs();
  }, []);

  const loadRegisteredOrgs = async () => {
    try {
      const { data, error } = await supabase
        .from('register_organizations')
        .select('id, organization_name, email, phone, address, waste_types, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading registered organizations:', error);
        return;
      }

      setRegisteredOrgs(data || []);
    } catch (error) {
      console.error('Error loading registered organizations:', error);
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      wasteTypes: ""
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const { error } = await supabase
        .from('register_organizations')
        .insert({
          organization_name: data.organizationName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          description: data.description,
          waste_types: data.wasteTypes
        });

      if (error) throw error;

      // Update local state for immediate UI feedback
      setRegistrations([...registrations, data]);
      
      // Reload registered organizations
      await loadRegisteredOrgs();
      
      toast({
        title: "Success",
        description: "Your organization has been registered successfully"
      });
      form.reset();
    } catch (error) {
      console.error('Error registering organization:', error);
      toast({
        title: "Error",
        description: "Failed to register organization",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main style={{
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(14, 18, 16, 0.7)'
      }} className="flex-grow py-12 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-transparent bg-clip-text drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Register Your Organization
            </h1>
            <Link to="/organization-dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Organization Dashboard
              </Button>
            </Link>
          </div>
          
          {/* Registration form */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter organization name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Your organization address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="wasteTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waste Types Collected</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. Plastic, Paper, Metal, E-waste" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your organization and recycling services" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Register Organization
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Database display section */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-transparent bg-clip-text drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-4">
                Recently Registered Organizations
              </h2>
              {registeredOrgs.length > 0 ? (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Organization
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Waste Types
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {registeredOrgs.map((org) => (
                        <tr key={org.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{org.organization_name}</div>
                            <div className="text-sm text-gray-500">{org.address}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{org.email}</div>
                            <div className="text-sm text-gray-500">{org.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {org.waste_types}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(org.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                  No organizations registered yet.
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-transparent bg-clip-text drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-4">
                Recent Pickup Orders
              </h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Waste Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pickups.map((pickup) => (
                      <tr key={pickup.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{pickup.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pickup.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pickup.wasteType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            pickup.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                            pickup.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {pickup.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
