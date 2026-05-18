import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu as MenuIcon, 
  X, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter, 
  ChevronRight,
  Star,
  Quote,
  ChefHat,
  Users,
  Award
} from "lucide-react";

// Types
const FORMSPREE_URL = "https://formspree.io/f/mqejzvan";

interface Dish {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: "Starters" | "Main Course" | "Desserts" | "Drinks";
}

const MENU_DATA: Dish[] = [
  {
    id: 1,
    name: "Murgh Malai Tikka",
    price: "₹380",
    description: "Creamy cardamom flavored boneless chicken pieces grilled in tandoor.",
    image: "/images/tandoori_platter_luxury_1779032250699.png",
    category: "Starters"
  },
  {
    id: 2,
    name: "Signature Butter Chicken",
    price: "₹450",
    description: "Tandoori chicken pieces cooked in a rich, creamy tomato gravy with butter.",
    image: "/images/butter_chicken_closeup_1779032226910.png",
    category: "Main Course"
  },
  {
    id: 3,
    name: "Dum Pukht Biryani",
    price: "₹420",
    description: "Aromatic long-grain basmati rice cooked with succulent lamb and spices.",
    image: "/images/hero_biryani_spread_1779032196157.png",
    category: "Main Course"
  },
  {
    id: 4,
    name: "Paneer Lababdar",
    price: "₹360",
    description: "Cottage cheese cubes tossed in a luscious tomato and onion gravy.",
    image: "/images/butter_chicken_closeup_1779032226910.png",
    category: "Main Course"
  },
  {
    id: 5,
    name: "Saffron Shahi Tukda",
    price: "₹220",
    description: "Royal bread pudding soaked in saffron-infused milk and dry fruits.",
    image: "/images/gulab_jamun_luxury_1779032267035.png",
    category: "Desserts"
  },
  {
    id: 6,
    name: "Gulab Jamun with Rabri",
    price: "₹180",
    description: "Classic Indian milk-based sweets served with thick condensed milk.",
    image: "/images/gulab_jamun_luxury_1779032267035.png",
    category: "Desserts"
  }
];

// Shared Components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tighter text-white">
          INDIAN <span className="text-gold">TASTE</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "text-gold" : ""}`}>Home</Link>
          <Link to="/menu" className={`nav-link ${location.pathname === "/menu" ? "text-gold" : ""}`}>Menu</Link>
          <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "text-gold" : ""}`}>About</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === "/contact" ? "text-gold" : ""}`}>Contact</Link>
          <Link to="/reserve" className="btn-gold !py-2">Reserve</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-charcoal border-b border-gold/20 p-6 flex flex-col space-y-6"
          >
            <Link to="/" onClick={() => setIsOpen(false)} className="nav-link text-center text-lg">Home</Link>
            <Link to="/menu" onClick={() => setIsOpen(false)} className="nav-link text-center text-lg">Menu</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="nav-link text-center text-lg">About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="nav-link text-center text-lg">Contact</Link>
            <Link to="/reserve" onClick={() => setIsOpen(false)} className="btn-gold text-center">Reserve a Table</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-charcoal pt-20 pb-10 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-6">
        <h3 className="text-2xl font-serif font-bold italic">Indian <span className="text-gold">Taste</span></h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Bringing the royal flavors of India to the heart of Akola. Our chefs use traditional techniques to create unforgettable culinary journeys.
        </p>
        <div className="flex space-x-4">
          <Instagram className="text-gray-400 hover:text-gold cursor-pointer transition-colors" size={20} />
          <Facebook className="text-gray-400 hover:text-gold cursor-pointer transition-colors" size={20} />
          <Twitter className="text-gray-400 hover:text-gold cursor-pointer transition-colors" size={20} />
        </div>
      </div>

      <div>
        <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">Quick Links</h4>
        <ul className="space-y-4 text-sm text-gray-400">
          <li><Link to="/menu" className="hover:text-white transition-colors">Full Menu</Link></li>
          <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
          <li><Link to="/reserve" className="hover:text-white transition-colors">Book a Table</Link></li>
          <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">Contact</h4>
        <ul className="space-y-4 text-sm text-gray-400">
          <li className="flex items-start space-x-3">
            <MapPin size={16} className="text-gold mt-1 shrink-0" />
            <span>Murtizapur Road, Near Khandelwal Bhavan, Akola, Maharashtra 444001</span>
          </li>
          <li className="flex items-center space-x-3">
            <Phone size={16} className="text-gold shrink-0" />
            <span>+91 98765 43210</span>
          </li>
          <li className="flex items-center space-x-3">
            <Clock size={16} className="text-gold shrink-0" />
            <span>Mon-Sun: 11:00 AM - 11:00 PM</span>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">Newsletter</h4>
        <p className="text-gray-400 text-sm mb-4">Subscribe for special offers.</p>
        <form 
          action={FORMSPREE_URL}
          method="POST"
          className="flex border border-white/10 p-1"
        >
          <input 
            type="email" 
            name="email"
            required
            placeholder="Email Address" 
            className="bg-transparent border-none text-sm px-3 py-2 focus:ring-0 w-full" 
          />
          <button type="submit" className="bg-gold text-dark px-3 py-2 text-xs font-bold uppercase">Join</button>
        </form>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center text-gray-500 text-xs tracking-widest flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <p>&copy; 2026 INDIAN TASTE RESTAURANT. ALL RIGHTS RESERVED.</p>
      <p>DESIGNED FOR AUTHENTICITY.</p>
    </div>
  </footer>
);

// Pages
const Home = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_biryani_spread_1779032196157.png" 
            className="w-full h-full object-cover opacity-60 scale-105"
            alt="Indian Feast"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-6"
          >
            Experience the Royal Cuisine
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight italic"
          >
            Authentic Indian Flavors <br /> 
            <span className="not-italic font-sans font-bold text-white/90">in the Heart of Akola</span>
          </motion.h1>
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.5 }}
             className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6"
          >
            <Link to="/reserve" className="btn-gold w-full md:w-auto">Reserve a Table</Link>
            <Link to="/menu" className="btn-outline-gold w-full md:w-auto">View Menu</Link>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative"
          >
            <img 
              src="/images/restaurant_interior_luxury_1779032210963.png" 
              className="w-full aspect-square object-cover"
              alt="Interior"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 hidden md:block w-64 h-64 border-8 border-gold/20"></div>
          </motion.div>
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="space-y-8"
          >
            <span className="text-gold uppercase tracking-widest text-xs font-bold">Our Philosophy</span>
            <h2 className="section-title italic">Traditionally Crafted, <br />Modernly Presented</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              At Indian Taste, we believe food is a celebration of heritage. From the robust spices of North India to the delicate aromatics of the South, our menu is a curated journey through the subcontinent.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-2">
                <ChefHat className="text-gold" />
                <h4 className="font-bold">Expert Chefs</h4>
                <p className="text-gray-500 text-sm">Mastering ancestral recipes with a modern twist.</p>
              </div>
              <div className="space-y-2">
                <Award className="text-gold" />
                <h4 className="font-bold">Local Sourcing</h4>
                <p className="text-gray-500 text-sm">Supporting Akola's farmers for the freshest ingredients.</p>
              </div>
            </div>
            <Link to="/about" className="inline-flex items-center text-gold text-sm font-bold uppercase tracking-widest hover:translate-x-2 transition-transform pt-4">
              Learn More About Us <ChevronRight size={16} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <span className="text-gold uppercase tracking-widest text-xs font-bold">Chef's Recommendations</span>
          <h2 className="section-title italic">Featured Delicacies</h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {MENU_DATA.slice(0, 3).map((dish, idx) => (
            <motion.div 
              key={dish.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card-glass group overflow-hidden"
            >
              <div className="h-72 overflow-hidden">
                <img 
                  src={dish.image} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="font-serif text-2xl mb-2 italic">{dish.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{dish.description}</p>
                <p className="text-gold font-bold text-xl">{dish.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link to="/menu" className="btn-outline-gold">View Full Menu</Link>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <span className="text-gold uppercase tracking-widest text-xs font-bold">Visual Journey</span>
          <h2 className="section-title italic">Captured Moments</h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "/images/hero_biryani_spread_1779032196157.png",
            "/images/restaurant_interior_luxury_1779032210963.png",
            "/images/butter_chicken_closeup_1779032226910.png",
            "/images/tandoori_platter_luxury_1779032250699.png",
            "/images/gulab_jamun_luxury_1779032267035.png",
            "/images/hero_biryani_spread_1779032196157.png",
            "/images/restaurant_interior_luxury_1779032210963.png",
            "/images/butter_chicken_closeup_1779032226910.png",
          ].map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="aspect-square overflow-hidden group border border-white/5"
            >
              <img 
                src={img} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110" 
                alt={`Gallery ${idx}`}
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-dark overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <Quote size={60} className="text-gold/10 mx-auto mb-8 absolute top-20 left-1/2 -translate-x-1/2 z-0" />
           <div className="relative z-10">
             <div className="flex justify-center space-x-1 mb-6">
               {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#D4AF37" className="text-gold" />)}
             </div>
             <p className="font-serif text-2xl md:text-3xl italic leading-relaxed mb-10">
               "The best Butter Chicken I've had outside of Delhi. The ambiance is sophisticated, and the service in Akola was top-notch. Highly recommended for special occasions!"
             </p>
             <h4 className="font-bold tracking-widest uppercase text-sm">Rahul Deshmukh</h4>
             <p className="text-gray-500 text-xs mt-2 uppercase">Local Foodie</p>
           </div>
        </div>
      </section>

      {/* CTA Reservation */}
      <section className="py-24 bg-charcoal border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
          <h2 className="section-title italic">Reserve Your Experience</h2>
          <p className="text-gray-400 text-lg">
            Join us for an evening of exquisite dining and unparalleled hospitality. Tables fill up quickly, especially on weekends.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <Link to="/reserve" className="btn-gold">Book a Table Now</Link>
            <Link to="/contact" className="btn-outline-gold">Get Directions</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<"All" | Dish['category']>("All");
  
  const filteredMenu = activeCategory === "All" 
    ? MENU_DATA 
    : MENU_DATA.filter(d => d.category === activeCategory);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-20">
          <span className="text-gold uppercase tracking-widest text-xs font-bold">Curated Selections</span>
          <h1 className="section-title italic">Our Royal Menu</h1>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {["All", "Starters", "Main Course", "Desserts", "Drinks"].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`text-xs uppercase tracking-widest font-bold px-6 py-2 transition-all border ${activeCategory === cat ? "border-gold text-gold bg-gold/5" : "border-white/10 text-gray-400 hover:border-white/30"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {filteredMenu.map(dish => (
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={dish.id} 
              className="flex flex-col md:flex-row gap-6 group"
            >
              <div className="w-full md:w-32 h-32 overflow-hidden shrink-0">
                <img src={dish.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={dish.name} referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-xl italic">{dish.name}</h3>
                  <span className="text-gold font-bold">{dish.price}</span>
                </div>
                <div className="h-px w-full bg-white/5 my-2"></div>
                <p className="text-gray-500 text-sm leading-relaxed">{dish.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1"
        >
          <img src="/images/restaurant_interior_luxury_1779032210963.png" className="w-full aspect-[4/5] object-cover" alt="About" referrerPolicy="no-referrer" />
        </motion.div>
        <div className="space-y-10 order-1 lg:order-2">
          <span className="text-gold uppercase tracking-widest text-xs font-bold">The Journey</span>
          <h1 className="section-title italic">From a Dream to Akola's Culinary Landmark</h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Founded in 2024, Indian Taste was born from a desire to bring the sophisticated restaurant culture of metros to Akola. We realized that while authentic flavors exist, the "experience" was missing.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Our founder, a native of Akola who traveled the world, wanted to create a space where families could celebrate, businesses could meet, and food lovers could indulge in the finest Indian recipes served with global standards.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-6 text-center">
            <div>
              <p className="text-3xl font-serif text-gold mb-1">15+</p>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Master Chefs</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-gold mb-1">120+</p>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Dishes</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-gold mb-1">5k+</p>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Happy Guests</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-charcoal p-12 md:p-20 text-center mb-32 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <ChefHat size={40} className="text-gold mx-auto" />
          <h2 className="section-title italic">Our Modern Kitchen</h2>
          <p className="text-gray-400 text-lg">
            We follow strict hygiene protocols and use state-of-the-art equipment to ensure that every dish served is not just delicious but of the highest safety standards. Our open-show kitchen allows you to witness the artistry of our chefs.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<{message: string, type: 'success' | 'error' | null}>({message: "", type: null});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({message: "", type: null});

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus({ message: "Thank you for your message. We will get back to you shortly!", type: 'success' });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ message: "Something went wrong. Please try again.", type: 'error' });
      }
    } catch (err) {
      setStatus({ message: "Network error. Please try again later.", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold uppercase tracking-widest text-xs font-bold">Get In Touch</span>
          <h1 className="section-title italic">Locate & Inquiry</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="card-glass p-10 space-y-8">
            <h3 className="font-serif text-2xl italic mb-4">Contact Info</h3>
            <div className="flex items-start space-x-4">
              <MapPin className="text-gold shrink-0 mt-1" size={20} />
              <div className="space-y-1">
                <p className="font-bold text-sm uppercase tracking-widest">Address</p>
                <p className="text-gray-400 text-sm">Murtizapur Road, Near Khandelwal Bhavan, Akola, Maharashtra 444001</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="text-gold shrink-0 mt-1" size={20} />
              <div className="space-y-1">
                <p className="font-bold text-sm uppercase tracking-widest">Phone</p>
                <p className="text-gray-400 text-sm">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Clock className="text-gold shrink-0 mt-1" size={20} />
              <div className="space-y-1">
                <p className="font-bold text-sm uppercase tracking-widest">Hours</p>
                <p className="text-gray-400 text-sm">Lunch: 11:30 - 15:30</p>
                <p className="text-gray-400 text-sm">Dinner: 19:00 - 23:00</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 card-glass p-8 md:p-10">
            <h3 className="font-serif text-2xl italic mb-6">Send an Inquiry</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-gold focus:ring-0 outline-none transition-all"
                  placeholder="Ex. Rahul Deshmukh"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-gold focus:ring-0 outline-none transition-all"
                  placeholder="rahul@example.com"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Subject</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-gold focus:ring-0 outline-none transition-all"
                  placeholder="Ex. Event Booking"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Message</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-gold focus:ring-0 outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <div className="md:col-span-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`btn-gold w-full py-4 ${loading ? "opacity-50" : ""}`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
              {status.message && (
                <div className={`md:col-span-2 p-4 text-center text-sm font-bold uppercase tracking-widest border ${status.type === 'success' ? "border-green-500/50 bg-green-500/10 text-green-500" : "border-red-500/50 bg-red-500/10 text-red-500"}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 relative h-[400px] border border-white/5 group overflow-hidden">
          <div className="absolute inset-0 bg-charcoal flex flex-col items-center justify-center space-y-4">
             <div className="absolute inset-0 grayscale opacity-20 bg-[url('/images/restaurant_interior_luxury_1779032210963.png')] bg-cover bg-center"></div>
             <div className="relative z-10 text-center">
                <MapPin className="text-gold mx-auto mb-2 animate-bounce" size={32} />
                <p className="text-white font-bold tracking-widest text-sm text-shadow">INDIAN TASTE AKOLA</p>
                <p className="text-gray-200 text-xs mt-1 text-shadow">Visit us today for an authentic experience</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReservePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    guests: "2",
    phone: ""
  });
  const [status, setStatus] = useState<{message: string, type: 'success' | 'error' | null}>({message: "", type: null});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({message: "", type: null});

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus({ message: "Reservation request received! We will confirm your table shortly.", type: 'success' });
        setFormData({ name: "", date: "", time: "", guests: "2", phone: "" });
      } else {
        setStatus({ message: "Something went wrong. Please try again.", type: 'error' });
      }
    } catch (err) {
      setStatus({ message: "Network error. Please try again later.", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-10">
          <span className="text-gold uppercase tracking-widest text-xs font-bold">Booking</span>
          <h1 className="section-title italic">Reserve Your Royal Table</h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Whether it's an intimate dinner for two or a grand celebration with the family, we ensure every detail is perfected.
          </p>
          <div className="space-y-6 pt-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center">
                <ChefHat size={18} className="text-gold" />
              </div>
              <div>
                 <p className="font-bold text-sm uppercase">Custom Menus</p>
                 <p className="text-gray-500 text-sm">Available for bookings over 10 guests.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center">
                <Award size={18} className="text-gold" />
              </div>
              <div>
                 <p className="font-bold text-sm uppercase">Vip Experience</p>
                 <p className="text-gray-500 text-sm">Quiet corners for business or privacy.</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Full Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-gold focus:ring-0 outline-none transition-all"
                placeholder="Ex. Rahul Kulkarni"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-gold focus:ring-0 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Time</label>
                <input 
                  type="time" 
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-gold focus:ring-0 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Guests</label>
                <select 
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-gold focus:ring-0 outline-none transition-all"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons</option>
                  <option value="5">5+ Persons</option>
                  <option value="10">Private Event (10+)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Phone</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-gold focus:ring-0 outline-none transition-all"
                  placeholder="+91 ...."
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full btn-gold py-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Confirming..." : "Confirm Reservation"}
            </button>

            {status.message && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className={`p-4 text-sm text-center font-bold uppercase tracking-widest border ${status.type === 'success' ? "border-green-500/50 bg-green-500/10 text-green-500" : "border-red-500/50 bg-red-500/10 text-red-500"}`}
              >
                {status.message}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}

// Main App
export default function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-dark overflow-x-hidden">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/reserve" element={<ReservePage />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Floating Order Button (Optional as requested) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-8 right-8 z-40 hidden md:block"
        >
          <a href="/menu" className="bg-gold text-dark p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group relative">
            <ChefHat size={24} />
            <span className="absolute right-full mr-4 bg-dark text-gold border border-gold/30 px-3 py-1 text-[10px] whitespace-nowrap uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Order Online</span>
          </a>
        </motion.div>
      </div>
    </Router>
  );
}
