
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Account = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 bg-gray-50" style={{ backgroundBlendMode: 'overlay', backgroundColor: 'rgba(14, 18, 16, 0.7)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
                <p className="text-gray-500">john.doe@example.com</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="bg-white">Edit Profile</Button>
            </div>
          </div>

          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" defaultValue="+1 234 567 890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Green Street, Eco City" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent waste collection activities.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Array.from({length: 5}).map((_, i) => (
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
              <Card>
                <CardHeader>
                  <CardTitle>Your Rewards</CardTitle>
                  <CardDescription>Track your earnings and points.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Total Cash Earned</CardDescription>
                        <CardTitle className="text-2xl text-green-600">$42.50</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Eco-Score Points</CardDescription>
                        <CardTitle className="text-2xl text-green-600">3,250 pts</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>E-Gift Cards Redeemed</CardDescription>
                        <CardTitle className="text-2xl text-green-600">3</CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-4">Recent Rewards</h3>
                  <div className="space-y-4">
                    {Array.from({length: 3}).map((_, i) => (
                      <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">
                            {i === 0 ? "Cash Reward" :
                             i === 1 ? "Eco-Score Points" :
                             "E-Gift Card (Amazon)"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(2025, 4, 5 - i * 3).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="font-bold text-green-600">
                          {i === 0 ? "$5.00" :
                           i === 1 ? "500 pts" :
                           "$5.50"}
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
