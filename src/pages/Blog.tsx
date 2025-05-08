
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BlogPosts = [
  {
    id: 1,
    title: "10 Creative Ways to Reduce Waste at Home",
    excerpt: "Discover practical and innovative approaches to minimize waste in your daily life and create a more sustainable home environment.",
    date: "May 2, 2025",
    author: "Emma Green",
    category: "Sustainable Living",
    imageUrl: "https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "The Economic Benefits of Recycling",
    excerpt: "Explore how recycling creates jobs, saves resources, and generates economic value while protecting our environment.",
    date: "April 28, 2025",
    author: "Michael Rivers",
    category: "Economics",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Understanding Different Types of Plastic Waste",
    excerpt: "Learn about the various types of plastics, their recyclability, and how to properly sort them for maximum environmental benefit.",
    date: "April 21, 2025",
    author: "Sarah Johnson",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1605600659236-3bdfb9befd68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "E-Waste Management: A Growing Challenge",
    excerpt: "Delve into the complexities of electronic waste and discover responsible ways to dispose of your outdated devices.",
    date: "April 15, 2025",
    author: "Tony Stark",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Our Blog</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news, tips, and insights about waste management and sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BlogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="text-gray-600">By {post.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="hover:text-green-600 hover:border-green-600">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Load More Articles
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
