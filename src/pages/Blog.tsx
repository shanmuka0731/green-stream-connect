import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
    imageUrl: "https://imageio.forbes.com/specials-images/imageserve/624d96b19155c209e2d7efd7/Cityscape-mixed-with-green-plants--multi-layered-image/960x0.jpg?height=473&width=711&fit=bounds",
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
  },
  {
    id: 7,
    title: "The Future of Biodegradable Packaging",
    excerpt: "Explore how innovative materials are revolutionizing packaging to reduce environmental impact while maintaining convenience.",
    date: "March 28, 2025",
    author: "Lara Croft",
    category: "Innovation",
    imageUrl: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>As awareness of plastic pollution grows, the packaging industry is experiencing a remarkable transformation. Innovators around the world are developing alternatives that can break down naturally while still meeting the practical needs of modern commerce.</p>
      
      <h2>The Problem with Conventional Packaging</h2>
      <p>Traditional plastic packaging presents a formidable environmental challenge. Most petroleum-based plastics persist in the environment for hundreds of years, fragmenting into microplastics that contaminate water systems and enter food chains. Even when recycling infrastructure exists, only a small percentage of plastic packaging is actually recycled, with the rest ending up in landfills, incinerators, or as environmental litter.</p>
      
      <h2>New Materials Entering the Market</h2>
      
      <h3>Mushroom Packaging</h3>
      <p>Companies like Ecovative Design have developed packaging grown from mycelium (mushroom roots) combined with agricultural waste. This material can be molded into custom shapes for protective packaging and fully composts within 45-90 days after use.</p>
      
      <h3>Seaweed-Based Films</h3>
      <p>Startups such as Notpla are creating packaging from seaweed and plants that can hold liquids and even be eaten. Their Ooho product—edible water bubbles—has been used at major sporting events to replace plastic water bottles.</p>
      
      <h3>Advanced Paper Solutions</h3>
      <p>New technologies are enhancing paper's capabilities, with innovations like water-resistant papers made without plastic coatings and paper bottles for products traditionally packaged in plastic.</p>
      
      <h3>Agricultural Waste Composites</h3>
      <p>Materials made from sugarcane bagasse, wheat straw, and corn stalks are being transformed into durable packaging products that utilize agricultural byproducts while creating fully compostable end items.</p>
      
      <h2>The Biodegradability Challenge</h2>
      <p>The term "biodegradable" has been misused in marketing, leading to consumer confusion. True biodegradability requires specific conditions:</p>
      <ul>
        <li>Complete breakdown into natural elements (water, carbon dioxide, biomass)</li>
        <li>Decomposition within a reasonable timeframe (typically under one year)</li>
        <li>No toxic residues left behind</li>
        <li>Degradability in realistic environments (not just industrial facilities)</li>
      </ul>
      
      <h2>Standards and Certification</h2>
      <p>Several certification systems have emerged to validate biodegradability claims:</p>
      <ul>
        <li>Biodegradable Products Institute (BPI) certification for compostability in industrial facilities</li>
        <li>TÜV OK Compost Home certification for backyard compostability</li>
        <li>Marine degradability certifications for items that may enter ocean environments</li>
      </ul>
      
      <h2>Scaling Challenges</h2>
      <p>Despite promising innovations, several obstacles remain for widespread adoption:</p>
      
      <h3>Cost Competitiveness</h3>
      <p>Most biodegradable alternatives still cost more than conventional plastics, though economies of scale are gradually reducing this gap.</p>
      
      <h3>Performance Limitations</h3>
      <p>Some biobased materials don't perform as well as plastics for certain applications, particularly where barrier properties or durability are essential.</p>
      
      <h3>Infrastructure Gaps</h3>
      <p>Many biodegradable materials require specific composting conditions not widely available in current waste management systems.</p>
      
      <h2>Policy Drivers</h2>
      <p>Governments are increasingly implementing policies that accelerate the transition to sustainable packaging:</p>
      <ul>
        <li>Extended Producer Responsibility (EPR) laws that make manufacturers responsible for end-of-life management</li>
        <li>Bans or taxes on single-use plastics</li>
        <li>Recycled content mandates</li>
        <li>Green public procurement policies</li>
      </ul>
      
      <h2>The Consumer's Role</h2>
      <p>Educated consumers play a critical part in the transition to biodegradable packaging by:</p>
      <ul>
        <li>Supporting brands that use sustainable packaging</li>
        <li>Properly disposing of biodegradable items according to their design (home compost, industrial compost, etc.)</li>
        <li>Advocating for better waste infrastructure in their communities</li>
      </ul>
      
      <p>As research continues and technologies mature, biodegradable packaging is poised to become a standard feature of sustainable product systems rather than a niche alternative.</p>
    `
  },
  {
    id: 9,
    title: "Ocean Plastic Crisis: Solutions for Our Seas",
    excerpt: "Discover the innovative approaches being used to combat ocean plastic pollution and protect marine ecosystems.",
    date: "March 18, 2025",
    author: "Arthur Curry",
    category: "Marine Conservation",
    imageUrl: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>With an estimated 8 million metric tons of plastic entering our oceans annually, plastic pollution has become one of the most pressing environmental crises of our time, threatening marine ecosystems and the billions of people who depend on them.</p>
      
      <h2>The Scale of Ocean Plastic Pollution</h2>
      <p>Plastic waste has been discovered in the deepest ocean trenches and the most remote Arctic ice, demonstrating the pervasiveness of this pollution. Marine species from tiny plankton to massive whales are ingesting microplastics, with cascading impacts throughout the food web—including potential implications for human health as these particles make their way up the food chain.</p>
      
      <h2>Beach and Coastal Cleanups</h2>
      <p>While not a complete solution, cleanup efforts play an essential role in addressing existing pollution. Organizations like Ocean Conservancy coordinate the International Coastal Cleanup, which has removed more than 350 million pounds of trash from beaches and waterways since 1986. These events not only reduce pollution but also collect valuable data about the types and sources of marine debris.</p>
      
      <h2>River Interception Systems</h2>
      <p>With research showing that just 10 major river systems carry the majority of plastic waste to oceans, targeted interception technologies are proving effective. Projects like The Ocean Cleanup's Interceptor deploy solar-powered collection systems at river mouths to capture plastic before it reaches the ocean.</p>
      
      <h2>Ocean Cleanup Technologies</h2>
      <p>Innovative systems are being deployed to address plastic already in our oceans. The most ambitious of these is The Ocean Cleanup's System 002, which uses a passive drifting system to collect plastic in the Great Pacific Garbage Patch. After numerous iterations and technological improvements, the system is now successfully removing tons of plastic from this notorious accumulation zone.</p>
      
      <h2>Material Innovation</h2>
      <p>Scientists and entrepreneurs are developing truly marine-degradable alternatives to conventional plastics for applications where plastic commonly enters waterways. These include:</p>
      <ul>
        <li>Algae-based packaging materials that marine organisms can safely consume</li>
        <li>Fishing gear made with biodegradable polymers that break down if lost at sea</li>
        <li>Marine-degradable versions of common plastic items found in ocean pollution</li>
      </ul>
      
      <h2>Policy Solutions</h2>
      <p>Recognizing that cleanups alone cannot solve the crisis, governments around the world are implementing policies aimed at prevention:</p>
      <ul>
        <li>Bans on single-use plastics, particularly those commonly found in marine environments</li>
        <li>Extended Producer Responsibility laws that require manufacturers to manage their products through end-of-life</li>
        <li>Improved waste management infrastructure in coastal communities and developing nations</li>
        <li>The UN Global Plastics Treaty negotiations, which aim to create the first legally binding international agreement on plastic pollution</li>
      </ul>
      
      <h2>Fishing Gear Solutions</h2>
      <p>Abandoned fishing gear, or "ghost gear," constitutes a significant portion of ocean plastic and causes particular harm through wildlife entanglement. Solutions include:</p>
      <ul>
        <li>Gear marking and tracking systems to identify ownership</li>
        <li>Fishery-specific collection points and recycling programs</li>
        <li>Financial incentives for returning end-of-life gear</li>
        <li>Development of biodegradable fishing gear alternatives</li>
      </ul>
      
      <h2>Corporate Commitments</h2>
      <p>Major corporations are responding to consumer pressure with commitments to reduce plastic packaging and support recovery systems. Notable initiatives include:</p>
      <ul>
        <li>Packaging redesigns that eliminate unnecessary plastic</li>
        <li>Investment in collection infrastructure in developing nations</li>
        <li>Incorporation of recycled ocean plastic into new products</li>
        <li>Support for innovative startups focused on ocean plastic solutions</li>
      </ul>
      
      <h2>The Role of Citizen Science</h2>
      <p>Individuals are contributing valuable data through citizen science programs that track marine debris. Mobile apps allow beachgoers to document what they find, creating comprehensive maps of pollution hotspots and helping researchers understand distribution patterns and sources.</p>
      
      <h2>Looking Forward</h2>
      <p>The most promising approaches combine immediate action to address existing pollution with systemic changes to prevent new plastic from entering waterways. Success will require international cooperation, technological innovation, and fundamental shifts in how we produce, use, and manage plastic materials.</p>
      
      <p>While the ocean plastic crisis remains severe, the growing global response offers hope that with coordinated action across sectors, we can protect our marine ecosystems for future generations.</p>
    `
  },
  {
    id: 10,
    title: "Corporate Sustainability: Beyond Greenwashing",
    excerpt: "How leading companies are making genuine environmental commitments and transforming their operations to reduce waste.",
    date: "March 15, 2025",
    author: "Pepper Potts",
    category: "Business",
    imageUrl: "https://images.unsplash.com/photo-1507099985932-47b2e282b057?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>As consumers increasingly demand environmental responsibility from businesses, corporations are moving beyond superficial green marketing to implement substantive sustainability initiatives. This shift represents both a challenge and an opportunity for businesses navigating a changing economic landscape.</p>
      
      <h2>The Evolution of Corporate Sustainability</h2>
      <p>Corporate sustainability has evolved from basic compliance with environmental regulations to a strategic business imperative. What began as isolated environmental programs has matured into comprehensive approaches that integrate sustainability into core business operations and long-term planning.</p>
      
      <h2>Identifying Authentic Commitments</h2>
      <p>While greenwashing—making misleading environmental claims—remains prevalent, several indicators help distinguish genuine sustainability efforts:</p>
      <ul>
        <li>Science-based targets aligned with climate goals</li>
        <li>Independent verification and certification of claims</li>
        <li>Transparent reporting of environmental impacts, including negative aspects</li>
        <li>Integration of sustainability metrics into executive compensation</li>
        <li>Advocacy for stronger environmental policies</li>
      </ul>
      
      <h2>Zero Waste Manufacturing</h2>
      <p>Leading manufacturers are redesigning production systems to eliminate waste through:</p>
      <ul>
        <li>Circular production processes where outputs from one process become inputs for another</li>
        <li>Remanufacturing and refurbishment programs that extend product lifecycles</li>
        <li>Biomimicry-inspired design that emulates efficient natural systems</li>
        <li>Advanced materials recovery technologies that capture valuable resources from waste streams</li>
      </ul>
      
      <h2>Supply Chain Transformation</h2>
      <p>For many companies, the majority of environmental impacts occur in their supply chains. Progressive approaches include:</p>
      <ul>
        <li>Supplier codes of conduct with environmental requirements</li>
        <li>Capacity building programs that help suppliers implement sustainable practices</li>
        <li>Block chain and traceability systems that verify environmental claims</li>
        <li>Joint innovation projects to develop sustainable alternatives</li>
        <li>Preferential treatment for suppliers with strong environmental performance</li>
      </ul>
      
      <h2>Product Lifecycle Responsibility</h2>
      <p>Companies are increasingly taking responsibility for products throughout their entire lifecycle:</p>
      <ul>
        <li>Design for disassembly and recyclability</li>
        <li>Take-back programs that reclaim materials at end-of-life</li>
        <li>Product-as-service models that maintain company ownership of materials</li>
        <li>Packaging redesign to minimize waste</li>
      </ul>
      
      <h2>Renewable Energy Leadership</h2>
      <p>Corporate renewable energy purchases are driving the clean energy transition:</p>
      <ul>
        <li>Power purchase agreements (PPAs) that directly fund new renewable projects</li>
        <li>On-site generation through solar arrays and other technologies</li>
        <li>Virtual power purchase agreements that support renewables in strategic grid locations</li>
        <li>Community renewable energy projects that benefit both companies and local residents</li>
      </ul>
      
      <h2>Water Stewardship</h2>
      <p>Progressive companies are moving beyond basic water efficiency to comprehensive stewardship:</p>
      <ul>
        <li>Watershed-level conservation initiatives</li>
        <li>Community water access programs in water-stressed regions</li>
        <li>Water quality protection beyond regulatory requirements</li>
        <li>Collaborative governance approaches with other water users</li>
      </ul>
      
      <h2>Employee Engagement</h2>
      <p>Successful sustainability programs engage employees at all levels:</p>
      <ul>
        <li>Green teams that identify and implement workplace improvements</li>
        <li>Sustainability innovation challenges that source ideas from across the organization</li>
        <li>Training programs that build environmental literacy</li>
        <li>Employee benefits that encourage sustainable lifestyles</li>
      </ul>
      
      <h2>Transparency and Reporting</h2>
      <p>Meaningful corporate sustainability requires robust measurement and disclosure:</p>
      <ul>
        <li>Standardized frameworks like GRI, SASB, and TCFD that enable comparison across companies</li>
        <li>Real-time environmental dashboards accessible to stakeholders</li>
        <li>External assurance of environmental data</li>
        <li>Disclosure of both successes and challenges</li>
      </ul>
      
      <h2>The Business Case</h2>
      <p>Companies implementing authentic sustainability initiatives are realizing tangible business benefits:</p>
      <ul>
        <li>Cost savings from resource efficiency and waste reduction</li>
        <li>Risk mitigation related to regulatory changes and resource constraints</li>
        <li>Enhanced ability to attract and retain employees, particularly younger talent</li>
        <li>Strengthened relationships with customers and communities</li>
        <li>Access to growing markets for sustainable products and services</li>
      </ul>
      
      <p>As environmental challenges intensify, the distinction between sustainability leaders and laggards will likely become increasingly consequential for business success. The most forward-thinking companies recognize that genuine environmental responsibility isn't just about managing risks—it's about creating resilient business models suited for a resource-constrained future.</p>
    `
  },
  {
    id: 11,
    title: "Urban Agriculture: Growing Food in the City",
    excerpt: "How urban farming initiatives are creating sustainable food systems, reducing waste, and building community resilience.",
    date: "March 10, 2025",
    author: "Peter Parker",
    category: "Urban Planning",
    imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>As cities expand and food security concerns grow, urban agriculture is emerging as a powerful solution that brings food production back into metropolitan areas. From rooftop gardens to indoor vertical farms, these initiatives are transforming how city dwellers connect with their food while addressing multiple urban sustainability challenges.</p>
      
      <h2>The Renaissance of Urban Farming</h2>
      <p>While growing food in cities is not new—victory gardens during World War II produced up to 40% of America's vegetables—today's urban agriculture movement combines traditional practices with modern technology and design. What began as scattered community gardens has evolved into a sophisticated sector encompassing diverse growing methods and business models.</p>
      
      <h2>Forms of Urban Agriculture</h2>
      
      <h3>Community Gardens</h3>
      <p>These shared spaces allow residents to cultivate individual plots, building food skills and community connections. The American Community Gardening Association estimates there are now over 18,000 community gardens across North America, often transforming vacant lots into productive green spaces.</p>
      
      <h3>Rooftop Farms</h3>
      <p>Utilizing previously unused space, rooftop farms like Brooklyn Grange in New York City have converted acres of rooftop into productive farmland. These operations can grow thousands of pounds of produce annually while reducing building energy costs through improved insulation.</p>
      
      <h3>Vertical Farming</h3>
      <p>Using hydroponic or aeroponic systems in controlled indoor environments, vertical farms stack growing areas to maximize production in minimal space. Companies like AeroFarms and Plenty are scaling these operations to produce leafy greens year-round regardless of outdoor conditions.</p>
      
      <h3>Aquaponics</h3>
      <p>These systems combine aquaculture (raising aquatic animals) with hydroponics in a symbiotic environment where fish waste provides nutrients for plants, which in turn filter the water for the fish. Urban aquaponic systems produce both plant crops and protein in highly efficient closed-loop systems.</p>
      
      <h2>Environmental Benefits</h2>
      
      <h3>Reduced Food Transportation</h3>
      <p>The average food item in North America travels 1,500-2,500 miles from farm to plate. Urban agriculture dramatically shortens this distance, reducing transportation emissions and the need for excessive packaging and refrigeration.</p>
      
      <h3>Organic Waste Management</h3>
      <p>Urban farms often incorporate composting systems that transform city food waste into valuable growing medium. Projects like the NYC Compost Project divert thousands of tons of organic waste from landfills annually while creating soil for urban growing operations.</p>
      
      <h3>Biodiversity Support</h3>
      <p>Urban growing spaces provide habitat for pollinators and other beneficial species that struggle in concrete environments. Studies have found that urban gardens can support surprising levels of biodiversity, creating stepping-stone habitats across urban landscapes.</p>
      
      <h3>Stormwater Management</h3>
      <p>Green roofs and urban farms absorb rainwater that would otherwise become runoff, helping cities manage stormwater and reduce flooding risks. A typical green roof can capture 50-90% of rainfall, depending on depth and vegetation type.</p>
      
      <h2>Social and Economic Impacts</h2>
      
      <h3>Food Access Improvement</h3>
      <p>In neighborhoods classified as "food deserts," urban agriculture provides fresh produce where affordable, nutritious options are limited. Projects like Grow Dat Youth Farm in New Orleans explicitly target underserved communities, distributing a portion of their harvest to those in need.</p>
      
      <h3>Job Creation and Skills Development</h3>
      <p>Urban agriculture creates green jobs and training opportunities across experience levels. Organizations like Growing Power have developed workforce development programs that teach agricultural and business skills in urban contexts.</p>
      
      <h3>Community Building</h3>
      <p>Urban growing spaces function as community hubs that bring together diverse residents around the universal language of food. Research has documented reduced crime rates, increased property values, and strengthened social cohesion in neighborhoods with active community gardens.</p>
      
      <h2>Policy Support and Barriers</h2>
      <p>Cities are increasingly implementing policies to support urban agriculture:</p>
      <ul>
        <li>Zoning changes that explicitly allow agricultural activities</li>
        <li>Tax incentives for property owners who convert vacant land to urban farms</li>
        <li>Water rate adjustments for agricultural users</li>
        <li>Grant programs for startup urban farming initiatives</li>
        <li>Integration of urban agriculture into climate action plans</li>
      </ul>
      
      <p>However, challenges remain, including:</p>
      <ul>
        <li>Limited access to secure land tenure</li>
        <li>Soil contamination concerns in industrial cities</li>
        <li>Water access and cost issues</li>
        <li>Restrictive regulations designed for rural agriculture</li>
        <li>Competition with developers for valuable urban land</li>
      </ul>
      
      <h2>The Future of Urban Growing</h2>
      <p>The urban agriculture sector continues to innovate, with emerging directions including:</p>
      <ul>
        <li>Integration of food production into architectural designs for new buildings</li>
        <li>Advanced technology applications including AI-controlled growing systems</li>
        <li>Expansion beyond vegetables to urban agroforestry and perennial food systems</li>
        <li>Development of hybrid models that combine production with education and community services</li>
        <li>Policy frameworks that recognize and compensate urban farms for their ecosystem services</li>
      </ul>
      
      <p>While urban agriculture alone cannot feed entire cities, it represents a vital component of resilient local food systems. By producing food where people live, these initiatives reconnect urban dwellers with their food sources while addressing multiple sustainability challenges facing modern cities.</p>
    `
  },
  {
    id: 12,
    title: "Microplastics: The Invisible Threat",
    excerpt: "Understanding the growing environmental and health concerns surrounding microplastics and what can be done to address them.",
    date: "March 5, 2025",
    author: "Barbara Gordon",
    category: "Environmental Health",
    imageUrl: "https://images.unsplash.com/photo-1621451305624-272c586b87de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>As plastic pollution has gained recognition as a global environmental crisis, scientists are increasingly concerned about its smallest components: microplastics. These tiny particles, less than 5mm in size, have infiltrated virtually every environment on Earth with potential consequences that researchers are only beginning to understand.</p>
      
      <h2>What Are Microplastics?</h2>
      <p>Microplastics fall into two categories:</p>
      <ul>
        <li><strong>Primary microplastics</strong> are manufactured at a microscopic size, including microbeads in personal care products, pre-production plastic pellets (nurdles), and microfibers shed from synthetic textiles.</li>
        <li><strong>Secondary microplastics</strong> result from the breakdown of larger plastic items through weathering, UV exposure, and physical abrasion. These include fragments from bottles, bags, and other plastic waste.</li>
      </ul>
      
      <h2>Environmental Ubiquity</h2>
      <p>The extent of microplastic contamination has shocked scientists as research reveals their presence in:</p>
      <ul>
        <li>The deepest ocean trenches (Mariana Trench samples containing 2,200 microplastic pieces per liter)</li>
        <li>Arctic and Antarctic sea ice</li>
        <li>Remote mountain ranges and wilderness areas</li>
        <li>Atmospheric fallout (an estimated 1,000 to 3,000 tons of microplastic rains down on protected areas in the western US annually)</li>
        <li>Drinking water sources (studies have found microplastics in 94% of tap water samples in the US)</li>
        <li>Agricultural soils (particularly where sewage sludge is used as fertilizer)</li>
      </ul>
      
      <h2>Food Chain Infiltration</h2>
      <p>Microplastics have entered the food web at multiple points:</p>
      <ul>
        <li>Filter-feeding marine organisms like oysters and mussels can contain hundreds of microplastic particles</li>
        <li>Fish across commercial species have been found with microplastics in their digestive tracts</li>
        <li>Agricultural crops can absorb nanoplastics through their root systems</li>
        <li>Several studies have detected microplastics in commercial salt, honey, beer, and bottled water</li>
      </ul>
      
      <h2>Health Concerns</h2>
      <p>Research into human health impacts is still developing, but scientists have identified several potential concerns:</p>
      
      <h3>Physical Effects</h3>
      <p>In marine animals, microplastic ingestion has been linked to reduced feeding, energy depletion, and physical injury. Similar physical effects could potentially occur in human tissues, particularly with the smallest particles that might cross cellular barriers.</p>
      
      <h3>Chemical Exposure</h3>
      <p>Microplastics can contain and absorb a range of chemical compounds:</p>
      <ul>
        <li>Additives from manufacturing, including plasticizers, flame retardants, and stabilizers, many with known health effects</li>
        <li>Persistent organic pollutants from the surrounding environment that accumulate on plastic surfaces</li>
        <li>Heavy metals that adhere to plastic particles</li>
      </ul>
      
      <h3>Microbial Interactions</h3>
      <p>Research has shown that microplastics can develop distinct microbial communities, potentially serving as vectors for pathogens or altering microbiomes in affected organisms.</p>
      
      <h2>Major Sources</h2>
      <p>Understanding where microplastics originate is crucial for developing effective solutions:</p>
      
      <h3>Synthetic Textiles</h3>
      <p>A single load of laundry containing synthetic fabrics can release thousands of microfibers. These particles are often too small to be captured by wastewater treatment and enter waterways.</p>
      
      <h3>Vehicle Tires</h3>
      <p>Tire wear particles constitute a significant portion of microplastics in urban environments. An average car tire loses 4kg of material during its lifetime, much of which becomes microplastic pollution in roadside environments and waterways.</p>
      
      <h3>Plastic Waste Fragmentation</h3>
      <p>Improperly managed plastic waste continues to break down into progressively smaller pieces in the environment, creating a long-term source of microplastics.</p>
      
      <h3>Cosmetics and Personal Care</h3>
      <p>Though many countries have banned microbeads in rinse-off products, they remain in some cosmetics, and previously released particles persist in the environment.</p>
      
      <h2>Solutions and Mitigation</h2>
      
      <h3>Source Reduction</h3>
      <p>The most effective approaches address microplastics at their source:</p>
      <ul>
        <li>Textile innovations like fiber coatings that reduce shedding and fabrics designed for durability</li>
        <li>Advanced filters for washing machines that capture microfibers</li>
        <li>Alternative materials for high-shedding applications like tire manufacturing</li>
        <li>Extended producer responsibility policies that require companies to address full lifecycle impacts</li>
      </ul>
      
      <h3>Wastewater Treatment</h3>
      <p>Enhancing treatment facilities to better capture microplastics can prevent them from entering waterways:</p>
      <ul>
        <li>Membrane bioreactors that filter out particles down to 0.1 microns</li>
        <li>Advanced tertiary treatment processes specifically targeting microplastics</li>
        <li>Responsible management of sewage sludge to prevent contamination of agricultural land</li>
      </ul>
      
      <h3>Consumer Actions</h3>
      <p>Individual choices can help reduce microplastic generation:</p>
      <ul>
        <li>Selecting natural fiber clothing and textiles</li>
        <li>Using front-loading washing machines, which typically release fewer microfibers than top-loaders</li>
        <li>Installing aftermarket filters on washing machines</li>
        <li>Reducing vehicle miles traveled and proper tire maintenance</li>
        <li>Avoiding personal care products with plastic ingredients (looking for "polyethylene" and "polypropylene" on labels)</li>
      </ul>
      
      <h2>Research Frontiers</h2>
      <p>The science of microplastics is rapidly evolving, with critical research needs including:</p>
      <ul>
        <li>Standardized methods for sampling and analyzing microplastics across environments</li>
        <li>Long-term studies on human health impacts, particularly for nanoplastics (particles smaller than 1 micron)</li>
        <li>Ecological effects at population and ecosystem levels</li>
        <li>Effective remediation approaches for already contaminated environments</li>
        <li>Biodegradation processes and timeframes for different microplastic types</li>
      </ul>
      
      <p>Unlike many environmental contaminants that break down over time, microplastics are persistent and continuing to accumulate. Addressing this invisible but pervasive form of pollution will require coordinated action across industries, governments, and individuals to fundamentally rethink our relationship with plastic materials.</p>
    `
  }
];

// Blog component
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
