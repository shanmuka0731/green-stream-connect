import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";

// Initial blog posts data
const initialBlogPosts = [
  {
    id: 1,
    title: "10 Creative Ways to Reduce Waste at Home",
    excerpt: "Discover practical and innovative approaches to minimize waste in your daily life and create a more sustainable home environment.",
    date: "May 2, 2025",
    author: "Emma Green",
    category: "Sustainable Living",
    imageUrl: "https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>In today's world, reducing waste isn't just good for the environment—it's becoming a necessity. Every year, the average person generates over 4 pounds of trash daily, much of which ends up in landfills. The good news is that with a few simple changes to our daily routines, we can significantly reduce our waste footprint.</p>
      
      <h2>1. Start Composting</h2>
      <p>Food scraps and yard waste make up about 30% of what we throw away. By composting these materials, you can reduce your waste while creating nutrient-rich soil for your garden. Even apartment dwellers can participate using compact composting systems designed for small spaces.</p>
      
      <h2>2. Embrace Reusable Shopping Bags</h2>
      <p>Plastic bags can take hundreds of years to decompose. Keep a set of reusable bags in your car or by the door so you never forget them when heading to the store. Many come in compact versions that easily fit in a purse or pocket.</p>
      
      <h2>3. Shop in Bulk</h2>
      <p>Purchase items like grains, nuts, and spices from bulk bins using your own containers. This eliminates packaging waste and often saves money too!</p>
      
      <h2>4. Repurpose Glass Jars</h2>
      <p>Instead of recycling glass jars, repurpose them as food storage containers, vases, or even drinking glasses. This gives them a second life before they enter the recycling stream.</p>
      
      <h2>5. Create a Home Recycling Station</h2>
      <p>Set up clearly labeled bins for different recyclables to make sorting easy for everyone in your household. Include information about what can and cannot be recycled in your community.</p>
      
      <h2>6. Invest in Quality, Not Quantity</h2>
      <p>Rather than buying cheap items that need frequent replacement, invest in quality products that last longer. This approach reduces waste and often saves money in the long run.</p>
      
      <h2>7. Repair Before Replacing</h2>
      <p>When something breaks, see if it can be repaired before replacing it. Many communities have repair cafés where volunteers help fix various items for free.</p>
      
      <h2>8. Use Cloth Napkins and Towels</h2>
      <p>Replace paper towels and napkins with reusable cloth versions. This simple switch can save hundreds of paper products from landfills annually.</p>
      
      <h2>9. Try DIY Cleaning Products</h2>
      <p>Make your own cleaning solutions using simple ingredients like vinegar, baking soda, and essential oils. This reduces plastic bottle waste and avoids harmful chemicals.</p>
      
      <h2>10. Join a Buy-Nothing Group</h2>
      <p>Connect with neighbors through local buy-nothing groups where people give away unwanted items instead of throwing them away. It's a great way to find new homes for things you no longer need and acquire items without purchasing new.</p>
      
      <p>Remember, reducing waste doesn't have to happen all at once. Start with one or two changes and gradually incorporate more as they become habits. Every small action contributes to a larger impact when we all work together toward a more sustainable future.</p>
    `
  },
  {
    id: 2,
    title: "The Economic Benefits of Recycling",
    excerpt: "Explore how recycling creates jobs, saves resources, and generates economic value while protecting our environment.",
    date: "April 28, 2025",
    author: "Michael Rivers",
    category: "Economics",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>While environmental benefits of recycling are well-known, the economic advantages are equally impressive but often overlooked. Recycling isn't just good for the planet—it's good for the economy too.</p>
      
      <h2>Job Creation</h2>
      <p>The recycling industry creates significantly more jobs than landfill or incineration operations. Processing recyclables requires workers for collection, sorting, processing, and manufacturing new products. Studies show that for every 10,000 tons of waste, landfills create 6 jobs, while recycling creates 36 jobs—a 6x increase in employment opportunities.</p>
      
      <h2>Revenue Generation</h2>
      <p>Municipalities can generate revenue by selling collected recyclable materials to processors. Though market values fluctuate, materials like aluminum and certain plastics consistently command good prices in recycling markets.</p>
      
      <h2>Reduced Disposal Costs</h2>
      <p>Cities and towns pay tipping fees for landfill disposal, which continue to rise as landfill space becomes more limited. By diverting materials through recycling programs, communities can significantly reduce these disposal costs.</p>
      
      <h2>Energy Savings</h2>
      <p>Manufacturing products from recycled materials typically requires less energy than using virgin materials. For example, producing aluminum from recycled materials uses 95% less energy than mining and processing new aluminum. These energy savings translate to lower production costs for manufacturers.</p>
      
      <h2>Resource Conservation</h2>
      <p>As natural resources become scarcer, their extraction costs rise. Recycling extends the life of these valuable resources, helping to stabilize prices of raw materials for industries that depend on them.</p>
      
      <h2>Innovation and New Markets</h2>
      <p>The challenges of recycling complex materials have driven innovation in processing technologies and created entirely new markets for recycled products. Companies are finding profitable ways to transform what was once considered waste into valuable commodities.</p>
      
      <h2>Reduced Environmental Cleanup Costs</h2>
      <p>Proper waste management through recycling helps prevent pollution that would otherwise require expensive cleanup operations. These avoided costs represent real economic benefits to communities and taxpayers.</p>
      
      <h2>The Circular Economy Advantage</h2>
      <p>As we move toward a more circular economy, where materials are continuously reused rather than discarded, the economic benefits multiply. Businesses that embrace circular models often find new revenue streams and cost savings opportunities while building stronger customer relationships through sustainable practices.</p>
      
      <p>The economic case for recycling continues to strengthen as technologies improve and markets develop. For communities and businesses looking to boost economic development while addressing environmental concerns, recycling programs offer a proven solution with multiple benefits.</p>
    `
  },
  {
    id: 3,
    title: "Understanding Different Types of Plastic Waste",
    excerpt: "Learn about the various types of plastics, their recyclability, and how to properly sort them for maximum environmental benefit.",
    date: "April 21, 2025",
    author: "Sarah Johnson",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1605600659236-3bdfb9befd68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Not all plastics are created equal, especially when it comes to recycling. Understanding the different types of plastic and their recyclability can help ensure your recycling efforts actually make a difference.</p>
      
      <div class="my-6">
        <img 
          src="https://images.unsplash.com/photo-1618477462146-aa33540c7fc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
          alt="Different types of plastic waste sorted for recycling" 
          class="w-full rounded-lg shadow-md"
        />
        <p class="text-sm text-gray-500 mt-2 italic text-center">Various plastic types sorted for recycling, each with different properties and recyclability.</p>
      </div>
      
      <h2>The Plastic Identification Code System</h2>
      <p>Most plastic products contain a number (1-7) inside a triangular recycling symbol. This Resin Identification Code indicates the type of plastic used and affects whether and how the item can be recycled.</p>
      
      <h2>#1 – PET (Polyethylene Terephthalate)</h2>
      <p><strong>Common products:</strong> Water bottles, soda bottles, food jars<br>
      <strong>Recyclability:</strong> Highly recyclable and in high demand by recyclers<br>
      <strong>Recycled into:</strong> Clothing fibers, new bottles, food containers</p>
      
      <h2>#2 – HDPE (High-Density Polyethylene)</h2>
      <p><strong>Common products:</strong> Milk jugs, detergent bottles, shampoo bottles<br>
      <strong>Recyclability:</strong> Easily recycled with established markets<br>
      <strong>Recycled into:</strong> Plastic lumber, recycling bins, playground equipment</p>
      
      <h2>#3 – PVC (Polyvinyl Chloride)</h2>
      <p><strong>Common products:</strong> Pipes, window frames, vinyl records, medical tubing<br>
      <strong>Recyclability:</strong> Difficult to recycle and rarely accepted in curbside programs<br>
      <strong>Environmental concerns:</strong> Can leach harmful chemicals if improperly disposed</p>
      
      <h2>#4 – LDPE (Low-Density Polyethylene)</h2>
      <p><strong>Common products:</strong> Plastic bags, squeeze bottles, shrink wrap<br>
      <strong>Recyclability:</strong> Not commonly accepted in curbside programs but can be recycled at store drop-off locations<br>
      <strong>Recycled into:</strong> Garbage can liners, floor tiles, furniture</p>
      
      <h2>#5 – PP (Polypropylene)</h2>
      <p><strong>Common products:</strong> Yogurt containers, medicine bottles, bottle caps<br>
      <strong>Recyclability:</strong> Increasingly accepted in recycling programs<br>
      <strong>Recycled into:</strong> Car parts, industrial fibers, food containers</p>
      
      <h2>#6 – PS (Polystyrene/Styrofoam)</h2>
      <p><strong>Common products:</strong> Disposable cups, take-out containers, packing peanuts<br>
      <strong>Recyclability:</strong> Rarely accepted in recycling programs and difficult to recycle<br>
      <strong>Environmental impact:</strong> Breaks down into small pieces that can harm wildlife</p>
      
      <h2>#7 – Other</h2>
      <p><strong>Common products:</strong> Bioplastics, polycarbonate, mixed material items<br>
      <strong>Recyclability:</strong> Generally not recyclable through conventional programs<br>
      <strong>Note:</strong> This category includes both petroleum-based plastics and newer compostable bioplastics</p>
      
      <h2>Tips for Better Plastic Recycling</h2>
      <ul>
        <li>Check with your local recycling program about which plastics they accept</li>
        <li>Rinse containers before recycling to remove food residue</li>
        <li>Remove labels and caps if required by your local program</li>
        <li>Don't bag recyclables unless specified by your collector</li>
        <li>When in doubt, leave it out – contamination can ruin entire batches of recyclables</li>
      </ul>
      
      <p>By becoming more familiar with plastic types and following local guidelines, you can make a meaningful contribution to reducing plastic waste and supporting the recycling economy.</p>
    `
  },
  {
    id: 4,
    title: "E-Waste Management: A Growing Challenge",
    excerpt: "Delve into the complexities of electronic waste and discover responsible ways to dispose of your outdated devices.",
    date: "April 15, 2025",
    author: "Tony Stark",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Electronic waste, or e-waste, has become one of the fastest-growing waste streams worldwide. As technology evolves at an unprecedented pace, our electronic devices become outdated quicker than ever before, creating a mounting disposal challenge.</p>
      
      <h2>The E-Waste Crisis</h2>
      <p>According to the United Nations, approximately 50 million tons of e-waste are generated globally each year, with only about 20% being formally recycled. The rest often ends up in landfills or is shipped to developing countries where informal recycling practices expose workers and the environment to hazardous materials.</p>
      
      <h2>What Qualifies as E-Waste?</h2>
      <p>E-waste includes any discarded electronic device or component, such as:</p>
      <ul>
        <li>Computers, laptops, and tablets</li>
        <li>Smartphones and mobile devices</li>
        <li>Televisions and monitors</li>
        <li>Printers and scanners</li>
        <li>Gaming consoles</li>
        <li>Small household appliances</li>
        <li>Batteries and power supplies</li>
      </ul>
      
      <h2>Why E-Waste Requires Special Handling</h2>
      <p>Electronic devices contain valuable materials like gold, silver, copper, and rare earth elements. However, they also contain toxic substances including lead, mercury, cadmium, and flame retardants that can leach into soil and water when improperly disposed of.</p>
      
      <h2>Responsible E-Waste Disposal Options</h2>
      
      <h3>1. Manufacturer Take-Back Programs</h3>
      <p>Many major electronics manufacturers offer recycling programs for their products. Companies like Apple, Dell, and Samsung have established systems to take back and recycle their devices, often providing trade-in value or discounts on new purchases.</p>
      
      <h3>2. Electronic Retailers</h3>
      <p>Retailers like Best Buy, Staples, and Office Depot offer free recycling for certain electronics, regardless of where they were purchased.</p>
      
      <h3>3. Municipal Collection</h3>
      <p>Many cities and counties host e-waste collection events or have permanent drop-off locations. Check with your local waste management department for options in your area.</p>
      
      <h3>4. Certified E-Waste Recyclers</h3>
      <p>Look for recyclers certified under standards like e-Stewards or R2 (Responsible Recycling), which ensure environmentally responsible practices and data security.</p>
      
      <h2>Before You Recycle: Data Security</h2>
      <p>Before disposing of any device that stores personal information:</p>
      <ol>
        <li>Back up any data you want to keep</li>
        <li>Perform a factory reset on the device</li>
        <li>For computers, use secure data wiping software</li>
        <li>Remove and physically destroy hard drives for highly sensitive information</li>
      </ol>
      
      <h2>Extending Device Lifespan</h2>
      <p>The most sustainable approach is to reduce e-waste generation in the first place:</p>
      <ul>
        <li>Consider repairs before replacement</li>
        <li>Upgrade components rather than entire devices when possible</li>
        <li>Donate working electronics to schools or nonprofits</li>
        <li>Sell or gift devices that still have useful life</li>
      </ul>
      
      <p>By making informed choices about how we purchase, use, and dispose of electronic devices, we can help address the growing e-waste challenge while recovering valuable materials and protecting our environment.</p>
    `
  }
];

// Additional blog posts that will be loaded when "Load More Articles" is clicked
const additionalBlogPosts = [
  {
    id: 5,
    title: "Community-Based Recycling Initiatives",
    excerpt: "How local communities are taking waste management into their own hands with innovative grassroots recycling programs.",
    date: "April 10, 2025",
    author: "Diana Prince",
    category: "Community",
    imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>As municipal recycling programs face challenges from changing markets and budget constraints, communities across the country are developing their own solutions to waste management problems.</p>
      
      <h2>The Power of Grassroots Recycling</h2>
      <p>Community-based recycling initiatives are proving that local action can make a significant impact on waste reduction. These programs often address materials that aren't accepted in conventional recycling systems and create stronger community connections in the process.</p>
      
      <h2>Successful Community Models</h2>
      
      <h3>1. Neighborhood Collection Hubs</h3>
      <p>In Portland, Oregon, a network of volunteer-run collection points accepts hard-to-recycle items like bottle caps, plastic film, and small electronics. These materials are then aggregated and sent to specialized recyclers.</p>
      
      <h3>2. Tool Libraries</h3>
      <p>Communities from Toronto to Berkeley have established libraries that loan tools rather than books. These share programs reduce consumption by allowing members to borrow seldom-used items instead of purchasing them, keeping perfectly good tools out of landfills.</p>
      
      <h3>3. Repair Cafés</h3>
      <p>Monthly events where community members with repair skills volunteer to fix broken household items, electronics, and clothing have spread to over 2,000 locations worldwide. These events extend product lifespans and teach valuable repair skills.</p>
      
      <h3>4. Community Composting</h3>
      <p>Neighborhood-scale composting programs turn food scraps into valuable soil amendments for community gardens. These projects often operate in urban areas where residents lack yard space for individual composting.</p>
      
      <h2>Starting Your Own Initiative</h2>
      <p>Launching a community recycling program doesn't require massive resources or expertise:</p>
      <ol>
        <li>Identify a specific waste stream not handled by existing services</li>
        <li>Research potential end markets or partnerships for the materials</li>
        <li>Start small with a pilot program in one neighborhood</li>
        <li>Use social media and community meetings to educate and engage participants</li>
        <li>Document your results to attract grants or municipal support</li>
      </ol>
      
      <h2>Overcoming Common Challenges</h2>
      <p>Successful community recycling initiatives have found creative solutions to typical obstacles:</p>
      
      <h3>Space Constraints</h3>
      <p>Partner with schools, community centers, or faith organizations that can host collection events or provide ongoing storage.</p>
      
      <h3>Transportation</h3>
      <p>Create volunteer driver networks or partner with businesses that already make regular deliveries to recycling facilities.</p>
      
      <h3>Funding</h3>
      <p>Many programs start with volunteerism and grow into self-sustaining operations through small user fees, sale of processed materials, or local business sponsorships.</p>
      
      <h2>The Ripple Effect</h2>
      <p>Beyond their direct environmental impact, community recycling programs create valuable social connections, develop local leadership, and often influence broader waste policies as municipalities see what's possible through citizen action.</p>
      
      <p>By taking ownership of local waste challenges, communities aren't just filling gaps in municipal recycling—they're pioneering new approaches that could eventually transform how we manage resources on a larger scale.</p>
    `
  },
  {
    id: 6,
    title: "Zero Waste Living: Beyond Recycling",
    excerpt: "Discover how the zero waste movement is challenging our entire relationship with consumption and waste generation.",
    date: "April 5, 2025",
    author: "Bruce Wayne",
    category: "Lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>While recycling remains important, the zero waste movement pushes us to think more holistically about our relationship with materials and resources. Zero waste advocates aim to prevent waste from being created in the first place rather than finding better ways to dispose of it.</p>
      
      <h2>The Zero Waste Hierarchy</h2>
      <p>Zero waste philosophy follows a hierarchy often summarized as the "5 Rs":</p>
      <ol>
        <li><strong>Refuse</strong> what you don't need</li>
        <li><strong>Reduce</strong> what you do need</li>
        <li><strong>Reuse</strong> by repurposing or finding new homes for items</li>
        <li><strong>Recycle</strong> what can't be refused, reduced, or reused</li>
        <li><strong>Rot</strong> (compost) the rest</li>
      </ol>
      
      <h2>Practical Zero Waste Strategies</h2>
      
      <h3>Shopping Habits</h3>
      <p>Zero waste practitioners bring their own containers to stores, purchase unpackaged foods, and prioritize package-free options. Many cities now have dedicated zero waste stores that allow customers to fill their own containers with everything from grains to cleaning supplies.</p>
      
      <h3>Kitchen Transformations</h3>
      <p>The kitchen is often the first target for zero waste enthusiasts, with changes including:</p>
      <ul>
        <li>Cloth napkins and towels instead of paper</li>
        <li>Beeswax wraps instead of plastic wrap</li>
        <li>Buying in bulk with reusable containers</li>
        <li>Comprehensive composting systems</li>
      </ul>
      
      <h3>Bathroom Swaps</h3>
      <p>Zero waste bathrooms might include:</p>
      <ul>
        <li>Bar soap instead of liquid soap in plastic bottles</li>
        <li>Shampoo bars or refillable shampoo</li>
        <li>Safety razors with replaceable blades instead of disposable razors</li>
        <li>Reusable menstrual products</li>
        <li>Bamboo toothbrushes and compostable dental floss</li>
      </ul>
      
      <h2>The Business Response</h2>
      <p>As the zero waste movement grows, businesses are responding with new models:</p>
      <ul>
        <li>Package-free stores and refill stations</li>
        <li>Subscription services for refillable products</li>
        <li>Durable packaging with deposit systems</li>
        <li>Compostable packaging made from agricultural waste</li>
      </ul>
      
      <h2>Zero Waste in Communities</h2>
      <p>Some municipalities are adopting zero waste goals and implementing policies such as:</p>
      <ul>
        <li>Bans on single-use plastics</li>
        <li>Pay-as-you-throw trash collection that charges based on volume</li>
        <li>Mandatory composting programs</li>
        <li>Extended producer responsibility laws that make manufacturers responsible for product disposal</li>
      </ul>
      
      <h2>The Imperfect Reality</h2>
      <p>True zero waste living remains challenging in our current system. Even dedicated practitioners acknowledge that perfection isn't possible. The movement emphasizes progress over perfection, with many adopting the "low waste" label to acknowledge the systemic barriers to complete waste elimination.</p>
      
      <h2>Beyond Individual Action</h2>
      <p>While personal habits matter, zero waste advocates increasingly focus on systemic change, pushing for:</p>
      <ul>
        <li>Product redesign for durability and recyclability</li>
        <li>Infrastructure investments in composting and recycling</li>
        <li>Policy changes that shift responsibility to producers</li>
        <li>Cultural shifts away from disposability</li>
      </ul>
      
      <p>By questioning our assumptions about waste and challenging the linear "take-make-dispose" economy, the zero waste movement offers a vision for a more sustainable and resourceful society.</p>
    `
  }
];

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [open, setOpen] = useState(false);

  // Function to handle "Load More Articles" button click
  const handleLoadMore = () => {
    setBlogPosts([...blogPosts, ...additionalBlogPosts]);
  };

  // Function to handle "Read More" button click
  const handleReadMore = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="relative">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0" 
             style={{
               backgroundImage: `url('/lovable-uploads/89fca08e-a189-4fcf-a95d-1b8324cf9641.png')`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundBlendMode: 'overlay',
               backgroundColor: 'rgba(14, 18, 16, 0.7)'
             }}>
        </div>
        
        <main className="relative z-10 flex-grow py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 bg-white/80 p-6 rounded-lg shadow-md">
              <h1 className="text-4xl font-bold text-gray-900">Our Blog</h1>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Stay updated with the latest news, tips, and insights about waste management and sustainability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden shadow-lg bg-white/90">
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
                    <Button 
                      variant="outline" 
                      className="hover:text-green-600 hover:border-green-600"
                      onClick={() => handleReadMore(post)}
                    >
                      Read More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {blogPosts.length < (initialBlogPosts.length + additionalBlogPosts.length) && (
              <div className="mt-12 text-center">
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleLoadMore}
                >
                  Load More Articles
                </Button>
              </div>
            )}

            {/* Add pagination for better navigation */}
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            {/* Blog post content dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <DialogTitle className="text-2xl font-bold mb-2">{selectedPost?.title}</DialogTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <span>By {selectedPost?.author}</span>
                        <span>•</span>
                        <span>{selectedPost?.date}</span>
                        <span>•</span>
                        <span>{selectedPost?.category}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="h-8 w-8 p-0" 
                      onClick={() => setOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </DialogHeader>
                {selectedPost && (
                  <div>
                    <div className="mb-6">
                      <img 
                        src={selectedPost.imageUrl} 
                        alt={selectedPost.title}
                        className="w-full h-auto object-cover rounded-md"
                      />
                    </div>
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                    />
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
