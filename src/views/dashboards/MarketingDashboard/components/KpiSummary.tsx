import React, { useState } from "react";
import { 
  BellRing, Clock, UserPlus, Phone, MessageSquare, AlertTriangle,
  Settings, Wifi
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  Tooltip, ComposedChart, Area, Legend
} from 'recharts';

// Types
interface Vital {
  value: string;
  alert: boolean;
  trend?: "up" | "down";
}

// Sample data
const generateVitalData = (baseValue: number, variance: number) => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: baseValue + Math.sin(i / 3) * variance + Math.random() * (variance / 2)
  }));
};

const performanceData = [
  { month: 'Jan', score: 85, target: 80, previous: 75 },
  { month: 'Feb', score: 88, target: 80, previous: 78 },
  { month: 'Mar', score: 82, target: 80, previous: 80 },
  { month: 'Apr', score: 91, target: 80, previous: 82 },
  { month: 'May', score: 84, target: 80, previous: 79 },
  { month: 'Jun', score: 89, target: 80, previous: 83 },
  { month: 'Jul', score: 93, target: 80, previous: 85 },
  { month: 'Aug', score: 87, target: 80, previous: 82 },
  { month: 'Sep', score: 90, target: 80, previous: 84 },
  { month: 'Oct', score: 86, target: 80, previous: 81 },
  { month: 'Nov', score: 92, target: 80, previous: 86 },
  { month: 'Dec', score: 95, target: 80, previous: 88 }
];

const CRSDashboard: React.FC = () => {
  // Chart components
  const VitalChart: React.FC<{title: string; data: any[]; color: string}> = 
    ({title, data, color}) => (
    <div className="bg-white border border-gray-200 rounded-lg p-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <select className="text-xs border rounded px-2 py-1 bg-gray-50">
          <option>24h</option>
          <option>7d</option>
        </select>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" tick={{fontSize: 10}} interval={4} />
            <YAxis tick={{fontSize: 10}} width={30} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const PerformanceChart: React.FC = () => (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="month" 
          tick={{ fontSize: 12, fill: '#6B7280' }}
          tickLine={{ stroke: '#E5E7EB' }}
        />
        <YAxis 
          yAxisId="left"
          domain={[0, 100]}
          tick={{ fontSize: 12, fill: '#6B7280' }}
          tickLine={{ stroke: '#E5E7EB' }}
          axisLine={{ stroke: '#E5E7EB' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            padding: '8px'
          }}
        />
        <Legend 
          verticalAlign="top" 
          height={36}
          formatter={(value) => (
            <span style={{ color: '#4B5563', fontSize: '12px' }}>
              {value === 'score' ? 'Current Score' : 
               value === 'previous' ? 'Previous Period' : 'Target'}
            </span>
          )}
        />
        <Area 
          yAxisId="left"
          type="monotone" 
          dataKey="previous"
          fill="#E3F2FD"
          stroke="#90CAF9"
          strokeWidth={1}
          dot={false}
        />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="score"
          stroke="#2196F3"
          strokeWidth={2}
          dot={{ r: 4, fill: '#2196F3' }}
          activeDot={{ r: 6 }}
        />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="target"
          stroke="#9CA3AF"
          strokeDasharray="4 4"
          strokeWidth={1}
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4">
          <div className="flex justify-between items-center h-12">
            <h1 className="text-lg font-bold text-blue-700">CRS Monitor</h1>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <BellRing className="h-5 w-5 text-gray-500 hover:text-gray-600 cursor-pointer" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full" />
              </div>
              <button className="flex items-center px-3 py-1 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
                <UserPlus className="h-3.5 w-3.5 mr-1" />
                <span>Assign Staff</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="px-4 py-4 space-y-4">
        {/* Main Content */}
        <div className="grid grid-cols-2 gap-4">
          {/* Patient Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">John Doe</h3>
                <p className="text-xs text-gray-500">PT-1234 • CAR-T Cell Therapy</p>
              </div>
              <div className="flex space-x-2">
                <Phone className="h-4 w-4 text-gray-600" />
                <MessageSquare className="h-4 w-4 text-gray-600" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Temperature", value: "38.5°C", trend: "up" },
                { label: "Heart Rate", value: "110 bpm", trend: "up" },
                { label: "Blood Pressure", value: "95/60", trend: "down" }
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-500">{item.label}</div>
                  <div className="font-semibold text-sm text-red-500">{item.value}</div>
                  <div className={`text-xs ${
                    item.trend === "up" ? "text-red-500" : "text-green-500"
                  }`}>
                    {item.trend === "up" ? "↑" : "↓"} from previous
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Status */}
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Settings className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <div className="text-blue-700">Algorithm Status: Active and Monitoring</div>
                  <div className="text-sm text-blue-600 mt-1">
                    Last Calibration: 2024-12-08 09:00 AM
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { 
                  title: "Temperature",
                  range: "36.5°C - 37.5°C",
                  status: "NORMAL",
                  statusColor: "text-green-500"
                },
                {
                  title: "Heart Rate",
                  range: "60-100 bpm",
                  status: "WARNING",
                  statusColor: "text-yellow-500"
                }
              ].map((device) => (
                <div key={device.title} className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">{device.title}</span>
                    <Wifi className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Range</span>
                      <span className="text-xs">{device.range}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Status</span>
                      <span className={`text-xs font-medium ${device.statusColor}`}>
                        {device.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vital Charts Grid */}
        <div className="grid grid-cols-4 gap-4">
          <VitalChart 
            title="Temperature Trend" 
            data={generateVitalData(37, 1)} 
            color="#ef4444"
          />
          <VitalChart 
            title="Heart Rate Trend" 
            data={generateVitalData(80, 20)} 
            color="#3b82f6"
          />
          <VitalChart 
            title="Blood Pressure Trend" 
            data={generateVitalData(120, 10)} 
            color="#10b981"
          />
          <VitalChart 
            title="Oxygen Saturation Trend" 
            data={generateVitalData(98, 2)} 
            color="#8b5cf6"
          />
        </div>

        {/* Performance Score */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Lead performance score</h2>
              <p className="text-sm text-gray-500 mt-1">Year to date performance tracking</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md font-medium">
                All
              </button>
              <button className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50 rounded-md">
                Compare
              </button>
              <button className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50 rounded-md">
                Small
              </button>
            </div>
          </div>
          <div className="h-64">
            <PerformanceChart />
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6">
            {[
              { label: 'Average Score', value: '88.5', change: '+3.2', trend: 'up' },
              { label: 'Target Score', value: '80.0', change: '0.0', trend: 'neutral' },
              { label: 'Best Month', value: 'Dec', change: '95.0', trend: 'up' },
              { label: 'Trend', value: 'Positive', change: '+2.8%', trend: 'up' }
            ].map((metric) => (
              <div key={metric.label} className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">{metric.label}</div>
                <div className="text-lg font-semibold mt-1">{metric.value}</div>
                <div className={`text-sm mt-1 ${
                  metric.trend === 'up' ? 'text-green-500' : 
                  metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {metric.change}
                  {metric.trend !== 'neutral' && (
                    <span className="ml-1">
                      {metric.trend === 'up' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRSDashboard;