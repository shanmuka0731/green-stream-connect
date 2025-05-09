
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <div className="relative z-10">
          {/* Features Section */}
          <section className="py-16 bg-white/90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Smart Waste Management
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                  Turn your waste into rewards with our innovative platform
                </p>
              </div>

              <div className="mt-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-green-600">Collect</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                      <p className="text-gray-600">
                        Gather your recyclable waste and categorize it for easy collection and processing.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-green-600">Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">
                        Book a convenient pickup time and location for our waste collection partners to collect your recyclables.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-green-600">Earn</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">
                        Get rewarded with cash, eco-score points, or e-gift cards for your contribution to a cleaner planet.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-12 bg-green-50/90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6 text-center">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Waste Collected
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-green-600">
                      12,500 kg
                    </dd>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6 text-center">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Users
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-green-600">
                      2,300+
                    </dd>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6 text-center">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Rewards Distributed
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-green-600">
                      $18,000+
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
