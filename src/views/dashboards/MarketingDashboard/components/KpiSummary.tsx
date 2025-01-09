import React, { useState, useEffect, ReactNode } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer
} from 'recharts';
import { 
  BellRing, UserPlus, Phone, MessageSquare, Settings, Wifi,
  Clock, Activity, TrendingUp, Filter, Download
} from 'lucide-react';

// Declare window.fs type
declare global {
  interface Window {
    fs: {
      readFile(path: string, options?: { encoding?: string }): Promise<Uint8Array | string>;
    }
  }
}

// Sample data generator
const generateSampleData = (count: number): PatientData[] => {
  const firstNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Sarah'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return {
      Patient_ID: `PT${String(i + 1).padStart(4, '0')}`,
      Patient_Name: `${firstName} ${lastName}`,
      Nationality: ['American', 'British', 'Canadian', 'Australian', 'Indian', 'Chinese'][Math.floor(Math.random() * 6)],
      Gender: Math.random() > 0.5 ? 'Male' : 'Female',
      Age: 20 + Math.floor(Math.random() * 60),
      Temperature: Number((36.5 + Math.random() * 2).toFixed(1)),
      SpO2: Math.min(100, 90 + Math.floor(Math.random() * 10)),
      Heart_Rate_bpm: 60 + Math.floor(Math.random() * 40),
      Systolic_BP_mmHg: 100 + Math.floor(Math.random() * 40),
      Diastolic_BP_mmHg: 60 + Math.floor(Math.random() * 30),
      Respiratory_Rate: 12 + Math.floor(Math.random() * 8),
      HRV: Number((40 + Math.random() * 20).toFixed(1)),
      Chills: Math.random() > 0.7 ? 'Yes' : 'No',
      Fatigue: Math.random() > 0.6 ? 'Yes' : 'No',
      Headache: Math.random() > 0.8 ? 'Yes' : 'No',
      Activity_Level: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
      ICANS_Grade: Math.floor(Math.random() * 5),
      CRS: Math.floor(Math.random() * 5)
    };
  });
};

interface PatientData {
  Patient_ID: string;
  Patient_Name: string;
  Nationality: string;
  Gender: string;
  Age: number;
  Temperature: number;
  SpO2: number;
  Heart_Rate_bpm: number;
  Systolic_BP_mmHg: number;
  Diastolic_BP_mmHg: number;
  Respiratory_Rate: number;
  HRV: number;
  Chills: string;
  Fatigue: string;
  Headache: string;
  Activity_Level: string;
  ICANS_Grade: number;
  CRS: number;
}

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
    {children}
  </div>
);

interface VitalChartProps {
  title: string;
  data: Array<{ time: string; value: number }>;
  color: string;
}

const VitalChart: React.FC<VitalChartProps> = ({ title, data, color }) => (
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
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={color} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const BiomarkerDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('24h');
  const [allPatients, setAllPatients] = useState<PatientData[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate sample data when component mounts
    const loadData = () => {
      try {
        setLoading(true);
        const patients = generateSampleData(10000); // Generate 10,000 sample patients
        setAllPatients(patients);
        setSelectedPatient(patients[0]); // Set first patient as default
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Helper functions
  const getCRSStatus = (crsGrade: number) => {
    switch(crsGrade) {
      case 0: return { text: 'No CRS', color: 'text-green-600' };
      case 1: return { text: 'Grade 1 - Mild', color: 'text-yellow-600' };
      case 2: return { text: 'Grade 2 - Moderate', color: 'text-amber-600' };
      case 3: return { text: 'Grade 3 - Severe', color: 'text-red-600' };
      case 4: return { text: 'Grade 4 - Life-Threatening', color: 'text-red-800' };
      default: return { text: 'Unknown', color: 'text-gray-600' };
    }
  };

  const getVitalStatus = (vital: string, value: number): 'up' | 'down' | 'normal' => {
    const ranges = {
      temperature: { min: 36.5, max: 37.5 },
      heartRate: { min: 60, max: 100 },
      spO2: { min: 95, max: 100 },
      systolicBP: { min: 90, max: 120 }
    };

    switch(vital) {
      case 'temperature':
        return value > ranges.temperature.max ? 'up' : value < ranges.temperature.min ? 'down' : 'normal';
      case 'heartRate':
        return value > ranges.heartRate.max ? 'up' : value < ranges.heartRate.min ? 'down' : 'normal';
      case 'spO2':
        return value < ranges.spO2.min ? 'down' : 'normal';
      case 'systolicBP':
        return value > ranges.systolicBP.max ? 'up' : value < ranges.systolicBP.min ? 'down' : 'normal';
      default:
        return 'normal';
    }
  };

  const generateVitalHistory = (current: number, variance: number, count: number = 10) => {
    return Array.from({ length: count }, (_, i) => ({
      time: `${i * 2}h ago`,
      value: current + (Math.random() - 0.5) * variance
    })).reverse();
  };

  if (loading || !selectedPatient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">
          {loading ? "Loading patient data..." : "No patient data available"}
        </div>
      </div>
    );
  }

  const crsStatus = getCRSStatus(selectedPatient.CRS);
  const temperatureHistory = generateVitalHistory(selectedPatient.Temperature, 0.5);
  const heartRateHistory = generateVitalHistory(selectedPatient.Heart_Rate_bpm, 10);

  const vitals = selectedPatient ? [
    {
      label: "Temperature",
      value: `${selectedPatient.Temperature.toFixed(1)}°C`,
      status: getVitalStatus('temperature', selectedPatient.Temperature)
    },
    {
      label: "Heart Rate",
      value: `${selectedPatient.Heart_Rate_bpm} bpm`,
      status: getVitalStatus('heartRate', selectedPatient.Heart_Rate_bpm)
    },
    {
      label: "Blood Pressure",
      value: `${selectedPatient.Systolic_BP_mmHg}/${selectedPatient.Diastolic_BP_mmHg}`,
      status: getVitalStatus('systolicBP', selectedPatient.Systolic_BP_mmHg)
    },
    {
      label: "SpO2",
      value: `${selectedPatient.SpO2}%`,
      status: getVitalStatus('spO2', selectedPatient.SpO2)
    }
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4">
          <div className="flex justify-between items-center h-12">
            <h1 className="text-lg font-bold text-blue-700">CRS Monitor</h1>
            <div className="flex items-center space-x-3">
              <select 
                className="border rounded-md p-2 bg-white min-w-[250px]"
                value={selectedPatient?.Patient_ID}
                onChange={(e) => {
                  const selected = allPatients.find(p => p.Patient_ID === e.target.value);
                  if (selected) setSelectedPatient(selected);
                }}
              >
                {allPatients.map(patient => (
                  <option key={patient.Patient_ID} value={patient.Patient_ID}>
                    {patient.Patient_Name} ({patient.Patient_ID})
                  </option>
                ))}
              </select>
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

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <select 
              className="border rounded-md p-2 bg-white"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-gray-50 bg-white">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-gray-50 bg-white">
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <h3 className="text-sm font-medium text-gray-500">Patient Name/ID</h3>
            <div className="mt-2">
              <div className="text-2xl font-semibold text-gray-900">
                {selectedPatient.Patient_Name}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                ID: {selectedPatient.Patient_ID}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {selectedPatient.Age} years • {selectedPatient.Gender} • {selectedPatient.Nationality}
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-medium text-gray-500">Risk Assessment</h3>
            <div className="mt-2">
              <div className="text-2xl font-semibold text-red-600">
                {selectedPatient.ICANS_Grade ? `Grade ${selectedPatient.ICANS_Grade}` : 'N/A'}
              </div>
              <div className="text-sm text-red-500 mt-1">
                Activity Level: {selectedPatient.Activity_Level}
              </div>
              <div className="flex items-center mt-4 text-sm text-red-500">
                <Activity className="h-4 w-4 mr-1" />
                <span>{selectedPatient.Fatigue === 'Yes' ? 'Fatigue Reported' : 'No Fatigue'}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-medium text-gray-500">CRS Status</h3>
            <div className="mt-2">
              <div className={`text-2xl font-semibold ${crsStatus.color}`}>
                {crsStatus.text}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Symptoms: {[
                  selectedPatient.Chills === 'Yes' && 'Chills',
                  selectedPatient.Headache === 'Yes' && 'Headache',
                  selectedPatient.Fatigue === 'Yes' && 'Fatigue'
                ].filter(Boolean).join(', ') || 'None'}
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {vitals.map(vital => (
            <div key={vital.label} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-500">{vital.label}</div>
              <div className={`text-xl font-bold mt-1 ${
                vital.status === 'up' ? 'text-red-500' :
                vital.status === 'down' ? 'text-blue-500' :
                'text-green-500'
              }`}>
                {vital.value}
              </div>
              <div className={`text-xs mt-1 ${
                vital.status === 'up' ? 'text-red-500' :
                vital.status === 'down' ? 'text-blue-500' :
                'text-green-500'
              }`}>
                {vital.status === 'up' ? '↑ Above normal' :
                 vital.status === 'down' ? '↓ Below normal' :
                 '✓ Normal range'}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <VitalChart 
            title="Temperature Trend" 
            data={temperatureHistory} 
            color="#ef4444"
          />
          <VitalChart 
            title="Heart Rate Trend" 
            data={heartRateHistory} 
            color="#3b82f6"
          />
        </div>
      </div>
    </div>
  );
};

export default BiomarkerDashboard;