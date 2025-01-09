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

// Types for data structure
interface HeartRateDataPoint {
  time: number;
  heartRate: number;
  severity: 'Healthy' | 'Borderline' | 'Severe' | 'Bradycardia';
}

interface Alert {
  time: number;
  severity: string;
  heartRate: number;
}

const HeartRateMonitor: React.FC = () => {
  const [data, setData] = useState<HeartRateDataPoint[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Calculate severity for a given heart rate
  const calculateSeverity = (heartRate: number) => {
    if (heartRate >= 60 && heartRate <= 100) return 'Healthy';
    if (heartRate > 100 && heartRate <= 120) return 'Borderline';
    if (heartRate > 120) return 'Severe';
    return 'Bradycardia';
  };

  // Generate realistic heart rate data
  useEffect(() => {
    const generateData = () => {
      const data: HeartRateDataPoint[] = [];
      const timePoints = 1440; // 24 hours in minutes
      const alerts: Alert[] = [];

      let prevSeverity = 'Healthy';

      for (let i = 0; i < timePoints; i++) {
        // Base heart rate with circadian rhythm
        const baseRate = 80;
        const timeOfDay = (i / timePoints) * 24;
        
        // Circadian rhythm variation
        const circadianVariation = Math.sin((timeOfDay - 6) * Math.PI / 12) * 10;
        
        // Activity spikes every 4 hours
        const activitySpike = (i % 240) < 30 ? Math.sin((i % 240) * Math.PI / 30) * 20 : 0;
        
        // Random variation
        const randomVariation = (Math.random() - 0.5) * 5;

        // Calculate heart rate
        const heartRate = Math.round(baseRate + circadianVariation + activitySpike + randomVariation);
        const severity = calculateSeverity(heartRate);

        // Generate alerts for severity changes
        if (severity !== prevSeverity) {
          alerts.push({
            time: i,
            severity,
            heartRate
          });
          prevSeverity = severity;
        }

        data.push({
          time: i,
          heartRate,
          severity
        });
      }

      setAlerts(alerts);
      return data;
    };

    setData(generateData());
  }, []);

  // Format time for display
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Custom tooltip component
  const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 shadow-lg rounded border">
          <p className="font-semibold mb-1">{formatTime(data.time)}</p>
          <p className="text-lg font-bold mb-1">{data.heartRate} BPM</p>
          <p className={`text-sm font-medium ${
            data.severity === 'Healthy' ? 'text-green-600' :
            data.severity === 'Borderline' ? 'text-yellow-600' :
            data.severity === 'Severe' ? 'text-red-600' :
            'text-orange-600'
          }`}>
            {data.severity}
          </p>
        </div>
      );
    }
    return null;
  };

  // Get the latest alerts
  const getLatestAlerts = () => {
    return alerts.slice(-5).reverse();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Main Chart Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Heart Rate Monitoring</h1>
        <div className="w-full h-[500px]">
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                dataKey="time"
                tickFormatter={formatTime}
                interval={120}
                stroke="#374151"
                label={{ value: 'Time (24h)', position: 'bottom', offset: 0 }}
              />
              <YAxis
                domain={[40, 140]}
                ticks={[40, 60, 80, 100, 120, 140]}
                stroke="#374151"
                label={{ value: 'Heart Rate (BPM)', angle: -90, position: 'left' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              {/* Reference Zones */}
              <ReferenceArea y1={0} y2={60} fill="#FEE2E2" fillOpacity={0.3} />
              <ReferenceArea y1={120} y2={140} fill="#FEE2E2" fillOpacity={0.3} />
              <ReferenceArea y1={100} y2={120} fill="#FEF3C7" fillOpacity={0.3} />

              {/* Reference Lines */}
              <ReferenceLine
                y={60}
                stroke="#059669"
                strokeDasharray="3 3"
                label={{ value: "Min Normal (60)", fill: '#059669', fontSize: 12 }}
              />
              <ReferenceLine
                y={100}
                stroke="#059669"
                strokeDasharray="3 3"
                label={{ value: "Max Normal (100)", fill: '#059669', fontSize: 12 }}
              />
              <ReferenceLine
                y={120}
                stroke="#DC2626"
                strokeDasharray="3 3"
                label={{ value: "Critical (120)", fill: '#DC2626', fontSize: 12 }}
              />

              {/* Heart Rate Line */}
              <Line
                name="Heart Rate"
                type="monotone"
                dataKey="heartRate"
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

      {/* Alerts Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Alerts</h2>
        <div className="space-y-3">
          {getLatestAlerts().map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                alert.severity === 'Healthy' ? 'bg-green-50 border-green-200' :
                alert.severity === 'Borderline' ? 'bg-yellow-50 border-yellow-200' :
                alert.severity === 'Severe' ? 'bg-red-50 border-red-200' :
                'bg-orange-50 border-orange-200'
              } border`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className={`font-medium ${
                    alert.severity === 'Healthy' ? 'text-green-800' :
                    alert.severity === 'Borderline' ? 'text-yellow-800' :
                    alert.severity === 'Severe' ? 'text-red-800' :
                    'text-orange-800'
                  }`}>
                    {alert.severity} Heart Rate Detected
                  </span>
                  <span className="ml-2 text-gray-600">({alert.heartRate} BPM)</span>
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
  );
};

export default HeartRateMonitor;