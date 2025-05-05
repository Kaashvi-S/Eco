import React, { useState } from 'react';
import { Bus, Bike, Train, Utensils, Home, Leaf, Recycle, MapPin, Check, Lightbulb, Laptop, Smartphone, Monitor, Tv, Coffee, WashingMachine, Medal, Trophy, Target, Star, ExternalLink, ShoppingBag, Filter, MessageSquare, Send, ThumbsUp, ArrowRight, Plus, Minus, Crown, Award } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface Activity {
  type: string;
  value: number;
  unit: string;
  co2PerUnit: number;
}

interface RecyclingCenter {
  name: string;
  address: string;
  hours: string;
  materials: string[];
  mapsUrl: string;
}

interface EcoStore {
  name: string;
  type: string[];
  address: string;
  description: string;
  website: string;
  features: string[];
}

interface ForumPost {
  id: number;
  author: string;
  content: string;
  likes: number;
  timestamp: Date;
  comments: ForumComment[];
}

interface ForumComment {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
}

interface ElectricityUsage {
  device: string;
  powerRating: number;
  hoursUsed: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  points: number;
  unlocked: boolean;
  progress: number;
  target: number;
}

interface SustainabilityProgram {
  id: string;
  name: string;
  organization: string;
  description: string;
  points: number;
  website: string;
  startDate: Date;
  location: string;
}

interface LeaderboardEntry {
  username: string;
  points: number;
  achievements: number;
  topBadge: string;
}

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStartedTracking, setHasStartedTracking] = useState(false);

  const handleStartTracking = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setShowDashboard(true);
    }, 1000);
  };

  const [electricityUsage, setElectricityUsage] = useState<ElectricityUsage[]>([
    { device: 'Laptop', powerRating: 50, hoursUsed: 0 },
    { device: 'Smartphone Charging', powerRating: 5, hoursUsed: 0 },
    { device: 'Desktop/Monitor', powerRating: 150, hoursUsed: 0 },
    { device: 'TV', powerRating: 100, hoursUsed: 0 },
    { device: 'Coffee Machine', powerRating: 1000, hoursUsed: 0 },
    { device: 'Washing Machine', powerRating: 500, hoursUsed: 0 },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    { type: 'bus', value: 0, unit: 'trips', co2PerUnit: 0.089 },
    { type: 'bike', value: 0, unit: 'km', co2PerUnit: 0 },
    { type: 'train', value: 0, unit: 'trips', co2PerUnit: 0.041 },
    { type: 'vegetarian', value: 0, unit: 'meals', co2PerUnit: 0.5 },
    { type: 'meat', value: 0, unit: 'meals', co2PerUnit: 3.6 },
  ]);

  const [userPoints, setUserPoints] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [newPost, setNewPost] = useState('');

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'bike-master',
      title: 'Bike Master',
      description: 'Complete 50km of bike rides',
      icon: <Bike className="w-6 h-6" />,
      points: 100,
      unlocked: false,
      progress: 0,
      target: 50
    },
    {
      id: 'veggie-champion',
      title: 'Veggie Champion',
      description: 'Choose 20 vegetarian meals',
      icon: <Utensils className="w-6 h-6" />,
      points: 150,
      unlocked: false,
      progress: 0,
      target: 20
    },
    {
      id: 'energy-saver',
      title: 'Energy Saver',
      description: 'Keep daily electricity usage under 2 kWh for a week',
      icon: <Lightbulb className="w-6 h-6" />,
      points: 200,
      unlocked: false,
      progress: 0,
      target: 7
    },
  ]);

  const sustainabilityPrograms: SustainabilityProgram[] = [
    {
      id: 'amsterdam-clean',
      name: 'Amsterdam Clean Week',
      organization: 'Municipality of Amsterdam',
      description: 'Join the city-wide cleanup initiative and earn eco-points',
      points: 250,
      website: 'https://www.amsterdam.nl/sustainability',
      startDate: new Date(2024, 3, 15),
      location: 'Various locations in Amsterdam'
    },
    {
      id: 'uva-green',
      name: 'UvA Green Campus',
      organization: 'University of Amsterdam',
      description: 'Participate in campus sustainability projects',
      points: 150,
      website: 'https://www.uva.nl/sustainability',
      startDate: new Date(2024, 3, 1),
      location: 'UvA Science Park'
    },
    {
      id: 'zero-waste',
      name: 'Zero Waste Challenge',
      organization: 'Amsterdam Environment',
      description: '30-day challenge to minimize waste',
      points: 300,
      website: 'https://www.amsterdam.nl/zerowaste',
      startDate: new Date(2024, 4, 1),
      location: 'City-wide'
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    { username: "Sarah Johnson", points: 3250, achievements: 12, topBadge: "Sustainability Champion" },
    { username: "Thomas van der Berg", points: 2980, achievements: 11, topBadge: "Bike Master" },
    { username: "Maria Santos", points: 2840, achievements: 10, topBadge: "Energy Saver" },
    { username: "David Chen", points: 2750, achievements: 9, topBadge: "Public Transport Pro" },
    { username: "Anna Kowalski", points: 2680, achievements: 9, topBadge: "Veggie Champion" },
    { username: "Lucas Martinez", points: 2590, achievements: 8, topBadge: "Zero Waste Pioneer" },
    { username: "Emma Nielsen", points: 2520, achievements: 8, topBadge: "Urban Gardener" },
    { username: "Michael O'Connor", points: 2470, achievements: 7, topBadge: "Energy Saver" },
    { username: "Sofia Patel", points: 2420, achievements: 7, topBadge: "Bike Master" },
    { username: "Jan de Vries", points: 2380, achievements: 7, topBadge: "Public Transport Pro" }
  ];

  const recyclingCenters: RecyclingCenter[] = [
    {
      name: "Recycling Center Zuid",
      address: "Henk Sneevlietweg 22, 1066 VH Amsterdam",
      hours: "Mon-Sat: 08:00-17:00",
      materials: ["Paper", "Glass", "Plastic", "Electronics", "Batteries"],
      mapsUrl: "https://maps.google.com/?q=Henk+Sneevlietweg+22+Amsterdam"
    },
    {
      name: "Recyclepunt Oost",
      address: "Rozenburglaan 1, 1097 GA Amsterdam",
      hours: "Mon-Sat: 09:00-17:00",
      materials: ["Paper", "Glass", "Plastic", "Metal", "Textiles"],
      mapsUrl: "https://maps.google.com/?q=Rozenburglaan+1+Amsterdam"
    },
    {
      name: "Milieupunt West",
      address: "Jan van Galenstraat 10, 1051 KM Amsterdam",
      hours: "Mon-Fri: 08:30-16:30",
      materials: ["Paper", "Glass", "Plastic", "Chemicals", "Large Items"],
      mapsUrl: "https://maps.google.com/?q=Jan+van+Galenstraat+10+Amsterdam"
    }
  ];

  const ecoStores: EcoStore[] = [
    {
      name: "Little Plant Pantry",
      type: ["Zero-waste", "Organic", "Vegan"],
      address: "Bilderdijkstraat 165H, 1053 KP Amsterdam",
      description: "Zero-waste store with organic pantry items, personal care products, and household goods.",
      website: "https://www.littleplantpantry.com",
      features: ["Bulk shopping", "Plastic-free", "Local products", "Bring your own containers"]
    },
    {
      name: "Ekoplaza",
      type: ["Organic", "Supermarket"],
      address: "Multiple locations in Amsterdam",
      description: "Organic supermarket chain with a wide range of sustainable products.",
      website: "https://www.ekoplaza.nl",
      features: ["Organic certified", "Local products", "Sustainable packaging"]
    },
    {
      name: "Package Free Shop",
      type: ["Zero-waste", "Personal Care"],
      address: "Van Woustraat 135, 1074 AJ Amsterdam",
      description: "Zero-waste shop specializing in personal care and household items.",
      website: "https://www.packagefreeshop.amsterdam",
      features: ["Plastic-free", "Refill station", "Sustainable fashion", "Natural cosmetics"]
    }
  ];

  const initialForumPosts: ForumPost[] = [
    {
      id: 1,
      author: "Sarah Johnson",
      content: "Just switched to a fully plant-based diet this month and already saved 45kg of CO2! The new vegan place on Overtoom has amazing lunch options 🌱",
      likes: 124,
      timestamp: new Date(2024, 2, 28, 14, 30),
      comments: [
        {
          id: 1,
          author: "Maria Santos",
          content: "That's amazing! Could you share some of your favorite recipes? I'm trying to reduce my meat consumption too.",
          timestamp: new Date(2024, 2, 28, 14, 45)
        },
        {
          id: 2,
          author: "Sarah Johnson",
          content: "Of course! I've been loving chickpea curry and mushroom risotto. The key is getting good spices!",
          timestamp: new Date(2024, 2, 28, 15, 0)
        },
        {
          id: 3,
          author: "Anna Kowalski",
          content: "The tofu scramble at that place is incredible! Have you tried their weekend brunch menu?",
          timestamp: new Date(2024, 2, 28, 15, 15)
        },
        {
          id: 4,
          author: "David Chen",
          content: "Would love to join for lunch sometime! Always looking for new sustainable spots.",
          timestamp: new Date(2024, 2, 28, 15, 30)
        }
      ]
    },
    {
      id: 2,
      author: "Thomas van der Berg",
      content: "Our neighborhood just started a community composting project! Already collected 50kg of food waste this week. DM if you want to join! 🌱♻️",
      likes: 89,
      timestamp: new Date(2024, 2, 28, 10, 15),
      comments: [
        {
          id: 1,
          author: "Sofia Patel",
          content: "This is exactly what our street needs! Can you share more details about how you got started?",
          timestamp: new Date(2024, 2, 28, 10, 30)
        },
        {
          id: 2,
          author: "Thomas van der Berg",
          content: "We got permission from the gemeente and set up three bins behind the community center. Happy to help other neighborhoods get started!",
          timestamp: new Date(2024, 2, 28, 10, 45)
        },
        {
          id: 3,
          author: "Jan de Vries",
          content: "The compost has been great for our community garden too! The tomatoes are thriving 🍅",
          timestamp: new Date(2024, 2, 28, 11, 0)
        }
      ]
    },
    {
      id: 3,
      author: "Emma Nielsen",
      content: "Big milestone: 1000km on my bike this year! Saved €120 on transport and 200kg CO2. The new bike paths along the Amstel are amazing 🚲",
      likes: 156,
      timestamp: new Date(2024, 2, 28, 8, 45),
      comments: [
        {
          id: 1,
          author: "Michael O'Connor",
          content: "That's impressive! Any tips for biking in the rain? Still getting used to Dutch weather 😅",
          timestamp: new Date(2024, 2, 28, 9, 0)
        },
        {
          id: 2,
          author: "Emma Nielsen",
          content: "Good rain gear is essential! I got mine from the sustainable sports shop on Kinkerstraat. Total game changer!",
          timestamp: new Date(2024, 2, 28, 9, 15)
        },
        {
          id: 3,
          author: "Lucas Martinez",
          content: "The new route is so scenic! Perfect for morning commutes. Anyone up for a group ride this weekend?",
          timestamp: new Date(2024, 2, 28, 9, 30)
        }
      ]
    },
    {
      id: 4,
      author: "Maria Santos",
      content: "Just installed a smart thermostat and solar panels! Electricity bill dropped by 60% this month. Happy to share installer recommendations 🌞",
      likes: 92,
      timestamp: new Date(2024, 2, 28, 7, 30),
      comments: [
        {
          id: 1,
          author: "David Chen",
          content: "Would love the contact info! Been thinking about solar for a while.",
          timestamp: new Date(2024, 2, 28, 7, 45)
        },
        {
          id: 2,
          author: "Sarah Johnson",
          content: "Which smart thermostat did you go with? Looking to upgrade mine.",
          timestamp: new Date(2024, 2, 28, 8, 0)
        }
      ]
    },
    {
      id: 5,
      author: "Lucas Martinez",
      content: "Found an amazing plastic-free shop in De Pijp! They even refill cleaning products and shampoo. No more plastic waste from bathroom products 🧴♻️",
      likes: 78,
      timestamp: new Date(2024, 2, 28, 6, 15),
      comments: [
        {
          id: 1,
          author: "Anna Kowalski",
          content: "Is this the one next to the coffee shop? Their lavender soap is amazing!",
          timestamp: new Date(2024, 2, 28, 6, 30)
        }
      ]
    }
  ];

  const [forumPosts, setForumPosts] = useState<ForumPost[]>(initialForumPosts);

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Laptop':
        return <Laptop className="w-6 h-6" />;
      case 'Smartphone Charging':
        return <Smartphone className="w-6 h-6" />;
      case 'Desktop/Monitor':
        return <Monitor className="w-6 h-6" />;
      case 'TV':
        return <Tv className="w-6 h-6" />;
      case 'Coffee Machine':
        return <Coffee className="w-6 h-6" />;
      case 'Washing Machine':
        return <WashingMachine className="w-6 h-6" />;
      default:
        return <Home className="w-6 h-6" />;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'bus':
        return <Bus className="w-6 h-6" />;
      case 'bike':
        return <Bike className="w-6 h-6" />;
      case 'train':
        return <Train className="w-6 h-6" />;
      case 'vegetarian':
      case 'meat':
        return <Utensils className="w-6 h-6" />;
      case 'electricity':
        return <Home className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getActivityName = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const handleValueChange = (index: number, newValue: number) => {
    const newActivities = [...activities];
    newActivities[index].value = newValue;
    setHasStartedTracking(true);
    setActivities(newActivities);
    
    // Update achievements and points
    updateAchievements(newActivities);
  };

  const handleElectricityChange = (index: number, hours: number) => {
    const newUsage = [...electricityUsage];
    newUsage[index].hoursUsed = hours;
    setHasStartedTracking(true);
    setElectricityUsage(newUsage);

    const totalKwh = calculateTotalElectricity();
    const newActivities = [...activities];
    const electricityActivity = { type: 'electricity', value: totalKwh, unit: 'kWh', co2PerUnit: 0.42 };
    
    if (!activities.find(a => a.type === 'electricity')) {
      newActivities.push(electricityActivity);
    } else {
      const index = activities.findIndex(a => a.type === 'electricity');
      newActivities[index] = electricityActivity;
    }
    
    setActivities(newActivities);
    updateAchievements(newActivities);
  };

  const calculateTotalElectricity = () => {
    return electricityUsage.reduce((total, device) => {
      return total + (device.powerRating * device.hoursUsed) / 1000;
    }, 0);
  };

  const updateAchievements = (currentActivities: Activity[]) => {
    const newAchievements = [...achievements];
    let pointsEarned = 0;

    // Update Bike Master achievement
    const bikeActivity = currentActivities.find(a => a.type === 'bike');
    if (bikeActivity) {
      const bikeAchievement = newAchievements.find(a => a.id === 'bike-master');
      if (bikeAchievement && !bikeAchievement.unlocked) {
        bikeAchievement.progress = bikeActivity.value;
        if (bikeAchievement.progress >= bikeAchievement.target) {
          bikeAchievement.unlocked = true;
          pointsEarned += bikeAchievement.points;
        }
      }
    }

    // Update Veggie Champion achievement
    const veggieActivity = currentActivities.find(a => a.type === 'vegetarian');
    if (veggieActivity) {
      const veggieAchievement = newAchievements.find(a => a.id === 'veggie-champion');
      if (veggieAchievement && !veggieAchievement.unlocked) {
        veggieAchievement.progress = veggieActivity.value;
        if (veggieAchievement.progress >= veggieAchievement.target) {
          veggieAchievement.unlocked = true;
          pointsEarned += veggieAchievement.points;
        }
      }
    }

    // Update Energy Saver achievement
    const electricityActivity = currentActivities.find(a => a.type === 'electricity');
    if (electricityActivity) {
      const energyAchievement = newAchievements.find(a => a.id === 'energy-saver');
      if (energyAchievement && !energyAchievement.unlocked && electricityActivity.value <= 2) {
        energyAchievement.progress += 1;
        if (energyAchievement.progress >= energyAchievement.target) {
          energyAchievement.unlocked = true;
          pointsEarned += energyAchievement.points;
        }
      }
    }

    setAchievements(newAchievements);
    if (pointsEarned > 0) {
      setUserPoints(prev => prev + pointsEarned);
    }
  };

  const calculateTotalEmissions = () => {
    return activities.reduce((total, activity) => {
      return total + activity.value * activity.co2PerUnit;
    }, 0);
  };

  const getEmissionLevel = () => {
    const total = calculateTotalEmissions();
    if (total < 2) return 'Excellent';
    if (total < 4) return 'Good';
    return 'Room for Improvement';
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredStores = selectedFilters.length > 0
    ? ecoStores.filter(store => 
        selectedFilters.some(filter => store.type.includes(filter))
      )
    : ecoStores;

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: ForumPost = {
      id: forumPosts.length + 1,
      author: "User",
      content: newPost,
      likes: 0,
      timestamp: new Date(),
      comments: []
    };

    setForumPosts([post, ...forumPosts]);
    setNewPost('');
    setUserPoints(prev => prev + 10); // Points for posting
  };

  const handleLike = (postId: number) => {
    setForumPosts(posts =>
      posts.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  const storeFilters = ["Zero-waste", "Organic", "Vegan", "Local", "Personal Care"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden">
      {!showDashboard ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex items-center justify-between px-8 md:px-16 max-w-7xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full md:w-1/2 pr-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <AnimatePresence>
                {!isAnimating ? (
                  <motion.div
                    key="leaf"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Leaf className="w-16 h-16 text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check className="w-16 h-16 text-green-500" />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="text-3xl font-serif text-green-600">EcoTracker</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-6 leading-tight">
              Track Your Eco Impact, One Day at a Time
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-sans">
              EcoTracker helps students reduce their carbon footprint with simple, everyday actions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartTracking}
              className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl"
            >
              Start Tracking <ArrowRight className="w-5 h-5" /> 🌿
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:block w-1/2 relative"
          >
            <div className="w-full h-[500px] bg-[url('https://images.pexels.com/photos/3932929/pexels-photo-3932929.jpeg')] bg-cover bg-center rounded-2xl shadow-2xl opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="https://images.pexels.com/photos/7262876/pexels-photo-7262876.jpeg"
                alt="Student planting a tree"
                className="w-4/5 h-auto rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence>
            {!hasStartedTracking && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center mb-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8"
              >
                <Leaf className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-3">
                  Let's begin your eco-journey 🌱
                </h2>
                <p className="text-xl text-gray-600">
                  Choose your daily activities to see your carbon impact
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main tracking sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Daily Carbon Calculator */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Leaf className="w-5 h-5 mr-2" />
                🌍 Daily Carbon Calculator
              </h2>
              <div className="grid gap-4">
                {activities.map((activity, index) => (
                  <div key={activity.type} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="p-2 bg-green-100 rounded-full text-green-600">
                      {getIcon(activity.type)}
                    </div>
                    <div className="flex-grow">
                      <label className="block text-sm font-medium text-gray-700">
                        {getActivityName(activity.type)}
                      </label>
                      <div className="mt-2 flex items-center space-x-2">
                        <button
                          onClick={() => handleValueChange(index, Math.max(0, activity.value - 1))}
                          className="p-1 rounded-full hover:bg-green-100 text-green-600 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="w-20 text-center font-medium text-gray-700">
                          {activity.value}
                        </div>
                        <button
                          onClick={() => handleValueChange(index, activity.value + 1)}
                          className="p-1 rounded-full hover:bg-green-100 text-green-600 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="ml-2 text-gray-500">{activity.unit}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <motion.div 
                        key={activity.value}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-sm font-medium text-green-600"
                      >
                        CO₂: {(activity.value * activity.co2PerUnit).toFixed(2)} kg

                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>

              <motion.div 
                 
                className="mt-6 text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Daily Carbon Footprint</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {calculateTotalEmissions().toFixed(2)} kg CO₂
                </div>
                <div className={`inline-block px-4 py-2 rounded-full ${
                  getEmissionLevel() === 'Excellent' ? 'bg-green-100 text-green-800 ring-2 ring-green-200' :
                  getEmissionLevel() === 'Good' ? 'bg-yellow-100 text-yellow-800 ring-2 ring-yellow-200' :
                  'bg-red-100 text-red-800 ring-2 ring-red-200'
                }`}>
                  {getEmissionLevel()}
                </div>
              </motion.div>
            </motion.div>

            {/* Electricity Usage Tracker */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Home className="w-5 h-5 mr-2" />
                ⚡ Electricity Usage
              </h2>
              <div className="grid gap-4">
                {electricityUsage.map((device, index) => (
                  <div key={device.device} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                      {getDeviceIcon(device.device)}
                    </div>
                    <div className="flex-grow">
                      <label className="block text-sm font-medium text-gray-700">
                        {device.device}
                      </label>
                      <div className="mt-2 flex items-center space-x-2">
                        <button
                          onClick={() => handleElectricityChange(index, Math.max(0, device.hoursUsed - 1))}
                          className="p-1 rounded-full hover:bg-blue-100 text-blue-600 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="w-16 text-center font-medium text-gray-700">
                          {device.hoursUsed}
                        </div>
                        <button
                          onClick={() => handleElectricityChange(index, device.hoursUsed + 1)}
                          className="p-1 rounded-full hover:bg-blue-100 text-blue-600 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="ml-2 text-gray-500">hours</span>
                      </div>
                      <motion.div 
                        key={device.hoursUsed}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                
                        className="mt-1 text-sm text-blue-600"
                      >
                          ({device.powerRating}W × {device.hoursUsed}h = {((device.powerRating * device.hoursUsed) / 1000).toFixed(2)} kWh)
                      </motion.div>
                    </div>
                  </div>
                ))}
                <motion.div 
                  className="mt-4 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Total Electricity Usage:</span>
                    <span className="text-lg font-bold text-green-600">
                      {calculateTotalElectricity().toFixed(2)} kWh
                    </span>
                  </div>
                  <div className="mt-3 text-sm text-gray-600 bg-white p-3 rounded-lg border border-blue-100">
                    <Lightbulb className="w-4 h-4 inline-block mr-2 text-amber-500" />
                    Tip: Turn off devices when not in use and unplug chargers to save energy!
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          <AnimatePresence>
            {hasStartedTracking && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 rounded-2xl shadow-lg p-8 mb-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 via-emerald-400 to-green-300"></div>
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        className="relative z-10"
                      >
                        <Trophy className="w-20 h-20 text-yellow-500" />
                      </motion.div>
                      <div className="absolute inset-0 bg-yellow-200 rounded-full blur-xl opacity-40"></div>
                    </div>
                  </div>
                  <motion.div 
                    className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {userPoints} Points
                  </motion.div>
                  <p className="text-gray-700 text-xl font-medium">
                    🌟 Amazing progress! You're making a real difference!
                  </p>
                  <div className="mt-4 flex justify-center gap-4">
                    <div className="px-4 py-2 bg-white/50 rounded-lg">
                      <Award className="w-5 h-5 text-emerald-500 inline mr-2" />
                      <span className="text-sm text-gray-600">Level {Math.floor(userPoints / 100) + 1}</span>
                    </div>
                    <div className="px-4 py-2 bg-white/50 rounded-lg">
                      <Crown className="w-5 h-5 text-yellow-500 inline mr-2" />
                      <span className="text-sm text-gray-600">Top 10%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Achievements Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Medal className="w-5 h-5 mr-2" />
              Your Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg ${
                    achievement.unlocked ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      achievement.unlocked ? 'bg-green-200' : 'bg-gray-200'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          achievement.unlocked ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Community Leaderboard
            </h2>
            <div className="space-y-4">
              {leaderboard.map((entry, index) => (
                <div key={entry.username} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold ${
                    index === 0 ? 'text-yellow-500' :
                    index === 1 ? 'text-gray-400' :
                    index === 2 ? 'text-amber-600' :
                    'text-gray-600'
                  }`}>
                    #{index + 1}
                  </div>
                  <div className="flex-grow">
                    <div className="font-semibold text-gray-800">{entry.username}</div>
                    <div className="text-sm text-gray-600">
                      {entry.achievements} achievements • {entry.topBadge}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{entry.points}</div>
                    <div className="text-sm text-gray-600">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Local Sustainability Programs */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Local Sustainability Programs
            </h2>
            <div className="grid gap-6">
              {sustainabilityPrograms.map((program) => (
                <div key={program.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">{program.name}</h3>
                      <p className="text-sm text-gray-600">{program.organization}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-green-600">{program.points} points</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{program.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {program.location}
                    </div>
                    <a
                      href={program.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 flex items-center gap-1"
                    >
                      Learn More
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amsterdam Recycling Guide */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Recycle className="w-5 h-5 mr-2" />
              Amsterdam Recycling Guide
            </h2>
            <div className="space-y-6">
              {recyclingCenters.map((center, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-800 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {center.name}
                    </h3>
                    <a
                      href={center.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 flex items-center"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{center.address}</p>
                  <p className="text-sm text-gray-600">{center.hours}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {center.materials.map((material, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sustainable Shopping Guide */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Sustainable Shopping Guide
            </h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter by Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {storeFilters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedFilters.includes(filter)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              {filteredStores.map((store, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-800">{store.name}</h3>
                    <a
                      href={store.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 flex items-center"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{store.address}</p>
                  <p className="text-sm text-gray-600 mt-1">{store.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {store.type.map((type, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {store.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Forum */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Community Forum
            </h2>

            <form onSubmit={handlePostSubmit} className="mb-8">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your eco-friendly tips..."
                  className="flex-1 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Post
                </button>
              </div>
            </form>

            <div className="space-y-6">
              {forumPosts.map((post) => (
                <div key={post.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-semibold text-gray-800">{post.author}</span>
                      <span className="text-gray-500 text-sm ml-2">
                        {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  
                  {post.comments.length > 0 && (
                    <div className="space-y-3 ml-6 border-l-2 border-gray-200 pl-4">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">{comment.author}</span>
                            <span className="text-gray-500">
                              {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;