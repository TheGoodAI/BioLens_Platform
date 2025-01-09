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

type BPCategory = 'Normal' | 'Elevated' | 'Hypertension' | 'Hypotension';

interface BPDataPoint {
  time: number;
  systolic: number;
  diastolic: number;
  category: BPCategory;
}

interface BPAlert {
  time: number;
  systolic: number;
  diastolic: number;
  category: BPCategory;
}

interface BPStats {
  current: { systolic: number; diastolic: number };
  average: { systolic: number; diastolic: number };
  categories: Record<Lowercase<BPCategory>, number>;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: BPDataPoint;
  }>;
  label?: number;
}

const BloodPressureMonitor: React.FC = () => {
  const [data, setData] = useState<BPDataPoint[]>([]);
  const [alerts, setAlerts] = useState<BPAlert[]>([]);
  const [stats, setStats] = useState<BPStats>({
    current: { systolic: 0, diastolic: 0 },
    average: { systolic: 0, diastolic: 0 },
    categories: { normal: 0, elevated: 0, hypertension: 0, hypotension: 0 }
  });

  const getBPCategory = (systolic: number, diastolic: number): BPCategory => {
    if (systolic < 90 || diastolic < 60) return 'Hypotension';
    if (systolic > 140 || diastolic > 90) return 'Hypertension';
    if (90 <= systolic && systolic <= 120 && 60 <= diastolic && diastolic <= 80) return 'Normal';
    return 'Elevated';
  };

  useEffect(() => {
    const generateData = () => {
      const timePoints = 144;
      const data: BPDataPoint[] = [];
      const alerts: BPAlert[] = [];
      let prevCategory: BPCategory = 'Normal';

      for (let i = 0; i < timePoints; i++) {
        const timeOfDay = (i / timePoints) * 24;
        const circadianVariation = Math.sin((timeOfDay - 6) * Math.PI / 12) * 10;
        const activitySpike = i % 36 < 6 ? Math.sin((i % 36) * Math.PI / 6) * 15 : 0;
        
        const systolic = Math.round(120 + circadianVariation + activitySpike + (Math.random() - 0.5) * 10);
        const diastolic = Math.round(80 + (circadianVariation * 0.5) + (activitySpike * 0.5) + (Math.random() - 0.5) * 5);
        
        const category = getBPCategory(systolic, diastolic);
        
        if (category !== prevCategory) {
          alerts.push({ time: i * 10, systolic, diastolic, category });
          prevCategory = category;
        }

        data.push({ time: i * 10, systolic, diastolic, category });
      }

      const avgSystolic = Math.round(data.reduce((sum, d) => sum + d.systolic, 0) / data.length);
      const avgDiastolic = Math.round(data.reduce((sum, d) => sum + d.diastolic, 0) / data.length);
      
      const categoryCount = data.reduce((acc, d) => {
        acc[d.category.toLowerCase() as Lowercase<BPCategory>] += 1;
        return acc;
      }, { normal: 0, elevated: 0, hypertension: 0, hypotension: 0 });

      setStats({
        current: { systolic: data[data.length - 1].systolic, diastolic: data[data.length - 1].diastolic },
        average: { systolic: avgSystolic, diastolic: avgDiastolic },
        categories: categoryCount
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
      const data = payload[0].payload as BPDataPoint;
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-medium text-gray-600 mb-1">{formatTime(data.time)}</p>
          <p className="text-xl font-bold text-gray-900 mb-1">
            {data.systolic}/{data.diastolic} mmHg
          </p>
          <p className={`text-sm font-medium ${
            data.category === 'Normal' ? 'text-green-600' :
            data.category === 'Elevated' ? 'text-yellow-600' :
            data.category === 'Hypertension' ? 'text-red-600' :
            'text-orange-600'
          }`}>
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
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current BP</h3>
            <div className="text-2xl font-bold text-blue-600">
              {stats.current.systolic}/{stats.current.diastolic}
              <span className="text-base ml-1 text-gray-500">mmHg</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Average BP</h3>
            <div className="text-2xl font-bold text-blue-600">
              {stats.average.systolic}/{stats.average.diastolic}
              <span className="text-base ml-1 text-gray-500">mmHg</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-2">BP Distribution</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(stats.categories).map(([category, count]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className={`capitalize ${
                    category === 'normal' ? 'text-green-600' :
                    category === 'elevated' ? 'text-yellow-600' :
                    category === 'hypertension' ? 'text-red-600' :
                    'text-orange-600'
                  }`}>
                    {category}:
                  </span>
                  <span className="font-bold">
                    {Math.round(count / data.length * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-6">Blood Pressure Monitoring</h2>
          <div className="w-full h-[400px]">
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="time"
                  tickFormatter={formatTime}
                  interval={12}
                  label={{ value: 'Time (24h)', position: 'bottom' }}
                />
                <YAxis
                  domain={[40, 200]}
                  ticks={[40, 60, 80, 90, 100, 120, 140, 160, 180, 200]}
                  label={{ value: 'mmHg', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <ReferenceArea y1={140} y2={200} fill="#FEE2E2" fillOpacity={0.3} />
                <ReferenceArea y1={120} y2={140} fill="#FEF3C7" fillOpacity={0.3} />
                <ReferenceArea y1={90} y2={120} fill="#D1FAE5" fillOpacity={0.3} />
                <ReferenceArea y1={40} y2={90} fill="#FEF9C3" fillOpacity={0.3} />

                <ReferenceLine y={140} stroke="#DC2626" strokeDasharray="3 3" label="Hypertension" />
                <ReferenceLine y={120} stroke="#F59E0B" strokeDasharray="3 3" label="Elevated" />
                <ReferenceLine y={90} stroke="#059669" strokeDasharray="3 3" label="Normal" />

                <Line
                  name="Systolic"
                  type="monotone"
                  dataKey="systolic"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  name="Diastolic"
                  type="monotone"
                  dataKey="diastolic"
                  stroke="#10B981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">Recent Alerts</h2>
          <div className="space-y-3">
            {alerts.slice(-5).reverse().map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  alert.category === 'Normal' ? 'bg-green-50 border-green-200' :
                  alert.category === 'Elevated' ? 'bg-yellow-50 border-yellow-200' :
                  alert.category === 'Hypertension' ? 'bg-red-50 border-red-200' :
                  'bg-orange-50 border-orange-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className={`font-medium ${
                      alert.category === 'Normal' ? 'text-green-800' :
                      alert.category === 'Elevated' ? 'text-yellow-800' :
                      alert.category === 'Hypertension' ? 'text-red-800' :
                      'text-orange-800'
                    }`}>
                      {alert.category}
                    </span>
                    <span className="ml-2 text-gray-600">
                      ({alert.systolic}/{alert.diastolic} mmHg)
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

export default BloodPressureMonitor;