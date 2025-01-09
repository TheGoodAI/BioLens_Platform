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

type SaturationCategory = 'Normal' | 'Mild Hypoxemia' | 'Moderate Hypoxemia' | 'Severe Hypoxemia';

interface SaturationDataPoint {
  time: number;
  saturation: number;
  category: SaturationCategory;
}

interface SaturationAlert {
  time: number;
  saturation: number;
  category: SaturationCategory;
  message: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: SaturationDataPoint;
  }>;
  label?: number;
}

const OxygenSaturationMonitor: React.FC = () => {
  const [data, setData] = useState<SaturationDataPoint[]>([]);
  const [alerts, setAlerts] = useState<SaturationAlert[]>([]);
  const [stats, setStats] = useState({
    current: 0,
    average: 0,
    timeInNormal: 0,
    lowestReading: 0
  });

  const getSaturationCategory = (saturation: number): SaturationCategory => {
    if (saturation >= 94) return 'Normal';
    if (saturation >= 89) return 'Mild Hypoxemia';
    if (saturation >= 85) return 'Moderate Hypoxemia';
    return 'Severe Hypoxemia';
  };

  useEffect(() => {
    const generateData = () => {
      const timePoints = 144; // 24 hours in 10-minute intervals
      const data: SaturationDataPoint[] = [];
      const alerts: SaturationAlert[] = [];
      let prevCategory: SaturationCategory = 'Normal';

      for (let i = 0; i < timePoints; i++) {
        const timeOfDay = (i / timePoints) * 24;
        // Base saturation with daily variation
        const baseSaturation = 97;
        const circadianVariation = Math.sin((timeOfDay - 6) * Math.PI / 12) * 1;
        const randomVariation = (Math.random() - 0.5) * 2;
        
        // Add occasional drops in saturation
        const saturationDrop = i % 36 === 0 ? -(Math.random() * 10) : 0;
        
        const saturation = Math.min(100, Math.max(80, 
          Math.round(baseSaturation + circadianVariation + randomVariation + saturationDrop)
        ));
        
        const category = getSaturationCategory(saturation);

        if (category !== prevCategory) {
          alerts.push({
            time: i * 10,
            saturation,
            category,
            message: `Transition to ${category}`
          });
          prevCategory = category;
        }

        data.push({
          time: i * 10,
          saturation,
          category
        });
      }

      const saturations = data.map(d => d.saturation);
      const timeInNormal = (data.filter(d => d.category === 'Normal').length / data.length) * 100;

      setStats({
        current: data[data.length - 1].saturation,
        average: Math.round(saturations.reduce((a, b) => a + b) / saturations.length),
        timeInNormal: Math.round(timeInNormal),
        lowestReading: Math.min(...saturations)
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
      const data = payload[0].payload as SaturationDataPoint;
      const categoryColors = {
        'Normal': 'text-green-600',
        'Mild Hypoxemia': 'text-yellow-600',
        'Moderate Hypoxemia': 'text-orange-600',
        'Severe Hypoxemia': 'text-red-600'
      };

      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-medium text-gray-600 mb-1">{formatTime(data.time)}</p>
          <p className="text-xl font-bold text-gray-900 mb-1">
            {data.saturation}% SpO₂
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
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current SpO₂</h3>
            <div className={`text-2xl font-bold ${
              stats.current >= 94 ? 'text-green-600' :
              stats.current >= 89 ? 'text-yellow-600' :
              stats.current >= 85 ? 'text-orange-600' :
              'text-red-600'
            }`}>
              {stats.current}%
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">24h Average</h3>
            <div className="text-2xl font-bold text-blue-600">
              {stats.average}%
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Time in Normal Range</h3>
            <div className="text-2xl font-bold text-green-600">
              {stats.timeInNormal}%
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Lowest Reading</h3>
            <div className="text-2xl font-bold text-red-600">
              {stats.lowestReading}%
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-6">Oxygen Saturation Monitoring</h2>
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
                  domain={[80, 100]}
                  ticks={[80, 85, 89, 94, 100]}
                  label={{ value: 'SpO₂ (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <ReferenceArea y1={94} y2={100} fill="#D1FAE5" fillOpacity={0.3} />
                <ReferenceArea y1={89} y2={94} fill="#FEF3C7" fillOpacity={0.3} />
                <ReferenceArea y1={85} y2={89} fill="#FFEDD5" fillOpacity={0.3} />
                <ReferenceArea y1={80} y2={85} fill="#FEE2E2" fillOpacity={0.3} />

                <ReferenceLine y={94} stroke="#059669" strokeDasharray="3 3" label="Normal" />
                <ReferenceLine y={89} stroke="#D97706" strokeDasharray="3 3" label="Mild Hypoxemia" />
                <ReferenceLine y={85} stroke="#DC2626" strokeDasharray="3 3" label="Moderate Hypoxemia" />

                <Line
                  name="SpO₂"
                  type="monotone"
                  dataKey="saturation"
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
          <h2 className="text-lg font-bold mb-4">Saturation Alerts</h2>
          <div className="space-y-3">
            {alerts.slice(-5).reverse().map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  alert.category === 'Normal' ? 'bg-green-50 border-green-200' :
                  alert.category === 'Mild Hypoxemia' ? 'bg-yellow-50 border-yellow-200' :
                  alert.category === 'Moderate Hypoxemia' ? 'bg-orange-50 border-orange-200' :
                  'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className={`font-medium ${
                      alert.category === 'Normal' ? 'text-green-800' :
                      alert.category === 'Mild Hypoxemia' ? 'text-yellow-800' :
                      alert.category === 'Moderate Hypoxemia' ? 'text-orange-800' :
                      'text-red-800'
                    }`}>
                      {alert.message}
                    </span>
                    <span className="ml-2 text-gray-600">
                      ({alert.saturation}%)
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

export default OxygenSaturationMonitor;