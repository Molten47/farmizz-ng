import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Plus, Bell, Search, Filter, User, Calendar, Tag, TrendingUp } from 'lucide-react';

const FarmerForum = () => {
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: "Organic pest control methods for tomatoes",
      content: "Looking for natural ways to deal with aphids and whiteflies on my tomato plants. Chemical pesticides are affecting the beneficial insects in my garden.",
      author: "GreenThumb_Mike",
      category: "Pest Control",
      tags: ["organic", "tomatoes", "aphids"],
      likes: 23,
      comments: 12,
      timestamp: "2 hours ago",
      isLiked: false,
      avatar: "🧑‍🌾"
    },
    {
      id: 2,
      title: "Drip irrigation setup for small farm - budget options?",
      content: "Planning to install drip irrigation on 5 acres. What are some cost-effective solutions that work well for vegetables and herbs?",
      author: "FarmLife_Sarah",
      category: "Irrigation",
      tags: ["irrigation", "budget", "vegetables"],
      likes: 45,
      comments: 28,
      timestamp: "4 hours ago",
      isLiked: true,
      avatar: "👩‍🌾"
    },
    {
      id: 3,
      title: "Soil pH testing - when and how often?",
      content: "New to farming and wondering about soil testing frequency. Should I test every season or just annually? What's the best time of year?",
      author: "NewFarmer_Joe",
      category: "Soil Management",
      tags: ["soil", "pH", "testing", "beginner"],
      likes: 18,
      comments: 15,
      timestamp: "6 hours ago",
      isLiked: false,
      avatar: "🧑‍🌾"
    },
    {
      id: 4,
      title: "Cover crop recommendations for zone 6b",
      content: "Looking for cover crop suggestions to plant this fall. Need something that will fix nitrogen and suppress weeds over winter.",
      author: "SustainableFarm_Anna",
      category: "Crop Management",
      tags: ["cover-crops", "nitrogen", "zone6b"],
      likes: 31,
      comments: 19,
      timestamp: "8 hours ago",
      isLiked: false,
      avatar: "👩‍🌾"
    },
    {
      id: 5,
      title: "Chicken coop ventilation in winter - best practices?",
      content: "First winter with chickens. How do I balance proper ventilation with keeping them warm? Current coop is 8x12 for 20 hens.",
      author: "BackyardHens_Tom",
      category: "Livestock",
      tags: ["chickens", "winter", "ventilation"],
      likes: 27,
      comments: 22,
      timestamp: "12 hours ago",
      isLiked: true,
      avatar: "🧑‍🌾"
    }
  ]);

  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(0);
  const [notifications, setNotifications] = useState(3);
  const [newThread, setNewThread] = useState({
    title: "",
    content: "",
    category: "General",
    tags: ""
  });

  const categories = [
    "All", "Pest Control", "Irrigation", "Soil Management", 
    "Crop Management", "Livestock", "Equipment", "Marketing", "Weather"
  ];

  const filteredThreads = threads.filter(thread => {
    const matchesCategory = selectedCategory === "All" || thread.category === selectedCategory;
    
    if (!searchTerm.trim()) {
      return matchesCategory;
    }
    
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      thread.title.toLowerCase().includes(searchLower) ||
      thread.content.toLowerCase().includes(searchLower) ||
      thread.author.toLowerCase().includes(searchLower) ||
      thread.category.toLowerCase().includes(searchLower) ||
      thread.tags.some(tag => tag.toLowerCase().includes(searchLower));
    
    return matchesCategory && matchesSearch;
  });

  // Update search results count
  useEffect(() => {
    setSearchResults(filteredThreads.length);
  }, [filteredThreads.length]);

  const handleLike = (threadId) => {
    setThreads(threads.map(thread => 
      thread.id === threadId 
        ? { 
            ...thread, 
            isLiked: !thread.isLiked,
            likes: thread.isLiked ? thread.likes - 1 : thread.likes + 1
          }
        : thread
    ));
  };

  const handleNewThread = () => {
    if (newThread.title && newThread.content) {
      const thread = {
        id: threads.length + 1,
        title: newThread.title,
        content: newThread.content,
        author: "You",
        category: newThread.category,
        tags: newThread.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        likes: 0,
        comments: 0,
        timestamp: "just now",
        isLiked: false,
        avatar: "🧑‍🌾"
      };
      setThreads([thread, ...threads]);
      setNewThread({ title: "", content: "", category: "General", tags: "" });
      setShowNewThreadModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
           
            <div className="flex items-center space-x-4">
      
              
            </div>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search discussions, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              onClick={() => setShowNewThreadModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Ask Question</span>
            </button>
          </div>
          {searchTerm && (
            <div className="mt-2 text-sm text-gray-600">
              Found {searchResults} result{searchResults !== 1 ? 's' : ''} for "{searchTerm}"
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-green-100 p-4 sticky top-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-green-100 text-green-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Popular Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["organic", "irrigation", "pest-control", "soil", "livestock"].map(tag => (
                    <span key={tag} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs cursor-pointer hover:bg-green-100">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Threads */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredThreads.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-green-100 p-8 text-center">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    {searchTerm ? `No results found for "${searchTerm}"` : "No discussions found"}
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm 
                      ? "Try using different keywords or check your spelling" 
                      : "Try adjusting your category filter"}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="mt-3 text-green-600 hover:text-green-700 font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              ) : (
                filteredThreads.map(thread => (
                  <div key={thread.id} className="bg-white rounded-lg shadow-sm border border-green-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">{thread.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-800 text-lg mb-1 hover:text-green-700 cursor-pointer">
                              {thread.title}
                            </h3>
                            <div className="flex items-center space-x-3 text-sm text-gray-500 mb-2">
                              <span className="flex items-center">
                                <User className="w-3 h-3 mr-1" />
                                {thread.author}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {thread.timestamp}
                              </span>
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                                {thread.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 leading-relaxed">{thread.content}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleLike(thread.id)}
                              className={`flex items-center space-x-1 transition-colors ${
                                thread.isLiked 
                                  ? 'text-red-500 hover:text-red-600' 
                                  : 'text-gray-500 hover:text-red-500'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${thread.isLiked ? 'fill-current' : ''}`} />
                              <span className="font-medium">{thread.likes}</span>
                            </button>
                            
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span className="font-medium">{thread.comments}</span>
                            </button>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {thread.tags.map(tag => (
                              <span key={tag} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs flex items-center">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* New Thread Modal */}
        {showNewThreadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-90vh overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Ask a Question</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={newThread.title}
                      onChange={(e) => setNewThread({...newThread, title: e.target.value})}
                      placeholder="What's your question about?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newThread.category}
                      onChange={(e) => setNewThread({...newThread, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={newThread.content}
                      onChange={(e) => setNewThread({...newThread, content: e.target.value})}
                      placeholder="Provide details about your question or situation..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <input
                      type="text"
                      value={newThread.tags}
                      onChange={(e) => setNewThread({...newThread, tags: e.target.value})}
                      placeholder="Add tags separated by commas (e.g., organic, tomatoes, pest-control)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setShowNewThreadModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNewThread}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Post Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerForum;