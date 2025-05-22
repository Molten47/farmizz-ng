import React, { useState } from 'react';
import { Search, Plus, TrendingUp, ShoppingCart, User, Calendar, DollarSign, Package } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MarketView = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const marketItems = [
    {
      id: 1,
      name: 'Premium Maize Seeds',
      category: 'Seeds',
      price: 45.00,
      seller: 'Green Valley Farm',
      location: 'Nairobi, Kenya',
      rating: 4.8,
      image: '🌽',
      description: 'High-yield drought-resistant maize seeds'
    },
    {
      id: 2,
      name: 'Organic Fertilizer - NPK',
      category: 'Fertilizers',
      price: 120.00,
      seller: 'AgriSupply Co.',
      location: 'Kampala, Uganda',
      rating: 4.6,
      image: '🌱',
      description: '50kg bag of organic NPK fertilizer'
    },
    {
      id: 3,
      name: 'Irrigation Pump System',
      category: 'Equipment',
      price: 850.00,
      seller: 'TechFarm Solutions',
      location: 'Dar es Salaam, Tanzania',
      rating: 4.9,
      image: '⚙️',
      description: 'Solar-powered irrigation pump with 2-year warranty'
    },
    {
      id: 4,
      name: 'Tomato Seeds - Hybrid',
      category: 'Seeds',
      price: 25.00,
      seller: 'Sunrise Agriculture',
      location: 'Kigali, Rwanda',
      rating: 4.7,
      image: '🍅',
      description: 'Disease-resistant hybrid tomato seeds'
    }
  ];

  const priceData = [
    { month: 'Jan', maize: 35, wheat: 28, rice: 42 },
    { month: 'Feb', maize: 38, wheat: 30, rice: 45 },
    { month: 'Mar', maize: 42, wheat: 32, rice: 47 },
    { month: 'Apr', maize: 45, wheat: 35, rice: 44 },
    { month: 'May', maize: 47, wheat: 33, rice: 46 }
  ];

  const purchaseHistory = [
    { id: 1, item: 'Maize Seeds', date: '2024-05-15', amount: 45.00, status: 'Delivered' },
    { id: 2, item: 'NPK Fertilizer', date: '2024-05-10', amount: 120.00, status: 'In Transit' },
    { id: 3, item: 'Spray Pump', date: '2024-05-05', amount: 275.00, status: 'Delivered' }
  ];

  const categories = ['All', 'Seeds', 'Fertilizers', 'Equipment', 'Tools'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = marketItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderBrowseTab = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 min-h-[400px]">
            <div className="p-8">
              <div className="text-6xl mb-6 text-center">{item.image}</div>
              <h3 className="font-semibold text-xl mb-3 text-gray-800">{item.name}</h3>
              <p className="text-gray-600 text-base mb-4">{item.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-green-600">${item.price}</span>
                  <span className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-base text-gray-600">{item.seller}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-base text-gray-500">{item.location}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-lg">★</span>
                    <span className="text-base text-gray-600">{item.rating}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-cta text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium text-lg">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPriceTrendsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Price Trends (Last 5 Months)
        </h3>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="maize" stroke="#10B981" strokeWidth={3} name="Maize ($/kg)" />
              <Line type="monotone" dataKey="wheat" stroke="#F59E0B" strokeWidth={3} name="Wheat ($/kg)" />
              <Line type="monotone" dataKey="rice" stroke="#3B82F6" strokeWidth={3} name="Rice ($/kg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800">Maize</h4>
            <p className="text-2xl font-bold text-green-600">$47/kg</p>
            <p className="text-sm text-green-700">+4.4% this month</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800">Wheat</h4>
            <p className="text-2xl font-bold text-yellow-600">$33/kg</p>
            <p className="text-sm text-yellow-700">-5.7% this month</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800">Rice</h4>
            <p className="text-2xl font-bold text-blue-600">$46/kg</p>
            <p className="text-sm text-blue-700">+4.5% this month</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-green-600" />
          Purchase History
        </h3>
        
        <div className="space-y-4">
          {purchaseHistory.map(purchase => (
            <div key={purchase.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800">{purchase.item}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {purchase.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ${purchase.amount}
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  purchase.status === 'Delivered' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {purchase.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-medium">
              <Plus className="w-5 h-5" />
              Post Product
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'browse', label: 'Browse Products', icon: ShoppingCart },
              { id: 'trends', label: 'Price Trends', icon: TrendingUp },
              { id: 'history', label: 'Purchase History', icon: Package }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'browse' && renderBrowseTab()}
        {activeTab === 'trends' && renderPriceTrendsTab()}
        {activeTab === 'history' && renderHistoryTab()}
      </div>
    </div>
  );
};

export default MarketView;