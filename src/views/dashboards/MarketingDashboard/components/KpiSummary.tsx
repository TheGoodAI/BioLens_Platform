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
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-[#0d1321] rounded-lg border border-cyan-800/40 p-5 ${className}`}>
    {children}
  </div>
);

interface VitalChartProps {
  title: string;
  data: Array<{ time: string; value: number }>;
  color: string;
}

const VitalChart: React.FC<VitalChartProps> = ({ title, data, color }) => (
  <div className="bg-[#0d1321] border border-cyan-800/40 rounded-lg p-4">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-sm font-semibold text-gray-200">{title}</h3>
      <select className="text-xs border border-gray-600 rounded px-2 py-1 bg-[#1a2035] text-gray-300">
        <option>24h</option>
        <option>7d</option>
      </select>
    </div>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="time" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickLine={false} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1a2035', border: '1px solid #334155', borderRadius: '8px', color: '#e5e7eb' }}
            labelStyle={{ color: '#9ca3af' }}
          />
          <Line type="monotone" dataKey="value" stroke={color} dot={false} strokeWidth={2} />
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
      case 0: return { text: 'No CRS', color: 'text-green-400' };
      case 1: return { text: 'Grade 1 - Mild', color: 'text-yellow-400' };
      case 2: return { text: 'Grade 2 - Moderate', color: 'text-red-400' };
      case 3: return { text: 'Grade 3 - Severe', color: 'text-red-500' };
      case 4: return { text: 'Grade 4 - Life-Threatening', color: 'text-red-600' };
      default: return { text: 'Unknown', color: 'text-gray-400' };
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
      time: `${(count - i) * 2}h ago`,
      value: Number((current + (Math.random() - 0.5) * variance).toFixed(1))
    }));
  };

  if (loading || !selectedPatient) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center">
        <div className="text-lg text-gray-400">
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
    <div className="min-h-screen bg-[#070b14]">
      <nav className="bg-[#0d1321] border-b border-gray-800 sticky top-0 z-10">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            <h1 className="text-lg font-bold text-white">CRS Monitor</h1>
            <div className="flex items-center space-x-3">
              <select 
                className="border border-gray-600 rounded-full px-4 py-2 bg-[#1a2035] text-gray-200 min-w-[250px] focus:outline-none focus:border-cyan-500"
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
                <BellRing className="h-5 w-5 text-gray-400 hover:text-gray-200 cursor-pointer" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full" />
              </div>
              <button className="flex items-center px-3 py-1.5 border border-gray-600 rounded-lg text-xs font-medium text-gray-200 hover:bg-[#1a2035] transition-colors">
                <UserPlus className="h-3.5 w-3.5 mr-1" />
                <span>Assign Staff</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-4 space-y-5">
        {/* Filters & Export */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <select 
              className="border border-gray-600 rounded-full px-4 py-2 bg-[#0d1321] text-gray-200 text-sm focus:outline-none focus:border-cyan-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-600 rounded-full bg-[#1a2035] text-gray-200 text-sm hover:bg-[#232a42] transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-600 rounded-lg bg-[#0d1321] text-gray-200 text-sm hover:bg-[#1a2035] transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </button>
        </div>

        {/* Patient Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide">Patient Name/ID</h3>
            <div className="mt-2">
              <div className="text-2xl font-bold text-white">
                {selectedPatient.Patient_Name}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                ID: {selectedPatient.Patient_ID}
              </div>
              <div className="text-sm text-gray-500 mt-3">
                {selectedPatient.Age} years • {selectedPatient.Gender} • {selectedPatient.Nationality}
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide">Risk Assessment</h3>
            <div className="mt-2">
              <div className={`text-2xl font-bold ${
                selectedPatient.ICANS_Grade >= 3 ? 'text-red-500' :
                selectedPatient.ICANS_Grade >= 2 ? 'text-amber-500' :
                selectedPatient.ICANS_Grade === 1 ? 'text-green-400' :
                'text-green-400'
              }`}>
                {selectedPatient.ICANS_Grade ? `Grade ${selectedPatient.ICANS_Grade}` : 'N/A'}
              </div>
              <div className="text-sm text-blue-400 mt-1">
                Activity Level: {selectedPatient.Activity_Level}
              </div>
              <div className="flex items-center mt-3 text-sm text-red-400">
                <Activity className="h-4 w-4 mr-1" />
                <span>{selectedPatient.Fatigue === 'Yes' ? 'Fatigue Reported' : 'No Fatigue'}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide">CRS Status</h3>
            <div className="mt-2">
              <div className={`text-2xl font-bold ${
                selectedPatient.CRS >= 3 ? 'text-red-500' :
                selectedPatient.CRS === 2 ? 'text-red-400' :
                selectedPatient.CRS === 1 ? 'text-yellow-400' :
                'text-green-400'
              }`}>
                {crsStatus.text}
              </div>
              <div className="text-sm text-gray-400 mt-3">
                Symptoms: {[
                  selectedPatient.Chills === 'Yes' && 'Chills',
                  selectedPatient.Headache === 'Yes' && 'Headache',
                  selectedPatient.Fatigue === 'Yes' && 'Fatigue'
                ].filter(Boolean).join(', ') || 'None'}
              </div>
            </div>
          </Card>
        </div>

        {/* Vital Signs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vitals.map(vital => (
            <div key={vital.label} className="bg-[#0d1321] rounded-lg border border-cyan-800/40 p-4 flex flex-col gap-4">
              <div className="text-xs text-gray-400 uppercase tracking-wide">{vital.label}</div>
              <div className={`text-2xl font-bold mt-2 ${
                vital.status === 'up' ? 'text-red-400' :
                vital.status === 'down' ? 'text-red-400' :
                'text-cyan-400'
              }`}>
                {vital.value}
              </div>
              <div className={`text-xs mt-2 flex items-center ${
                vital.status === 'up' ? 'text-red-400' :
                vital.status === 'down' ? 'text-blue-400' :
                'text-green-400'
              }`}>
                {vital.status === 'up' ? '↑ Above normal' :
                 vital.status === 'down' ? '↓ Below normal' :
                 '✓ Normal range'}
              </div>
            </div>
          ))}
        </div>

        {/* Trend Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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