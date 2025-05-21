import React, { useState } from 'react'
import { 
  Sidebar, 
  Bell, 
  User, 
  Settings, 
  Home, 
  BarChart2, 
  FileText, 
  Cloud, 
  Leaf, 
  PieChart, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Sun, 
  ChevronLeft, 
  ChevronRight,
  HelpCircle,
  BookOpen,
  Calendar,
  ShoppingCart,
  AlertCircle
} from 'lucide-react'
import { motion } from 'framer-motion'

// Dashboard component with all the required sections
const DashboardView = () => {
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false)
  
  return (
    <div className="p-6 basic-font">
      {/* Main grid layout for dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Welcome message card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Start Your Farming Journey</h3>
                <p className="text-gray-600 mt-1">Complete these steps to set up your farm profile</p>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                40% Complete
              </div>
            </div>
            
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-2/5"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <button className="flex items-center justify-center gap-2 bg-primary hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                <Leaf size={18} />
                <span>Set Up My Farm</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                <Cloud size={18} />
                <span>Check Weather</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-serial text-white py-2 px-4 rounded-lg transition-colors">
                <MessageCircle size={18} />
                <span>Join Farmer Forum</span>
              </button>
            </div>
          </div>
          
          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-500">Total Crops</div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Leaf size={18} className="text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-gray-800">12</span>
                <span className="text-sm text-green-600 ml-2">+2 this month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-500">Harvesting Soon</div>
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Calendar size={18} className="text-amber-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-gray-800">4</span>
                <span className="text-sm text-serial ml-2">Next: Tomatoes (5 days)</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-500">Land Utilization</div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <PieChart size={18} className="text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-gray-800">75%</span>
                <span className="text-sm text-blue-600 ml-2">2.5 acres available</span>
              </div>
            </div>
          </div>
          
          {/* Crop health summary chart */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Current Crops</h3>
            <div className="h-48 w-full">
              {/* Placeholder for the pie chart */}
              <div className="flex h-full">
                <div className="w-1/2 h-full flex items-center justify-center">
                  <div className="relative w-36 h-36 rounded-full border-8 border-green-500 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-400"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-blue-400"></div>
                    <div className="absolute top-0 left-0 w-1/6 h-1/6 bg-red-400"></div>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col justify-center space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
                    <span className="text-sm">Corn (45%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-amber-400 rounded-sm mr-2"></div>
                    <span className="text-sm">Wheat (30%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-sm mr-2"></div>
                    <span className="text-sm">Vegetables (20%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 rounded-sm mr-2"></div>
                    <span className="text-sm">Experimental (5%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent forum discussions */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-gray-800">Recent Discussions</h3>
              <a href="#" className="text-green-600 hover:text-green-700 text-sm">View All</a>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User size={16} className="text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">John Smith</span>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">Best practices for organic tomato growing in sandy soil?</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Organic</span>
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Tomatoes</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                <div className="bg-green-100 p-2 rounded-full">
                  <User size={16} className="text-green-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">Maria Garcia</span>
                    <span className="text-xs text-gray-500">Yesterday</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">New sustainable irrigation system reduced my water usage by 30%!</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Irrigation</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Sustainability</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column  */}
        <div className="space-y-6">
          {/* Weather widget */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">Today's Weather</h3>
                <p className="text-blue-100">Tuesday, May 20</p>
              </div>
              <Sun size={36} className="text-yellow-300" />
            </div>
            
            <div className="mt-6 flex items-center">
              <span className="text-4xl font-bold">75°F</span>
              <span className="ml-2 text-blue-100">Sunny</span>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-blue-100 text-xs">Humidity</p>
                <p className="font-medium">45%</p>
              </div>
              <div>
                <p className="text-blue-100 text-xs">Wind</p>
                <p className="font-medium">8 mph</p>
              </div>
              <div>
                <p className="text-blue-100 text-xs">Rainfall</p>
                <p className="font-medium">0 in</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-blue-400">
              <h4 className="text-sm font-medium mb-2">3-Day Forecast</h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs">Wed</p>
                  <Cloud size={18} className="mx-auto my-1" />
                  <p className="text-sm">72°F</p>
                </div>
                <div>
                  <p className="text-xs">Thu</p>
                  <Sun size={18} className="mx-auto my-1" />
                  <p className="text-sm">78°F</p>
                </div>
                <div>
                  <p className="text-xs">Fri</p>
                  <Cloud size={18} className="mx-auto my-1" />
                  <p className="text-sm">74°F</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* notifications center*/}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                  <AlertCircle size={18} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Low Soil Moisture</p>
                  <p className="text-gray-600 text-sm mt-1">Corn field section B moisture levels below 30%. Consider irrigation.</p>
                  <p className="text-amber-600 text-xs mt-1">10 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                <div className="p-2 bg-red-100 rounded-lg text-red-600">
                  <AlertCircle size={18} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Pest Warning</p>
                  <p className="text-gray-600 text-sm mt-1">Aphid detection in tomato greenhouse. Recommended action needed.</p>
                  <p className="text-red-600 text-xs mt-1">3 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Harvest Reminder</p>
                  <p className="text-gray-600 text-sm mt-1">Lettuce will be ready for harvest in approximately 2 days.</p>
                  <p className="text-green-600 text-xs mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Seasonal tips */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Spring Season Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600 flex-shrink-0">
                  <Leaf size={16} />
                </div>
                <p className="text-gray-600 text-sm">Check soil pH levels before planting summer vegetables for optimal growth.</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600 flex-shrink-0">
                  <Leaf size={16} />
                </div>
                <p className="text-gray-600 text-sm">Consider companion planting with marigolds to repel pests naturally.</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600 flex-shrink-0">
                  <Leaf size={16} />
                </div>
                <p className="text-gray-600 text-sm">Set up rainwater collection systems before summer drought periods.</p>
              </div>
            </div>
          </div>
          
          {/* Newsletter signup */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Weekly Farming Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">Get the latest farming tips, market prices, and weather updates.</p>
            
            {!isNewsletterSubscribed ? (
              <div className="space-y-3">
                <div className="relative">
                  <input 
                    type="email"
                    placeholder="Your email address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={() => setIsNewsletterSubscribed(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors"
                >
                  Subscribe
                </button>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800">Thanks for subscribing!</p>
                <p className="text-sm text-green-600 mt-1">You'll receive your first newsletter this Friday.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Empty placeholder components
const ResourcesView = () => <div className="p-6"></div>
const WeatherView = () => <div className="p-6"></div>
const CropsView = () => <div className="p-6"></div>
const MarketView = () => <div className="p-6"></div>
const ForumView = () => <div className="p-6"></div>
const AnalyticsView = () => <div className="p-6"></div>
const SettingsView = () => <div className="p-6"></div>
const HelpView = () => <div className="p-6"></div>

const FarmizzDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeView, setActiveView] = useState('dashboard')
  const [isSeasonDropdownOpen, setSeasonDropdownOpen] = useState(false)
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  
  // Handle menu item clicks
  const handleMenuClick = (view) => {
    setActiveView(view)
  }

  const renderView = () => {
    switch(activeView) {
      case 'dashboard':
        return <DashboardView />
      case 'resources':
        return <ResourcesView />
      case 'weather':
        return <WeatherView />
      case 'crops':
        return <CropsView />
      case 'market':
        return <MarketView />
      case 'forum':
        return <ForumView />
      case 'analytics':
        return <AnalyticsView />
      case 'settings':
        return <SettingsView />
      case 'help':
        return <HelpView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden bg-white basic-font">
      {/* Navigation bar */}
      <nav className="w-full py-3 px-6 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center w-[20%] gap-6">
          {/* Brand icon - farm leaf animated */}
          <div className="flex items-center gap-2 pl-3">
            <div className="flex items-center gap-1">
              <motion.div className="w-3 h-3 rounded-full bg-green-800"
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <motion.div className="w-3 h-3 rounded-full bg-green-500"
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              ></motion.div>
              <motion.div className="w-3 h-3 rounded-full bg-green-300"
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeInOut",
                  delay: 0.4
                }}
              ></motion.div>
            </div>
          </div>
          <button 
            onClick={toggleSidebar} 
            className="p-2 hover:bg-gray-100 text-gray-700 rounded-full transition-colors"
            aria-label="Toggle sidebar"
          >
            <Sidebar size={20} />
          </button>
          <div className="flex flex-row gap-0">
            <ChevronLeft/>
            <ChevronRight/>
          </div>
        </div>
        
        <div className="flex flex-row w-[70%] gap-2 justify-center items-center">
          <Sun size={20} className="text-amber-500"/>
          <div className="relative w-4/6 justify-center items-center">
            <div className="absolute inset-y-0 left-3 flex justify-center items-center pointer-events-none">
              <Cloud size={14} className="text-gray-400" />
            </div>
            {/* Search Input */}
            <input 
              type="search"
              placeholder="Search Farmizz..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 text-[12px] font-normal focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        
        <div className="w-[10%] pl-10 flex flex-row gap-4 justify-center items-center">
          <Calendar className="text-gray-600" />
          <ShoppingCart className="text-gray-600" />
        </div>
      </nav>

      {/* Main content area with sidebar */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden`}>
           <div className='font-bold new-font text-2xl md:text-[34px] px-4 py-2'>
            <h1>Farm<span className='text-[#ff8c33]'>izz</span></h1>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1">
            <a 
              href="#" 
              onClick={(e) => {e.preventDefault(); handleMenuClick('dashboard')}}
              className={`flex items-center px-4 py-4 font-medium text-dark hover:bg-green-50 rounded-md relative group ${activeView === 'dashboard' ? 'bg-green-50' : ''}`}
            >
              <div className={`absolute left-0 w-1 h-full bg-green-600 rounded-r-md ${activeView === 'dashboard' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}></div>
              <Home size={20} className={`mr-3 ${activeView === 'dashboard' ? 'text-primary' : 'text-gray-400 group-hover:text-[#9fd169]'} transition-colors`} />
              <span className={`${activeView === 'dashboard' ? 'text-primary' : 'group-hover:text-[#9fd169]'} transition-colors`}>Dashboard</span>
            </a>
            
            <a 
              href="#" 
              onClick={(e) => {e.preventDefault(); handleMenuClick('weather')}}
              className={`flex items-center px-4 py-4 font-medium text-dark hover:bg-green-50 rounded-md transition-colors relative group ${activeView === 'weather' ? 'bg-green-50' : ''}`}
            >
              <div className={`absolute left-0 w-1 h-full bg-green-600 rounded-r-md ${activeView === 'weather' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}></div>
              <Cloud size={20} className={`mr-3 ${activeView === 'weather' ? 'text-primary' : 'text-gray-400 group-hover:text-[#9fd169]'} transition-colors`} />
              <span className={`${activeView === 'weather' ? 'text-primary' : 'group-hover:text-[#9fd169]'} transition-colors`}>Weather</span>
            </a>
         
            {/* Seasons with dropdown */}
            <div>
              <button 
                onClick={() => setSeasonDropdownOpen(!isSeasonDropdownOpen)} 
                className="w-full flex items-center justify-between px-4 py-4 font-medium text-dark hover:bg-green-50 rounded-md transition-colors relative group"
              >
                <div className="flex items-center">
                  <div className="absolute left-0 w-1 h-full bg-green-600 rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Calendar size={20} className="mr-3 text-gray-400 group-hover:text-green-700 transition-colors" />
                  <span className="group-hover:text-[#9fd169] transition-colors">Seasons</span>
                </div>
                {isSeasonDropdownOpen ? 
                  <ChevronUp size={16} className="text-gray-400" /> : 
                  <ChevronDown size={16} className="text-gray-400" />
                }
              </button>
              
              {/* Seasons dropdown items */}
              {isSeasonDropdownOpen && (
                <div className="ml-10 space-y-1 mt-1">
                  <a href="#" className="flex items-center px-4 py-3 rounded-md bg-green-600 text-white">
                    <span>Current Season</span>
                  </a>
                  <a href="#" className="flex items-center px-4 py-3 rounded-md bg-amber-500 text-white">
                    <span>Planting Calendar</span>
                  </a>
                </div>
              )}
            </div>
            
            <a 
              href="#" 
              onClick={(e) => {e.preventDefault(); handleMenuClick('crops')}}
              className={`flex items-center px-4 py-4 font-medium text-dark hover:bg-green-50 rounded-md transition-colors relative group ${activeView === 'crops' ? 'bg-green-50' : ''}`}
            >
              <div className={`absolute left-0 w-1 h-full bg-green-600 rounded-r-md ${activeView === 'crops' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}></div>
              <Leaf size={20} className={`mr-3 ${activeView === 'crops' ? 'text-primary' : 'text-gray-400 group-hover:text-[#9fd169]'} transition-colors`} />
              <span className={`${activeView === 'crops' ? 'text-primary' : 'group-hover:text-[#9fd169]'} transition-colors`}>My Crops</span>
            </a>
            
            <a 
              href="#" 
              onClick={(e) => {e.preventDefault(); handleMenuClick('market')}}
              className={`flex items-center px-4 py-4 font-medium text-dark hover:bg-green-50 rounded-md transition-colors relative group ${activeView === 'market' ? 'bg-green-50' : ''}`}
            >
              <div className={`absolute left-0 w-1 h-full bg-green-600 rounded-r-md ${activeView === 'market' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}></div>
              <ShoppingCart size={20} className={`mr-3 ${activeView === 'market' ? 'text-primary' : 'text-gray-400 group-hover:text-[#9fd169]'} transition-colors`} />
              <span className={`${activeView === 'market' ? 'text-primary' : 'group-hover:text-[#9fd169]'} transition-colors`}>Market</span>
            </a>
            
            <a 
              href="#" 
              onClick={(e) => {e.preventDefault(); handleMenuClick('forum')}}
              className={`flex items-center px-4 py-4 font-medium text-dark hover:bg-green-50 rounded-md transition-colors relative group ${activeView === 'forum' ? 'bg-green-50' : ''}`}
            >
              <div className={`absolute left-0 w-1 h-full bg-green-600 rounded-r-md ${activeView === 'forum' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}></div>
              <MessageCircle size={20} className={`mr-3 ${activeView === 'forum' ? 'text-primary' : 'text-gray-400 group-hover:text-[#9fd169]'} transition-colors`} />
              <span className={`${activeView === 'forum' ? 'text-primary' : 'group-hover:text-[#9fd169]'} transition-colors`}>Farmer Forum</span>
              <span className="ml-auto flex items-center justify-center w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full">5</span>
            </a>
            
            <a 
              href="#" 
              onClick={(e) => {e.preventDefault(); handleMenuClick('analytics')}}
              className={`flex items-center px-4 py-4 font-medium text-dark hover:bg-green-50 rounded-md transition-colors relative group ${activeView === 'analytics' ? 'bg-green-50' : ''}`}
            >
              <div className={`absolute left-0 w-1 h-full bg-green-600 rounded-r-md ${activeView === 'analytics' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}></div>
              <BarChart2 size={20} className={`mr-3 ${activeView === 'analytics' ? 'text-primary' : 'text-gray-400 group-hover:text-[#9fd169]'} transition-colors`} />
              <span className={`${activeView === 'analytics' ? 'text-primary' : 'group-hover:text-[#9fd169]'} transition-colors`}>Farm Analytics</span>
            </a>
            
            <a 
              href="#" 
              onClick={(e) => {e.preventDefault(); handleMenuClick('resources')}}
              className={`flex items-center px-4 py-4 font-medium text-dark hover:bg-green-50 rounded-md transition-colors relative group ${activeView === 'resources' ? 'bg-green-50' : ''}`}
            >
              <div className={`absolute left-0 w-1 h-full bg-green-600 rounded-r-md ${activeView === 'resources' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}></div>
              <BookOpen size={20} className={`mr-3 ${activeView === 'resources' ? 'text-primary' : 'text-gray-400 group-hover:text-[#9fd169]'} transition-colors`} />
              <span className={`${activeView === 'resources' ? 'text-primary' : 'group-hover:text-[#9fd169]'} transition-colors`}>Resources</span>
            </a>
          </nav>
          
          <div className="p-3 mt-auto">
            <div className="flex flex-col p-4 bg-gray-50 rounded-lg">
              <a 
                href="#" 
                onClick={(e) => {e.preventDefault(); handleMenuClick('settings')}}
                className={`flex items-center px-4 py-4 font-medium text-dark hover:bg-green-50 rounded-md transition-colors relative group ${activeView === 'settings' ? 'bg-green-50' : ''}`}
              >
                <div className={`absolute left-0 w-1 h-full bg-green-600 rounded-r-md ${activeView === 'settings' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}></div>
                <Settings size={20} className={`mr-3 ${activeView === 'settings' ? 'text-green-700' : 'text-gray-400 group-hover:text-green-700'} transition-colors`} />
                <span className={`${activeView === 'settings' ? 'text-green-700' : 'group-hover:text-green-700'} transition-colors`}>Settings</span>
              </a>
              
              <a 
                href="#" 
                onClick={(e) => {e.preventDefault(); handleMenuClick('help')}}
                className={`flex items-center px-4 py-4 font-medium text-dark hover:bg-green-50 rounded-md transition-colors relative group ${activeView === 'help' ? 'bg-green-50' : ''}`}
              >
                <div className={`absolute left-0 w-1 h-full bg-green-600 rounded-r-md ${activeView === 'help' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}></div>
                <HelpCircle size={20} className={`mr-3 ${activeView === 'help' ? 'text-green-700' : 'text-gray-400 group-hover:text-green-700'} transition-colors`} />
                <span className={`${activeView === 'help' ? 'text-green-700' : 'group-hover:text-green-700'} transition-colors`}>Help Center</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? '' : 'pl-6'}`}>
          {/* User profile section with proper full-width border bottom */}
          <div className="w-full pb-4">
            <div className="flex justify-between w-full py-4 items-center px-7">
              {/* Page title and welcome message */}
              <div className="flex flex-col gap-1">
                <h2 className="text-dark font-bold text-[1.4rem]">
                  {activeView === 'dashboard' ? 'Dashboard' : 
                   activeView === 'weather' ? 'Weather Forecast' : 
                   activeView === 'crops' ? 'My Crops' : 
                   activeView === 'market' ? 'Market Prices' : 
                   activeView === 'forum' ? 'Farmer Forum' : 
                   activeView === 'analytics' ? 'Farm Analytics' : 
                   activeView === 'resources' ? 'Resources' : 
                   activeView === 'settings' ? 'Settings' : 
                   activeView === 'help' ? 'Help Center' : 'Dashboard'}
                </h2>
                <p className="text-dark font-normal text-[1rem]">Welcome Back, Farmer! How's your farm doing today?</p>
              </div>

              {/* User profile and notifications */}
              <div className="flex items-center space-x-4"> 
                <motion.button 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: "easeInOut",
                    delay: 0.4
                  }}
                >
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full">2</span>
                </motion.button>
                <div className="flex flex-row justify-center items-center gap-2">
                  <div>
                    <button className="p-2 hover:bg-gray-100 bg-gray-50 rounded-full transition-colors">
                      <User size={24} />
                    </button>
                  </div>
                  <div className="flex flex-col text-dark">
                    <h2 className="font-semibold text-[1rem]">Farmer</h2>
                    <p className="font-normal text-[0.7rem]">Premium Account</p>
                  </div>
                  <div>
                    <ChevronDown size={20}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Border that spans the full width */}
          <div className="w-full border-t border-[#d9d9d9] h-full overflow-hidden">
            {renderView()}
          </div>
          
          {/* Footer area */}
          <div className="px-6 py-5 border-t border-[#D9D9D9]">
            <div className="max-w-3xl mx-auto">
              {/* Empty for now */}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default FarmizzDashboard