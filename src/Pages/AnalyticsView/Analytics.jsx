import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText, Calendar, TrendingUp, DollarSign, Droplets, BarChart3 } from 'lucide-react';

const AnalyticsView = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedMetric, setSelectedMetric] = useState('yield');

  // Sample data - replace with your actual data
  const yieldData = [
    { crop: 'Corn', yield: 450, cost: 12000, income: 18000 },
    { crop: 'Wheat', yield: 320, income: 14500, cost: 9500 },
    { crop: 'Soybeans', yield: 280, income: 16800, cost: 11200 },
    { crop: 'Rice', yield: 380, income: 15200, cost: 10800 },
    { crop: 'Barley', yield: 210, income: 8400, cost: 6300 }
  ];

  const moistureData = [
    { date: 'Jan', moisture: 65, optimal: 70 },
    { date: 'Feb', moisture: 68, optimal: 70 },
    { date: 'Mar', moisture: 72, optimal: 70 },
    { date: 'Apr', moisture: 69, optimal: 70 },
    { date: 'May', moisture: 71, optimal: 70 },
    { date: 'Jun', moisture: 74, optimal: 70 },
    { date: 'Jul', moisture: 67, optimal: 70 },
    { date: 'Aug', moisture: 63, optimal: 70 },
    { date: 'Sep', moisture: 66, optimal: 70 },
    { date: 'Oct', moisture: 70, optimal: 70 },
    { date: 'Nov', moisture: 68, optimal: 70 },
    { date: 'Dec', moisture: 64, optimal: 70 }
  ];

  const seasonData = [
    { season: 'Spring 2023', productivity: 85, yield: 420 },
    { season: 'Summer 2023', productivity: 92, yield: 480 },
    { season: 'Fall 2023', productivity: 78, yield: 380 },
    { season: 'Winter 2023', productivity: 65, yield: 290 },
    { season: 'Spring 2024', productivity: 88, yield: 450 },
    { season: 'Summer 2024', productivity: 95, yield: 510 }
  ];

  const fieldProductivity = [
    { field: 'North Field', corn: 420, wheat: 380, soybeans: 290 },
    { field: 'South Field', corn: 460, wheat: 340, soybeans: 310 },
    { field: 'East Field', corn: 390, wheat: 360, soybeans: 280 },
    { field: 'West Field', corn: 480, wheat: 320, soybeans: 300 }
  ];

  const profitabilityData = yieldData.map(item => ({
    crop: item.crop,
    profit: item.income - item.cost,
    profitMargin: ((item.income - item.cost) / item.income * 100).toFixed(1)
  }));

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  const handleExport = () => {
    const reportData = {
      period: selectedPeriod,
      generatedAt: new Date().toISOString(),
      yieldData,
      moistureData,
      seasonData,
      fieldProductivity,
      profitabilityData
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `famizz-analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePDFExport = () => {
    // Create a new window with the dashboard content for printing
    const printWindow = window.open('', '_blank');
    
    // Get the current dashboard HTML
    const dashboardContent = document.querySelector('.analytics-dashboard').innerHTML;
    
    // Create PDF-optimized HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Famizz Analytics Report - ${new Date().toLocaleDateString()}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #374151;
              background: white;
            }
            .pdf-container { 
              max-width: 210mm; 
              margin: 0 auto; 
              padding: 20px;
              background: white;
            }
            .pdf-header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #10B981;
              padding-bottom: 20px;
            }
            .pdf-header h1 {
              font-size: 28px;
              color: #1F2937;
              margin-bottom: 8px;
            }
            .pdf-header p {
              color: #6B7280;
              font-size: 14px;
            }
            .metrics-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
              margin-bottom: 30px;
            }
            .metric-card {
              background: #F9FAFB;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #E5E7EB;
            }
            .metric-label {
              font-size: 12px;
              color: #6B7280;
              text-transform: uppercase;
              font-weight: 600;
              margin-bottom: 8px;
            }
            .metric-value {
              font-size: 24px;
              font-weight: bold;
              color: #1F2937;
            }
            .section {
              margin-bottom: 40px;
              page-break-inside: avoid;
            }
            .section-title {
              font-size: 20px;
              font-weight: bold;
              color: #1F2937;
              margin-bottom: 15px;
              border-bottom: 1px solid #E5E7EB;
              padding-bottom: 8px;
            }
            .data-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
            }
            .data-table th,
            .data-table td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #E5E7EB;
            }
            .data-table th {
              background: #F3F4F6;
              font-weight: 600;
              color: #374151;
            }
            .summary-stats {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              text-align: center;
              margin-top: 20px;
            }
            .summary-stat {
              padding: 15px;
              background: #F0FDF4;
              border-radius: 8px;
            }
            .summary-stat .value {
              font-size: 24px;
              font-weight: bold;
              color: #16A34A;
              margin-bottom: 5px;
            }
            .summary-stat .label {
              font-size: 12px;
              color: #6B7280;
            }
            .generated-info {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #E5E7EB;
              font-size: 12px;
              color: #6B7280;
              text-align: center;
            }
            @media print {
              body { print-color-adjust: exact; }
              .section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="pdf-container">
            <div class="pdf-header">
              <h1>🌾 Famizz Analytics Report</h1>
              <p>Generated on ${new Date().toLocaleDateString()} | Period: ${selectedPeriod}</p>
            </div>
            
            <div class="section">
              <h2 class="section-title">Key Performance Metrics</h2>
              <div class="metrics-grid">
                <div class="metric-card">
                  <div class="metric-label">Total Yield</div>
                  <div class="metric-value">1,640 tons</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Profit Margin</div>
                  <div class="metric-value">28.5%</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Avg Soil Moisture</div>
                  <div class="metric-value">68.2%</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Active Fields</div>
                  <div class="metric-value">4</div>
                </div>
              </div>
            </div>

            <div class="section">
              <h2 class="section-title">Crop Yield Analysis</h2>
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>Yield (tons)</th>
                    <th>Cost ($)</th>
                    <th>Income ($)</th>
                    <th>Profit ($)</th>
                    <th>Margin (%)</th>
                  </tr>
                </thead>
                <tbody>
                  ${yieldData.map(item => {
                    const profit = item.income - item.cost;
                    const margin = ((profit / item.income) * 100).toFixed(1);
                    return `
                      <tr>
                        <td>${item.crop}</td>
                        <td>${item.yield}</td>
                        <td>${item.cost.toLocaleString()}</td>
                        <td>${item.income.toLocaleString()}</td>
                        <td>${profit.toLocaleString()}</td>
                        <td>${margin}%</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>

            <div class="section">
              <h2 class="section-title">Field Productivity Comparison</h2>
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Corn (tons/ha)</th>
                    <th>Wheat (tons/ha)</th>
                    <th>Soybeans (tons/ha)</th>
                  </tr>
                </thead>
                <tbody>
                  ${fieldProductivity.map(field => `
                    <tr>
                      <td>${field.field}</td>
                      <td>${field.corn}</td>
                      <td>${field.wheat}</td>
                      <td>${field.soybeans}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="section">
              <h2 class="section-title">Seasonal Performance</h2>
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Season</th>
                    <th>Productivity Score</th>
                    <th>Average Yield (tons)</th>
                  </tr>
                </thead>
                <tbody>
                  ${seasonData.map(season => `
                    <tr>
                      <td>${season.season}</td>
                      <td>${season.productivity}%</td>
                      <td>${season.yield}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="section">
              <h2 class="section-title">Performance Summary</h2>
              <div class="summary-stats">
                <div class="summary-stat">
                  <div class="value">↑ 12.5%</div>
                  <div class="label">Yield increase vs last season</div>
                </div>
                <div class="summary-stat">
                  <div class="value">$24,700</div>
                  <div class="label">Total profit this season</div>
                </div>
                <div class="summary-stat">
                  <div class="value">92%</div>
                  <div class="label">Average field efficiency</div>
                </div>
              </div>
            </div>

            <div class="generated-info">
              <p>This report was automatically generated by Famizz Analytics Dashboard</p>
              <p>For interactive charts and real-time data, please visit the web dashboard</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print dialog
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 analytics-dashboard">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="current">Current Season</option>
                <option value="last">Last Season</option>
                <option value="year">Full Year</option>
              </select>
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download size={20} />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Yield</p>
                <p className="text-2xl font-bold text-gray-900">1,640 tons</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Profit Margin</p>
                <p className="text-2xl font-bold text-gray-900">28.5%</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Soil Moisture</p>
                <p className="text-2xl font-bold text-gray-900">68.2%</p>
              </div>
              <Droplets className="h-8 w-8 text-cyan-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Fields</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Yield by Crop Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Farm Yield by Crop</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="crop" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="yield" fill="#10B981" name="Yield (tons)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cost vs Income Analysis */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cost vs Income Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="crop" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="cost" fill="#EF4444" name="Cost ($)" />
                <Bar dataKey="income" fill="#10B981" name="Income ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Profitability Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Profit Distribution by Crop</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={profitabilityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ crop, profitMargin }) => `${crop}: ${profitMargin}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="profit"
                >
                  {profitabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Soil Moisture Trends */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Soil Moisture Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={moistureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[50, 80]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="moisture" stroke="#3B82F6" strokeWidth={2} name="Actual Moisture (%)" />
                <Line type="monotone" dataKey="optimal" stroke="#10B981" strokeDasharray="5 5" name="Optimal Level (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Full Width Charts */}
        <div className="space-y-6">
          {/* Season Performance Comparison */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Season Performance Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={seasonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="season" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="productivity" fill="#3B82F6" name="Productivity Score" />
                <Bar yAxisId="right" dataKey="yield" fill="#10B981" name="Average Yield (tons)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Productivity by Field and Crop */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Productivity by Field and Crop</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={fieldProductivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="field" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="corn" fill="#F59E0B" name="Corn (tons/hectare)" />
                <Bar dataKey="wheat" fill="#10B981" name="Wheat (tons/hectare)" />
                <Bar dataKey="soybeans" fill="#3B82F6" name="Soybeans (tons/hectare)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">↑ 12.5%</p>
              <p className="text-sm text-gray-600">Yield increase vs last season</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">$24,700</p>
              <p className="text-sm text-gray-600">Total profit this season</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">92%</p>
              <p className="text-sm text-gray-600">Average field efficiency</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;