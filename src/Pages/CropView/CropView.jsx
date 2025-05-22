import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Droplets, Beaker, Calendar, MapPin, RotateCcw, Lightbulb } from 'lucide-react';

const CropsView = () => {
  const [activeTab, setActiveTab] = useState('crops');
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [crops, setCrops] = useState([
    {
      id: 1,
      name: 'Tomatoes',
      variety: 'Roma',
      plantedDate: '2024-03-15',
      status: 'Growing',
      stage: 'Flowering',
      location: 'Garden Bed A',
      soilCondition: 'Good',
      lastWatered: '2024-05-20',
      lastFertilized: '2024-05-18',
      nextWatering: '2024-05-23',
      nextFertilizer: '2024-05-25',
      notes: 'Showing good growth, some flowers appearing',
      cropFamily: 'Nightshade',
      season: 'Summer'
    },
    {
      id: 2,
      name: 'Lettuce',
      variety: 'Butterhead',
      plantedDate: '2024-04-01',
      status: 'Harvesting',
      stage: 'Mature',
      location: 'Container 3',
      soilCondition: 'Excellent',
      lastWatered: '2024-05-21',
      lastFertilized: '2024-05-15',
      nextWatering: '2024-05-22',
      nextFertilizer: '2024-05-29',
      notes: 'Ready for harvest, leaves are full-sized',
      cropFamily: 'Leafy Greens',
      season: 'Spring'
    },
    {
      id: 3,
      name: 'Carrots',
      variety: 'Nantes',
      plantedDate: '2024-02-20',
      status: 'Completed',
      stage: 'Harvested',
      location: 'Garden Bed B',
      soilCondition: 'Good',
      lastWatered: '2024-05-10',
      lastFertilized: '2024-05-05',
      nextWatering: null,
      nextFertilizer: null,
      notes: 'Harvested successfully, good yield',
      cropFamily: 'Root Vegetables',
      season: 'Fall'
    }
  ]);

  const [newCrop, setNewCrop] = useState({
    name: '',
    variety: '',
    plantedDate: '',
    location: '',
    notes: '',
    cropFamily: '',
    season: ''
  });

  const [rotationPreferences, setRotationPreferences] = useState({
    preferredFamilies: ['Legumes', 'Leafy Greens', 'Root Vegetables'],
    avoidConsecutive: true,
    seasonalPlanning: true,
    soilImprovement: true
  });

  // Crop rotation database
  const cropFamilies = {
    'Nightshade': ['Tomatoes', 'Peppers', 'Eggplant', 'Potatoes'],
    'Legumes': ['Beans', 'Peas', 'Lentils', 'Peanuts'],
    'Brassicas': ['Cabbage', 'Broccoli', 'Cauliflower', 'Kale', 'Radishes'],
    'Root Vegetables': ['Carrots', 'Beets', 'Turnips', 'Parsnips'],
    'Leafy Greens': ['Lettuce', 'Spinach', 'Chard', 'Arugula'],
    'Cucurbits': ['Cucumbers', 'Squash', 'Pumpkins', 'Melons'],
    'Alliums': ['Onions', 'Garlic', 'Leeks', 'Chives'],
    'Herbs': ['Basil', 'Oregano', 'Thyme', 'Cilantro']
  };

  const rotationRules = {
    'Nightshade': {
      goodFollowers: ['Legumes', 'Brassicas', 'Root Vegetables'],
      avoid: ['Nightshade'],
      soilEffect: 'Heavy feeder - depletes nutrients'
    },
    'Legumes': {
      goodFollowers: ['Nightshade', 'Leafy Greens', 'Brassicas'],
      avoid: ['Legumes'],
      soilEffect: 'Nitrogen fixer - improves soil'
    },
    'Brassicas': {
      goodFollowers: ['Legumes', 'Root Vegetables', 'Herbs'],
      avoid: ['Brassicas'],
      soilEffect: 'Moderate feeder'
    },
    'Root Vegetables': {
      goodFollowers: ['Legumes', 'Leafy Greens', 'Nightshade'],
      avoid: ['Root Vegetables'],
      soilEffect: 'Light feeder - breaks up soil'
    },
    'Leafy Greens': {
      goodFollowers: ['Root Vegetables', 'Herbs', 'Legumes'],
      avoid: ['Leafy Greens'],
      soilEffect: 'Light feeder'
    },
    'Cucurbits': {
      goodFollowers: ['Legumes', 'Root Vegetables'],
      avoid: ['Cucurbits'],
      soilEffect: 'Heavy feeder'
    }
  };

  const seasonalCrops = {
    'Spring': ['Lettuce', 'Spinach', 'Peas', 'Radishes', 'Carrots'],
    'Summer': ['Tomatoes', 'Peppers', 'Cucumbers', 'Beans', 'Squash'],
    'Fall': ['Broccoli', 'Cabbage', 'Kale', 'Beets', 'Turnips'],
    'Winter': ['Garlic', 'Onions', 'Winter Squash', 'Brussels Sprouts']
  };

  const growthStages = ['Seedling', 'Vegetative', 'Flowering', 'Fruiting', 'Mature', 'Harvested'];
  const soilConditions = ['Poor', 'Fair', 'Good', 'Excellent'];
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
  const statusColors = {
    'Growing': 'bg-green-100 text-green-800',
    'Harvesting': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-gray-100 text-gray-800'
  };

  const getRotationSuggestions = (location) => {
    // Find the last crop in this location
    const locationHistory = crops
      .filter(crop => crop.location === location)
      .sort((a, b) => new Date(b.plantedDate) - new Date(a.plantedDate));
    
    if (locationHistory.length === 0) {
      return {
        suggestions: Object.keys(cropFamilies).slice(0, 3),
        reason: "No previous crops in this location - any family is suitable"
      };
    }

    const lastCrop = locationHistory[0];
    const lastFamily = lastCrop.cropFamily;
    
    if (!rotationRules[lastFamily]) {
      return {
        suggestions: ['Legumes', 'Root Vegetables', 'Leafy Greens'],
        reason: "General rotation recommended"
      };
    }

    const rules = rotationRules[lastFamily];
    const currentSeason = getCurrentSeason();
    
    // Filter suggestions based on season if seasonal planning is enabled
    let suggestions = rules.goodFollowers;
    if (rotationPreferences.seasonalPlanning) {
      suggestions = suggestions.filter(family => {
        const familyCrops = cropFamilies[family] || [];
        const seasonalOptions = seasonalCrops[currentSeason] || [];
        return familyCrops.some(crop => seasonalOptions.includes(crop));
      });
    }

    return {
      suggestions: suggestions.slice(0, 3),
      reason: `After ${lastFamily}: ${rules.soilEffect}. Best followers improve soil balance.`,
      avoid: rules.avoid,
      lastCrop: lastCrop.name
    };
  };

  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Fall';
    return 'Winter';
  };

  const getCropSuggestions = (family, season) => {
    const familyCrops = cropFamilies[family] || [];
    const seasonalOptions = seasonalCrops[season] || [];
    
    if (rotationPreferences.seasonalPlanning) {
      return familyCrops.filter(crop => seasonalOptions.includes(crop));
    }
    
    return familyCrops;
  };

  const handleAddCrop = () => {
    if (newCrop.name && newCrop.variety && newCrop.plantedDate) {
      const crop = {
        id: Date.now(),
        ...newCrop,
        status: 'Growing',
        stage: 'Seedling',
        soilCondition: 'Good',
        lastWatered: null,
        lastFertilized: null,
        nextWatering: null,
        nextFertilizer: null
      };
      setCrops([...crops, crop]);
      setNewCrop({ name: '', variety: '', plantedDate: '', location: '', notes: '', cropFamily: '', season: '' });
      setShowAddCrop(false);
    }
  };

  const deleteCrop = (id) => {
    setCrops(crops.filter(crop => crop.id !== id));
  };

  const updateCropStatus = (id, field, value) => {
    setCrops(crops.map(crop => 
      crop.id === id ? { ...crop, [field]: value } : crop
    ));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysPlanted = (plantedDate) => {
    const planted = new Date(plantedDate);
    const today = new Date();
    const diffTime = Math.abs(today - planted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUniqueLocations = () => {
    const locations = crops.map(crop => crop.location);
    return [...new Set(locations)];
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('crops')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'crops'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Crop List
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'planner'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Crop Planner
          </button>
          <button
            onClick={() => setActiveTab('rotation')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'rotation'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <RotateCcw size={16} className="inline mr-1" />
            Crop Rotation
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'schedule'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Care Schedule
          </button>
        </nav>
      </div>

      {/* Crop List Tab */}
      {activeTab === 'crops' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Current Crops</h2>
            <button
              onClick={() => setShowAddCrop(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Plus size={16} />
              Add Crop
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {crops.map((crop) => (
              <div key={crop.id} className="bg-gray-50 rounded-lg p-6 border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{crop.name}</h3>
                    <p className="text-sm text-gray-600">{crop.variety}</p>
                    {crop.cropFamily && (
                      <p className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded mt-1 inline-block">
                        {crop.cropFamily}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => deleteCrop(crop.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[crop.status]}`}>
                      {crop.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Growth Stage:</span>
                    <select
                      value={crop.stage}
                      onChange={(e) => updateCropStatus(crop.id, 'stage', e.target.value)}
                      className="text-sm border rounded px-2 py-1"
                    >
                      {growthStages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Soil Condition:</span>
                    <select
                      value={crop.soilCondition}
                      onChange={(e) => updateCropStatus(crop.id, 'soilCondition', e.target.value)}
                      className="text-sm border rounded px-2 py-1"
                    >
                      {soilConditions.map(condition => (
                        <option key={condition} value={condition}>{condition}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span>{crop.location}</span>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span>Planted: {formatDate(crop.plantedDate)} ({getDaysPlanted(crop.plantedDate)} days ago)</span>
                  </div>

                  {crop.notes && (
                    <div className="text-sm text-gray-600 bg-white p-2 rounded border">
                      {crop.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Crop Planner Tab */}
      {activeTab === 'planner' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Crop Planner</h2>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Crop</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crop Name</label>
                <input
                  type="text"
                  value={newCrop.name}
                  onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="e.g., Tomatoes"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Variety</label>
                <input
                  type="text"
                  value={newCrop.variety}
                  onChange={(e) => setNewCrop({...newCrop, variety: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="e.g., Cherry, Roma"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crop Family</label>
                <select
                  value={newCrop.cropFamily}
                  onChange={(e) => setNewCrop({...newCrop, cropFamily: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">Select crop family</option>
                  {Object.keys(cropFamilies).map(family => (
                    <option key={family} value={family}>{family}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
                <select
                  value={newCrop.season}
                  onChange={(e) => setNewCrop({...newCrop, season: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">Select season</option>
                  {seasons.map(season => (
                    <option key={season} value={season}>{season}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Planted Date</label>
                <input
                  type="date"
                  value={newCrop.plantedDate}
                  onChange={(e) => setNewCrop({...newCrop, plantedDate: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={newCrop.location}
                  onChange={(e) => setNewCrop({...newCrop, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="e.g., Garden Bed A, Container 1"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={newCrop.notes}
                onChange={(e) => setNewCrop({...newCrop, notes: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows="3"
                placeholder="Additional notes about this crop..."
              />
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleAddCrop}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Add Crop
              </button>
              <button
                onClick={() => setNewCrop({ name: '', variety: '', plantedDate: '', location: '', notes: '', cropFamily: '', season: '' })}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Crop Rotation Tab */}
      {activeTab === 'rotation' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Crop Rotation Planner</h2>
          </div>

          {/* Rotation Preferences */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb size={20} />
              Rotation Preferences
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={rotationPreferences.avoidConsecutive}
                  onChange={(e) => setRotationPreferences({...rotationPreferences, avoidConsecutive: e.target.checked})}
                  className="form-checkbox h-4 w-4 text-green-600"
                />
                <span className="text-sm text-gray-700">Avoid consecutive same-family crops</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={rotationPreferences.seasonalPlanning}
                  onChange={(e) => setRotationPreferences({...rotationPreferences, seasonalPlanning: e.target.checked})}
                  className="form-checkbox h-4 w-4 text-green-600"
                />
                <span className="text-sm text-gray-700">Consider seasonal suitability</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={rotationPreferences.soilImprovement}
                  onChange={(e) => setRotationPreferences({...rotationPreferences, soilImprovement: e.target.checked})}
                  className="form-checkbox h-4 w-4 text-green-600"
                />
                <span className="text-sm text-gray-700">Prioritize soil improvement</span>
              </label>
            </div>
          </div>

          {/* Location-based Rotation Suggestions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Rotation Suggestions by Location</h3>
            
            {getUniqueLocations().map(location => {
              const suggestions = getRotationSuggestions(location);
              const currentSeason = getCurrentSeason();
              
              return (
                <div key={location} className="bg-gray-50 rounded-lg p-6 border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <MapPin size={16} />
                        {location}
                      </h4>
                      {suggestions.lastCrop && (
                        <p className="text-sm text-gray-600">Last crop: {suggestions.lastCrop}</p>
                      )}
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {currentSeason}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-700 mb-3">{suggestions.reason}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-green-700 mb-2">Recommended Crop Families:</h5>
                        <div className="flex flex-wrap gap-2">
                          {suggestions.suggestions.map(family => (
                            <span key={family} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                              {family}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {suggestions.avoid && (
                        <div>
                          <h5 className="text-sm font-medium text-red-700 mb-2">Avoid:</h5>
                          <div className="flex flex-wrap gap-2">
                            {suggestions.avoid.map(family => (
                              <span key={family} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                {family}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Specific Crop Suggestions */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-gray-700">Suggested Crops for {currentSeason}:</h5>
                    {suggestions.suggestions.map(family => {
                      const cropOptions = getCropSuggestions(family, currentSeason);
                      return cropOptions.length > 0 && (
                        <div key={family} className="flex flex-wrap gap-2">
                          <span className="text-sm font-medium text-gray-600 min-w-20">{family}:</span>
                          {cropOptions.map(crop => (
                            <button
                              key={crop}
                              onClick={() => setNewCrop({
                                ...newCrop,
                                name: crop,
                                location: location,
                                cropFamily: family,
                                season: currentSeason,
                                plantedDate: new Date().toISOString().split('T')[0]
                              })}
                              className="bg-white border border-green-300 text-green-700 px-2 py-1 rounded text-sm hover:bg-green-50"
                            >
                              + {crop}
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Crop Family Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Crop Family Guide</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(rotationRules).map(([family, rules]) => (
                <div key={family} className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-gray-900 mb-2">{family}</h4>
                  <p className="text-sm text-gray-600 mb-2">{rules.soilEffect}</p>
                  <div className="text-xs text-gray-500">
                    <p>Good followers: {rules.goodFollowers.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Care Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Watering & Fertilizer Schedule</h2>
          
          <div className="grid gap-6">
            {crops.filter(crop => crop.status !== 'Completed').map((crop) => (
              <div key={crop.id} className="bg-gray-50 rounded-lg p-6 border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{crop.name}</h3>
                    <p className="text-sm text-gray-600">{crop.variety} - {crop.location}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[crop.status]}`}>
                    {crop.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Droplets className="text-blue-500" size={20} />
                      <div>
                        <h4 className="font-medium text-gray-900">Watering</h4>
                        <p className="text-sm text-gray-600">
                          Last: {formatDate(crop.lastWatered) || 'Never'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Next: {formatDate(crop.nextWatering)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="date"
                        onChange={(e) => updateCropStatus(crop.id, 'nextWatering', e.target.value)}
                        className="text-sm border rounded px-2 py-1"
                      />
                      <button
                        onClick={() => updateCropStatus(crop.id, 'lastWatered', new Date().toISOString().split('T')[0])}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        Water Now
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Beaker className="text-orange-500" size={20} />
                      <div>
                        <h4 className="font-medium text-gray-900">Fertilizer</h4>
                        <p className="text-sm text-gray-600">
                          Last: {formatDate(crop.lastFertilized) || 'Never'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Next: {formatDate(crop.nextFertilizer)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="date"
                        onChange={(e) => updateCropStatus(crop.id, 'nextFertilizer', e.target.value)}
                        className="text-sm border rounded px-2 py-1"
                      />
                      <button
                        onClick={() => updateCropStatus(crop.id, 'lastFertilized', new Date().toISOString().split('T')[0])}
                        className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600"
                      >
                        Fertilize Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropsView;