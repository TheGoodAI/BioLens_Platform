import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  ReferenceArea,
  Legend
} from 'recharts';

type TempCategory = 'Normal' | 'Mild Hyperthermia' | 'Moderate Hyperthermia' | 'Fever' | 'Hypothermia';

interface TempDataPoint {
  time: number;
  temperature: number;
  category: TempCategory;
}

interface TempAlert {
  time: number;
  temperature: number;
  category: TempCategory;
  message: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: TempDataPoint;
  }>;
  label?: number;
}

const SkinTemperatureMonitor: React.FC = () => {
  const [data, setData] = useState<TempDataPoint[]>([]);
  const [alerts, setAlerts] = useState<TempAlert[]>([]);
  const [stats, setStats] = useState({
    current: 0,
    max: 0,
    min: 0,
    average: 0
  });

  const getTemperatureCategory = (temp: number): TempCategory => {
    if (temp < 36.1) return 'Hypothermia';
    if (temp <= 37.5) return 'Normal';
    if (temp <= 37.8) return 'Mild Hyperthermia';
    if (temp <= 38.5) return 'Moderate Hyperthermia';
    return 'Fever';
  };

  useEffect(() => {
    const generateData = () => {
      const timePoints = 144; // 24 hours in 10-minute intervals
      const data: TempDataPoint[] = [];
      const alerts: TempAlert[] = [];
      let prevCategory: TempCategory = 'Normal';

      for (let i = 0; i < timePoints; i++) {
        const timeOfDay = (i / timePoints) * 24;
        // Circadian rhythm variation
        const baseTemp = 37;
        const circadianVariation = Math.sin((timeOfDay - 6) * Math.PI / 12) * 0.5;
        const randomVariation = (Math.random() - 0.5) * 0.3;
        
        // Add occasional fever spikes
        const feverSpike = i % 48 === 0 ? Math.random() * 1.5 : 0;
        
        const temperature = +(baseTemp + circadianVariation + randomVariation + feverSpike).toFixed(1);
        const category = getTemperatureCategory(temperature);

        if (category !== prevCategory) {
          alerts.push({
            time: i * 10,
            temperature,
            category,
            message: `Transition to ${category}`
          });
          prevCategory = category;
        }

        data.push({
          time: i * 10,
          temperature,
          category
        });
      }

      const temperatures = data.map(d => d.temperature);
      setStats({
        current: data[data.length - 1].temperature,
        max: Math.max(...temperatures),
        min: Math.min(...temperatures),
        average: +(temperatures.reduce((a, b) => a + b) / temperatures.length).toFixed(1)
      });

      setAlerts(alerts);
      return data;
    };

    setData(generateData());
  }, []);

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as TempDataPoint;
      const categoryColors = {
        'Normal': 'text-green-600',
        'Mild Hyperthermia': 'text-yellow-600',
        'Moderate Hyperthermia': 'text-orange-600',
        'Fever': 'text-red-600',
        'Hypothermia': 'text-blue-600'
      };

      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-medium text-gray-600 mb-1">{formatTime(data.time)}</p>
          <p className="text-xl font-bold text-gray-900 mb-1">
            {data.temperature}°C
          </p>
          <p className={`text-sm font-medium ${categoryColors[data.category]}`}>
            {data.category}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current Temperature</h3>
            <div className="text-2xl font-bold text-blue-600">
              {stats.current}°C
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Average</h3>
            <div className="text-2xl font-bold text-blue-600">
              {stats.average}°C
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Range</h3>
            <div className="text-2xl font-bold text-blue-600">
              {stats.min} - {stats.max}°C
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
            <div className={`text-2xl font-bold ${
              getTemperatureCategory(stats.current) === 'Normal' ? 'text-green-600' :
              getTemperatureCategory(stats.current) === 'Mild Hyperthermia' ? 'text-yellow-600' :
              getTemperatureCategory(stats.current) === 'Moderate Hyperthermia' ? 'text-orange-600' :
              getTemperatureCategory(stats.current) === 'Fever' ? 'text-red-600' :
              'text-blue-600'
            }`}>
              {getTemperatureCategory(stats.current)}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-6">Skin Temperature Monitoring</h2>
          <div className="w-full h-[400px]">
            <ResponsiveContainer>
              <LineChart 
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="time"
                  tickFormatter={formatTime}
                  interval={12}
                  label={{ value: 'Time (24h)', position: 'bottom' }}
                />
                <YAxis
                  domain={[35.5, 40]}
                  ticks={[35.5, 36.1, 36.5, 37, 37.5, 37.8, 38, 38.5, 39, 39.5, 40]}
                  label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <ReferenceArea y1={38.5} y2={40} fill="#FEE2E2" fillOpacity={0.3} />
                <ReferenceArea y1={37.8} y2={38.5} fill="#FFEDD5" fillOpacity={0.3} />
                <ReferenceArea y1={37.2} y2={37.8} fill="#FEF3C7" fillOpacity={0.3} />
                <ReferenceArea y1={36.1} y2={37.2} fill="#D1FAE5" fillOpacity={0.3} />
                <ReferenceArea y1={35.5} y2={36.1} fill="#DBEAFE" fillOpacity={0.3} />

                <ReferenceLine y={38.5} stroke="#DC2626" strokeDasharray="3 3" label="Fever" />
                <ReferenceLine y={37.8} stroke="#F97316" strokeDasharray="3 3" label="Moderate Hyperthermia" />
                <ReferenceLine y={37.2} stroke="#EAB308" strokeDasharray="3 3" label="Mild Hyperthermia" />
                <ReferenceLine y={36.1} stroke="#059669" strokeDasharray="3 3" label="Normal Range" />

                <Line
                  name="Temperature"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    stroke: '#2563EB',
                    strokeWidth: 2,
                    fill: 'white'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">Temperature Alerts</h2>
          <div className="space-y-3">
            {alerts.slice(-5).reverse().map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  alert.category === 'Normal' ? 'bg-green-50 border-green-200' :
                  alert.category === 'Mild Hyperthermia' ? 'bg-yellow-50 border-yellow-200' :
                  alert.category === 'Moderate Hyperthermia' ? 'bg-orange-50 border-orange-200' :
                  alert.category === 'Fever' ? 'bg-red-50 border-red-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className={`font-medium ${
                      alert.category === 'Normal' ? 'text-green-800' :
                      alert.category === 'Mild Hyperthermia' ? 'text-yellow-800' :
                      alert.category === 'Moderate Hyperthermia' ? 'text-orange-800' :
                      alert.category === 'Fever' ? 'text-red-800' :
                      'text-blue-800'
                    }`}>
                      {alert.message}
                    </span>
                    <span className="ml-2 text-gray-600">
                      ({alert.temperature}°C)
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatTime(alert.time)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinTemperatureMonitor;