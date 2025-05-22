import React, { useState } from 'react';
import { Search, BookOpen, Video, Download, Bookmark, BookmarkCheck, Calendar, User, Clock, Filter, Tag, Eye, Heart } from 'lucide-react';

const ResourcesView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set([1, 5, 8]));

  // Sample resources data
  const resources = [
    {
      id: 1,
      title: "Complete Guide to Organic Composting for Maximum Yield",
      type: "article",
      category: "soil-management",
      excerpt: "Learn the fundamentals of creating nutrient-rich compost that will boost your crop yields naturally. This comprehensive guide covers everything from basic composting principles to advanced techniques.",
      author: "Dr. Sarah Martinez",
      date: "2024-05-15",
      readTime: "12 min read",
      views: 2847,
      likes: 156,
      tags: ["composting", "organic", "soil-health", "sustainability"],
      thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Precision Irrigation: Smart Water Management Techniques",
      type: "video",
      category: "irrigation",
      excerpt: "Master the art of precision irrigation with this detailed video tutorial covering drip systems, soil moisture sensors, and automated scheduling.",
      author: "Mike Thompson",
      date: "2024-05-12",
      duration: "18:42",
      views: 1923,
      likes: 89,
      tags: ["irrigation", "water-management", "technology", "efficiency"],
      thumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop",
      videoUrl: "#"
    },
    {
      id: 3,
      title: "Crop Rotation Planning Worksheet",
      type: "pdf",
      category: "planning",
      excerpt: "Downloadable PDF worksheet to help you plan effective crop rotation schedules for optimal soil health and pest management.",
      author: "Famizz Team",
      date: "2024-05-10",
      pages: 8,
      downloads: 534,
      tags: ["crop-rotation", "planning", "worksheet", "soil-health"],
      thumbnail: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=250&fit=crop",
      fileSize: "2.4 MB"
    },
    {
      id: 4,
      title: "Integrated Pest Management: Natural Solutions",
      type: "article",
      category: "pest-management",
      excerpt: "Discover eco-friendly pest control methods that protect your crops while maintaining environmental balance and reducing chemical dependency.",
      author: "Prof. James Wilson",
      date: "2024-05-08",
      readTime: "8 min read",
      views: 1654,
      likes: 92,
      tags: ["pest-control", "organic", "IPM", "natural-solutions"],
      thumbnail: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "How to Build a Greenhouse on a Budget",
      type: "video",
      category: "infrastructure",
      excerpt: "Step-by-step video guide to constructing an affordable yet effective greenhouse using readily available materials.",
      author: "DIY Farm Solutions",
      date: "2024-05-05",
      duration: "25:15",
      views: 3421,
      likes: 198,
      tags: ["greenhouse", "DIY", "infrastructure", "budget"],
      thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop",
      featured: true
    },
    {
      id: 6,
      title: "Seasonal Planting Calendar Template",
      type: "pdf",
      category: "planning",
      excerpt: "Customizable planting calendar to optimize your planting schedule based on your local climate and growing conditions.",
      author: "AgriPlanner",
      date: "2024-05-03",
      pages: 12,
      downloads: 789,
      tags: ["planting", "calendar", "seasonal", "planning"],
      thumbnail: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop",
      fileSize: "1.8 MB"
    },
    {
      id: 7,
      title: "Understanding Soil pH and Nutrient Balance",
      type: "article",
      category: "soil-management",
      excerpt: "Comprehensive guide to soil testing, pH management, and nutrient balancing for optimal plant growth and health.",
      author: "Dr. Emily Chen",
      date: "2024-04-28",
      readTime: "15 min read",
      views: 2156,
      likes: 134,
      tags: ["soil-testing", "pH", "nutrients", "soil-health"],
      thumbnail: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop"
    },
    {
      id: 8,
      title: "Advanced Composting Techniques Masterclass",
      type: "video",
      category: "soil-management",
      excerpt: "Advanced composting methods including bokashi, vermicomposting, and thermophilic composting for different farm needs.",
      author: "CompostMaster Pro",
      date: "2024-04-25",
      duration: "32:18",
      views: 1876,
      likes: 145,
      tags: ["composting", "advanced", "bokashi", "vermicomposting"],
      thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop"
    },
    {
      id: 9,
      title: "Farm Business Planning Guide",
      type: "pdf",
      category: "business",
      excerpt: "Complete business planning template for small to medium farms including financial projections and market analysis.",
      author: "Farm Business Advisors",
      date: "2024-04-22",
      pages: 24,
      downloads: 445,
      tags: ["business-planning", "finance", "marketing", "strategy"],
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
      fileSize: "3.1 MB"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', count: resources.length },
    { id: 'soil-management', label: 'Soil Management', count: 3 },
    { id: 'irrigation', label: 'Irrigation', count: 1 },
    { id: 'planning', label: 'Planning', count: 2 },
    { id: 'pest-management', label: 'Pest Management', count: 1 },
    { id: 'infrastructure', label: 'Infrastructure', count: 1 },
    { id: 'business', label: 'Business', count: 1 }
  ];

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'article', label: 'Articles' },
    { id: 'video', label: 'Videos' },
    { id: 'pdf', label: 'Downloads' }
  ];

  const toggleBookmark = (id) => {
    const newBookmarks = new Set(bookmarkedItems);
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id);
    } else {
      newBookmarks.add(id);
    }
    setBookmarkedItems(newBookmarks);
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return <BookOpen size={16} className="text-blue-500" />;
      case 'video': return <Video size={16} className="text-red-500" />;
      case 'pdf': return <Download size={16} className="text-green-500" />;
      default: return <BookOpen size={16} />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'article': return 'Article';
      case 'video': return 'Video';
      case 'pdf': return 'Download';
      default: return 'Resource';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">🌱 Learning Center</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expand your farming knowledge with expert guides, tutorials, and resources to help you grow better crops and build a sustainable farm business.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {types.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Featured Resources */}
        {searchQuery === '' && selectedCategory === 'all' && selectedType === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🌟 Featured Resources</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredResources.map(resource => (
                <div key={resource.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {getTypeIcon(resource.type)}
                        {getTypeLabel(resource.type)}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleBookmark(resource.id)}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                      {bookmarkedItems.has(resource.id) ? 
                        <BookmarkCheck size={20} className="text-green-600" /> : 
                        <Bookmark size={20} className="text-gray-600" />
                      }
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{resource.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {resource.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(resource.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {resource.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={14} />
                          {resource.likes}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                      {resource.type === 'video' ? 'Watch Video' : resource.type === 'pdf' ? 'Download PDF' : 'Read Article'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchQuery ? `Search Results (${filteredResources.length})` : 'All Resources'}
            </h2>
            <span className="text-gray-500">{filteredResources.length} resources found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div key={resource.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={resource.thumbnail} 
                    alt={resource.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                      {getTypeIcon(resource.type)}
                      {getTypeLabel(resource.type)}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(resource.id)}
                    className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    {bookmarkedItems.has(resource.id) ? 
                      <BookmarkCheck size={16} className="text-green-600" /> : 
                      <Bookmark size={16} className="text-gray-600" />
                    }
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.excerpt}</p>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span>{resource.author}</span>
                    <span>•</span>
                    <span>{new Date(resource.date).toLocaleDateString()}</span>
                    {resource.readTime && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {resource.readTime}
                        </span>
                      </>
                    )}
                    {resource.duration && (
                      <>
                        <span>•</span>
                        <span>{resource.duration}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-green-600 text-white py-2 text-sm rounded-md hover:bg-green-700 transition-colors">
                    {resource.type === 'video' ? 'Watch Video' : resource.type === 'pdf' ? 'Download PDF' : 'Read Article'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No resources found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Learning Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{bookmarkedItems.size}</div>
              <div className="text-sm text-gray-600">Bookmarked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{resources.filter(r => r.type === 'article').length}</div>
              <div className="text-sm text-gray-600">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{resources.filter(r => r.type === 'video').length}</div>
              <div className="text-sm text-gray-600">Videos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{resources.filter(r => r.type === 'pdf').length}</div>
              <div className="text-sm text-gray-600">Downloads</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesView;