
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const creators = [
    {
      name: "Sarah Johnson",
      role: "Environmental Scientist",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Mike Chen",
      role: "Sustainability Expert",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Emma Rodriguez",
      role: "Community Outreach Lead",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "David Thompson",
      role: "Technology Director",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const surveyData = [
    {
      title: "Waste Reduction Impact",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      description: "Our community survey revealed that 89% of participants reduced their household waste by at least 30% after joining Trash2Cash. The most significant improvements were seen in plastic waste reduction and proper recycling practices."
    },
    {
      title: "Community Engagement",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&h=400&fit=crop",
      description: "95% of survey respondents reported feeling more connected to their local environmental community. Regular pickup events have created lasting friendships and collaborative initiatives beyond waste management."
    },
    {
      title: "Economic Benefits",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      description: "Participants have earned an average of $150 per month through our rewards program. 78% of users reinvest their earnings into more sustainable lifestyle choices, creating a positive feedback loop for environmental impact."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background image - moved to a lower z-index */}
      <div 
        className="absolute inset-0 z-[-1] opacity-100" 
        style={{ 
          backgroundImage: "url('/lovable-uploads/6f4548ee-dae0-42ac-9645-2b5e74d87e7f.png')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(14, 18, 16, 0.7)"
        }}
      ></div>
      
      {/* Navbar - ensure it's above background */}
      <div className="relative z-20">
        <Navbar />
      </div>
      
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About Trash2Cash</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Trash2Cash is a revolutionary platform that connects environmentally conscious individuals 
              with waste collection organizations, creating a sustainable ecosystem 
              that benefits both people and the planet.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              We're committed to reducing waste, promoting recycling, and creating economic 
              opportunities for communities. By incentivizing proper waste disposal, 
              we aim to create a cleaner, greener world while providing tangible benefits to our users.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">How It Works</h2>
            <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Upload Waste Details:</strong> Tell us about the waste you've collected and want to recycle.</li>
              <li><strong>Schedule a Pickup:</strong> Choose a convenient time and location for collection.</li>
              <li><strong>Get Rewarded:</strong> Earn cash, points, or e-gift cards based on the type and quantity of waste.</li>
            </ol>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Impact</h2>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-green-600">12,500 kg</p>
                  <p className="text-gray-700">Waste Collected</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">2,300+</p>
                  <p className="text-gray-700">Active Users</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">$18,000+</p>
                  <p className="text-gray-700">Rewards Distributed</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Creators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {creators.map((creator, index) => (
                <Card key={index} className="text-center">
                  <CardHeader className="pb-4">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={creator.image} alt={creator.name} />
                      <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{creator.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{creator.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mb-8">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg">
                    View Community Surveys
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center mb-6">Community Survey Results</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-8">
                    {surveyData.map((survey, index) => (
                      <div key={index} className="border-b pb-6 last:border-b-0">
                        <h3 className="text-xl font-semibold mb-4">{survey.title}</h3>
                        <img 
                          src={survey.image} 
                          alt={survey.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <p className="text-gray-700 leading-relaxed">{survey.description}</p>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Partners</h2>
            <p className="text-gray-700 mb-6">
              We collaborate with local waste management companies, recycling facilities, and environmentally 
              conscious brands to create a robust ecosystem that maximizes the value of recyclable materials.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Join the Movement</h2>
            <p className="text-gray-700 mb-6">
              Whether you're an individual looking to make a difference, a business seeking sustainable waste 
              solutions, or a waste collection organization wanting to expand your network, Trash2Cash 
              has a place for you in our growing community.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
