import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  Tooltip, ComposedChart, Bar
} from 'recharts';
import { 
  AlertTriangle, Clock, Activity, Heart, 
  BellRing, Settings, UserPlus
} from 'lucide-react';

// Interfaces
interface VitalData {
  name: string;
  temperature: number;
  heartRate: number;
  bloodPressure: number;
  oxygenLevel: number;
}

interface VitalAssessmentProps {
  title: string;
  icon: React.ElementType;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
}

interface RiskQuestion {
  question: string;
  options: string[];
}

interface RiskAssessmentProps {
  title: string;
  questions: RiskQuestion[];
}

const generateVitalsData = (): VitalData[] => {
  const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
  return hours.map(hour => ({
    name: hour,
    temperature: +(36.5 + Math.random() * 2).toFixed(1),
    heartRate: Math.round(75 + Math.random() * 50),
    bloodPressure: Math.round(100 + Math.random() * 40),
    oxygenLevel: Math.round(95 + Math.random() * 5),
  }));
};

const VitalsMonitoringDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'temperature' | 'heartRate'>('all');
  const chartData = useMemo(() => generateVitalsData(), []);

  const VitalAssessment: React.FC<VitalAssessmentProps> = ({ 
    title, 
    icon: Icon, 
    value, 
    unit, 
    status 
  }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        </div>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          status === 'normal' ? 'bg-green-100 text-green-700' :
          status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {status.toUpperCase()}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-gray-500">{unit}</span>
      </div>
      <div className="h-[100px] mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData.slice(-8)}>
            <Line
              type="monotone"
              dataKey={title.toLowerCase().replace(/\s/g, '')}
              stroke="#2196F3"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const RiskAssessment: React.FC<RiskAssessmentProps> = ({ title, questions }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      {questions.map((q, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <p className="text-sm font-medium mb-2">{q.question}</p>
          <div className="grid grid-cols-3 gap-2">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                className="p-2 text-sm border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const riskQuestions: RiskQuestion[] = [
    {
      question: "Current Activity Level",
      options: ["Normal", "Reduced", "Severely Limited"]
    },
    {
      question: "Breathing Difficulty",
      options: ["None", "Mild", "Severe"]
    }
  ];

  const symptomQuestions: RiskQuestion[] = [
    {
      question: "Pain Level",
      options: ["No Pain", "Moderate", "Severe"]
    },
    {
      question: "Consciousness Level",
      options: ["Alert", "Drowsy", "Unresponsive"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                <Clock className="h-4 w-4 inline mr-1" />
                Last updated: Just now
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Vitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <VitalAssessment
            title="Temperature"
            icon={AlertTriangle}
            value="38.5"
            unit="°C"
            status="warning"
          />
          <VitalAssessment
            title="Heart Rate"
            icon={Heart}
            value="98"
            unit="bpm"
            status="normal"
          />
          <VitalAssessment
            title="Blood Pressure"
            icon={Activity}
            value="120/80"
            unit="mmHg"
            status="normal"
          />
          <VitalAssessment
            title="Oxygen Level"
            icon={Settings}
            value="97"
            unit="%"
            status="normal"
          />
        </div>

        {/* Charts Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Vitals Trend Analysis</h2>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {[
                { value: 'all', label: 'All Vitals' },
                { value: 'temperature', label: 'Temperature' },
                { value: 'heartRate', label: 'Heart Rate' }
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setSelectedCategory(item.value as typeof selectedCategory)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors
                    ${selectedCategory === item.value 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" interval={2} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="temperature" fill="#2196F3" />
                <Line type="monotone" dataKey="heartRate" stroke="#ef4444" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Assessment Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RiskAssessment
            title="Vital Signs Risk Assessment"
            questions={riskQuestions}
          />
          <RiskAssessment
            title="Symptom Assessment"
            questions={symptomQuestions}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
            Submit Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default VitalsMonitoringDashboard;