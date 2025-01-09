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

type RespCategory = 'Normal' | 'Elevated' | 'Moderate Elevation' | 'Critical';

interface RespDataPoint {
  time: number;
  rate: number;
  category: RespCategory;
}

interface RespAlert {
  time: number;
  rate: number;
  category: RespCategory;
  message: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: RespDataPoint;
  }>;
  label?: number;
}

const RespiratoryRateMonitor: React.FC = () => {
  const [data, setData] = useState<RespDataPoint[]>([]);
  const [alerts, setAlerts] = useState<RespAlert[]>([]);
  const [stats, setStats] = useState({
    current: 0,
    average: 0,
    maxRate: 0,
    timeInNormal: 0
  });

  const getRespCategory = (rate: number): RespCategory => {
    if (rate >= 12 && rate <= 20) return 'Normal';
    if (rate <= 24) return 'Elevated';
    if (rate <= 28) return 'Moderate Elevation';
    return 'Critical';
  };

  useEffect(() => {
    const generateData = () => {
      const timePoints = 144; // 24 hours in 10-minute intervals
      const data: RespDataPoint[] = [];
      const alerts: RespAlert[] = [];
      let prevCategory: RespCategory = 'Normal';

      for (let i = 0; i < timePoints; i++) {
        const timeOfDay = (i / timePoints) * 24;
        // Base respiratory rate with circadian rhythm
        const baseRate = 16;
        const circadianVariation = Math.sin((timeOfDay - 6) * Math.PI / 12) * 2;
        const activitySpike = i % 36 === 0 ? Math.random() * 8 : 0;
        const randomVariation = (Math.random() - 0.5) * 2;
        
        const rate = Math.round(baseRate + circadianVariation + activitySpike + randomVariation);
        const category = getRespCategory(rate);
        
        if (category !== prevCategory) {
          alerts.push({
            time: i * 10,
            rate,
            category,
            message: `Transition to ${category}`
          });
          prevCategory = category;
        }

        data.push({
          time: i * 10,
          rate,
          category
        });
      }

      const rates = data.map(d => d.rate);
      const timeInNormal = (data.filter(d => d.category === 'Normal').length / data.length) * 100;

      setStats({
        current: data[data.length - 1].rate,
        average: Math.round(rates.reduce((a, b) => a + b) / rates.length),
        maxRate: Math.max(...rates),
        timeInNormal: Math.round(timeInNormal)
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
      const data = payload[0].payload as RespDataPoint;
      const categoryColors = {
        'Normal': 'text-green-600',
        'Elevated': 'text-yellow-600',
        'Moderate Elevation': 'text-orange-600',
        'Critical': 'text-red-600'
      };

      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-medium text-gray-600 mb-1">{formatTime(data.time)}</p>
          <p className="text-xl font-bold text-gray-900 mb-1">
            {data.rate} breaths/min
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
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current Rate</h3>
            <div className={`text-2xl font-bold ${
              stats.current <= 20 && stats.current >= 12 ? 'text-green-600' :
              stats.current <= 24 ? 'text-yellow-600' :
              stats.current <= 28 ? 'text-orange-600' :
              'text-red-600'
            }`}>
              {stats.current} breaths/min
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Average Rate</h3>
            <div className="text-2xl font-bold text-blue-600">
              {stats.average} breaths/min
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Maximum Rate</h3>
            <div className="text-2xl font-bold text-red-600">
              {stats.maxRate} breaths/min
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Time in Normal Range</h3>
            <div className="text-2xl font-bold text-green-600">
              {stats.timeInNormal}%
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-6">Respiratory Rate Monitoring</h2>
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
                  domain={[10, 35]}
                  ticks={[10, 12, 16, 20, 24, 28, 32, 35]}
                  label={{ value: 'Respiratory Rate (breaths/min)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <ReferenceArea y1={12} y2={20} fill="#D1FAE5" fillOpacity={0.3} />
                <ReferenceArea y1={20} y2={24} fill="#FEF3C7" fillOpacity={0.3} />
                <ReferenceArea y1={24} y2={28} fill="#FFEDD5" fillOpacity={0.3} />
                <ReferenceArea y1={28} y2={35} fill="#FEE2E2" fillOpacity={0.3} />

                <ReferenceLine y={20} stroke="#059669" strokeDasharray="3 3" label="Normal Range" />
                <ReferenceLine y={24} stroke="#D97706" strokeDasharray="3 3" label="Elevated" />
                <ReferenceLine y={28} stroke="#DC2626" strokeDasharray="3 3" label="Critical" />

                <Line
                  name="Respiratory Rate"
                  type="monotone"
                  dataKey="rate"
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
          <h2 className="text-lg font-bold mb-4">Rate Alerts</h2>
          <div className="space-y-3">
            {alerts.slice(-5).reverse().map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  alert.category === 'Normal' ? 'bg-green-50 border-green-200' :
                  alert.category === 'Elevated' ? 'bg-yellow-50 border-yellow-200' :
                  alert.category === 'Moderate Elevation' ? 'bg-orange-50 border-orange-200' :
                  'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className={`font-medium ${
                      alert.category === 'Normal' ? 'text-green-800' :
                      alert.category === 'Elevated' ? 'text-yellow-800' :
                      alert.category === 'Moderate Elevation' ? 'text-orange-800' :
                      'text-red-800'
                    }`}>
                      {alert.message}
                    </span>
                    <span className="ml-2 text-gray-600">
                      ({alert.rate} breaths/min)
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

export default RespiratoryRateMonitor;