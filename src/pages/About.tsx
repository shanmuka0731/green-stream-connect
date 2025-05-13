
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0 opacity-20" 
        style={{ 
          backgroundImage: "url('/lovable-uploads/525c58f8-4f0d-4eb5-820b-06671ac23d8c.png')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      ></div>
      
      <Navbar />
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
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
