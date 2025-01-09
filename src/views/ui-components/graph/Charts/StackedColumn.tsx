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

type HRVCategory = 'High' | 'Moderate' | 'Low';

interface HRVDataPoint {
  time: number;
  hrv: number;
  category: HRVCategory;
}

interface HRVAlert {
  time: number;
  hrv: number;
  category: HRVCategory;
  message: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: HRVDataPoint;
  }>;
  label?: number;
}

const HRVMonitor: React.FC = () => {
  const [data, setData] = useState<HRVDataPoint[]>([]);
  const [alerts, setAlerts] = useState<HRVAlert[]>([]);
  const [stats, setStats] = useState({
    current: 0,
    average: 0,
    timeInHighHRV: 0,
    lowestHRV: 0
  });

  const getHRVCategory = (hrv: number): HRVCategory => {
    if (hrv >= 60) return 'High';
    if (hrv >= 50) return 'Moderate';
    return 'Low';
  };

  useEffect(() => {
    const generateData = () => {
      const timePoints = 144; // 24 hours in 10-minute intervals
      const data: HRVDataPoint[] = [];
      const alerts: HRVAlert[] = [];
      let prevCategory: HRVCategory = 'High';

      for (let i = 0; i < timePoints; i++) {
        const timeOfDay = (i / timePoints) * 24;
        // Base HRV with circadian rhythm
        const baseHRV = 55;
        const circadianVariation = Math.sin((timeOfDay - 6) * Math.PI / 12) * 10;
        const stressVariation = i % 36 === 0 ? -(Math.random() * 15) : 0;
        const randomVariation = (Math.random() - 0.5) * 5;
        
        const hrv = Math.round(baseHRV + circadianVariation + stressVariation + randomVariation);
        const category = getHRVCategory(hrv);
        
        if (category !== prevCategory) {
          alerts.push({
            time: i * 10,
            hrv,
            category,
            message: `Alert: ${category} HRV Detected`
          });
          prevCategory = category;
        }

        data.push({
          time: i * 10,
          hrv,
          category
        });
      }

      const hrvValues = data.map(d => d.hrv);
      const timeInHigh = (data.filter(d => d.category === 'High').length / data.length) * 100;

      setStats({
        current: data[data.length - 1].hrv,
        average: Math.round(hrvValues.reduce((a, b) => a + b) / hrvValues.length),
        timeInHighHRV: Math.round(timeInHigh),
        lowestHRV: Math.min(...hrvValues)
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
      const data = payload[0].payload as HRVDataPoint;
      const categoryColors = {
        'High': 'text-green-600',
        'Moderate': 'text-yellow-600',
        'Low': 'text-red-600'
      };

      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-medium text-gray-600 mb-1">{formatTime(data.time)}</p>
          <p className="text-xl font-bold text-gray-900 mb-1">
            {data.hrv} ms
          </p>
          <p className={`text-sm font-medium ${categoryColors[data.category]}`}>
            {data.category} HRV
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
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current HRV</h3>
            <div className={`text-2xl font-bold ${
              stats.current >= 60 ? 'text-green-600' :
              stats.current >= 50 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {stats.current} ms
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Average HRV</h3>
            <div className="text-2xl font-bold text-blue-600">
              {stats.average} ms
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Time in High HRV</h3>
            <div className="text-2xl font-bold text-green-600">
              {stats.timeInHighHRV}%
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Lowest HRV</h3>
            <div className="text-2xl font-bold text-red-600">
              {stats.lowestHRV} ms
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-6">Heart Rate Variability Monitoring</h2>
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
                  domain={[40, 70]}
                  ticks={[40, 45, 50, 55, 60, 65, 70]}
                  label={{ value: 'HRV (ms)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <ReferenceArea y1={60} y2={70} fill="#D1FAE5" fillOpacity={0.3} />
                <ReferenceArea y1={50} y2={60} fill="#FEF3C7" fillOpacity={0.3} />
                <ReferenceArea y1={40} y2={50} fill="#FEE2E2" fillOpacity={0.3} />

                <ReferenceLine y={60} stroke="#059669" strokeDasharray="3 3" label="High HRV" />
                <ReferenceLine y={50} stroke="#D97706" strokeDasharray="3 3" label="Moderate HRV" />

                <Line
                  name="HRV"
                  type="monotone"
                  dataKey="hrv"
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
          <h2 className="text-lg font-bold mb-4">HRV Alerts</h2>
          <div className="space-y-3">
            {alerts.slice(-5).reverse().map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  alert.category === 'High' ? 'bg-green-50 border-green-200' :
                  alert.category === 'Moderate' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className={`font-medium ${
                      alert.category === 'High' ? 'text-green-800' :
                      alert.category === 'Moderate' ? 'text-yellow-800' :
                      'text-red-800'
                    }`}>
                      {alert.message}
                    </span>
                    <span className="ml-2 text-gray-600">
                      ({alert.hrv} ms)
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

export default HRVMonitor;