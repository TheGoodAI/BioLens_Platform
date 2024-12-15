import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { HeartPulse, Dna, Activity } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Define biomarker data types
interface BiomarkerValue {
  value: number;
  growShrink: number;
  comparePeriod: string;
  chartData: {
    data: Array<{ date: string; value: number }>;
  };
}

interface BiomarkerData {
  inflammatoryMarkers: Record<Period, BiomarkerValue>;
  metabolicMarkers: Record<Period, BiomarkerValue>;
  hormoneMarkers: Record<Period, BiomarkerValue>;
}

type Period = 'thisWeek' | 'thisMonth' | 'thisYear';
type BiomarkerCategory = keyof BiomarkerData;

// Sample biomarker data
const sampleBiomarkerData: BiomarkerData = {
  inflammatoryMarkers: {
    thisWeek: {
      value: 2.8,
      growShrink: -15,
      comparePeriod: "vs last week",
      chartData: {
        data: [
          { date: "Mon", value: 3.2 },
          { date: "Tue", value: 3.0 },
          { date: "Wed", value: 2.9 },
          { date: "Thu", value: 2.8 },
          { date: "Fri", value: 2.7 },
          { date: "Sat", value: 2.8 },
          { date: "Sun", value: 2.8 }
        ]
      }
    },
    thisMonth: {
      value: 3.0,
      growShrink: -10,
      comparePeriod: "vs last month",
      chartData: {
        data: [
          { date: "Week 1", value: 3.5 },
          { date: "Week 2", value: 3.3 },
          { date: "Week 3", value: 3.2 },
          { date: "Week 4", value: 3.0 },
          { date: "Week 5", value: 2.8 }
        ]
      }
    },
    thisYear: {
      value: 3.2,
      growShrink: -20,
      comparePeriod: "vs last year",
      chartData: {
        data: [
          { date: "Jan", value: 4.0 },
          { date: "Mar", value: 3.8 },
          { date: "May", value: 3.5 },
          { date: "Jul", value: 3.2 },
          { date: "Sep", value: 3.0 },
          { date: "Nov", value: 2.8 }
        ]
      }
    }
  },
  metabolicMarkers: {
    thisWeek: {
      value: 95,
      growShrink: 5,
      comparePeriod: "vs last week",
      chartData: {
        data: [
          { date: "Mon", value: 92 },
          { date: "Tue", value: 94 },
          { date: "Wed", value: 93 },
          { date: "Thu", value: 95 },
          { date: "Fri", value: 94 },
          { date: "Sat", value: 95 },
          { date: "Sun", value: 95 }
        ]
      }
    },
    thisMonth: {
      value: 94,
      growShrink: 2,
      comparePeriod: "vs last month",
      chartData: {
        data: [
          { date: "Week 1", value: 92 },
          { date: "Week 2", value: 93 },
          { date: "Week 3", value: 93 },
          { date: "Week 4", value: 94 },
          { date: "Week 5", value: 95 }
        ]
      }
    },
    thisYear: {
      value: 93,
      growShrink: -1,
      comparePeriod: "vs last year",
      chartData: {
        data: [
          { date: "Jan", value: 94 },
          { date: "Mar", value: 94 },
          { date: "May", value: 93 },
          { date: "Jul", value: 93 },
          { date: "Sep", value: 93 },
          { date: "Nov", value: 93 }
        ]
      }
    }
  },
  hormoneMarkers: {
    thisWeek: {
      value: 15.2,
      growShrink: 8,
      comparePeriod: "vs last week",
      chartData: {
        data: [
          { date: "Mon", value: 14.1 },
          { date: "Tue", value: 14.5 },
          { date: "Wed", value: 14.8 },
          { date: "Thu", value: 15.0 },
          { date: "Fri", value: 15.2 },
          { date: "Sat", value: 15.2 },
          { date: "Sun", value: 15.2 }
        ]
      }
    },
    thisMonth: {
      value: 14.8,
      growShrink: 5,
      comparePeriod: "vs last month",
      chartData: {
        data: [
          { date: "Week 1", value: 14.1 },
          { date: "Week 2", value: 14.3 },
          { date: "Week 3", value: 14.5 },
          { date: "Week 4", value: 14.8 },
          { date: "Week 5", value: 15.2 }
        ]
      }
    },
    thisYear: {
      value: 14.5,
      growShrink: 12,
      comparePeriod: "vs last year",
      chartData: {
        data: [
          { date: "Jan", value: 13.0 },
          { date: "Mar", value: 13.5 },
          { date: "May", value: 14.0 },
          { date: "Jul", value: 14.3 },
          { date: "Sep", value: 14.5 },
          { date: "Nov", value: 15.2 }
        ]
      }
    }
  }
};

const periodOptions = [
  { value: 'thisWeek', label: 'This Week' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'thisYear', label: 'This Year' }
];

const chartColors: Record<BiomarkerCategory, string> = {
  inflammatoryMarkers: '#ef4444',  // Red for inflammation
  metabolicMarkers: '#3b82f6',     // Blue for metabolism
  hormoneMarkers: '#10b981'        // Green for hormones
};

// Biomarker Card Component
const BiomarkerCard = ({ 
  title, 
  value, 
  icon, 
  growShrink, 
  iconClass, 
  label, 
  active, 
  compareFrom, 
  onClick 
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  growShrink: number;
  iconClass: string;
  label: BiomarkerCategory;
  active: boolean;
  compareFrom: string;
  onClick: (label: BiomarkerCategory) => void;
}) => {
  const cardClass = active ? 'bg-white dark:bg-gray-900 shadow-md' : '';
  
  return (
    <button
      className={`p-4 rounded-2xl cursor-pointer text-left transition duration-150 ${cardClass}`}
      onClick={() => onClick(label)}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="mb-4 text-sm font-semibold">{title}</div>
          <h3 className="mb-1 text-2xl font-bold">{value}</h3>
          <div className="flex items-center gap-1">
            <span className={growShrink >= 0 ? 'text-green-500' : 'text-red-500'}>
              {growShrink >= 0 ? '+' : ''}{growShrink}%
            </span>
            <span className="text-gray-500">{compareFrom}</span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${iconClass}`}>
          {icon}
        </div>
      </div>
    </button>
  );
};

// Main Dashboard Component
const BiomarkerDashboard = () => {
  const [selectedCategory, setSelectedCategory] = 
    useState<BiomarkerCategory>('inflammatoryMarkers');
  const [selectedPeriod, setSelectedPeriod] = 
    useState<Period>('thisMonth');

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-semibold">Biomarker Analysis</h4>
        <select
          className="p-2 border rounded"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as Period)}
        >
          {periodOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
        <BiomarkerCard
          title="Inflammatory Markers"
          value={sampleBiomarkerData.inflammatoryMarkers[selectedPeriod].value}
          growShrink={sampleBiomarkerData.inflammatoryMarkers[selectedPeriod].growShrink}
          iconClass="bg-red-100"
          icon={<Dna className="text-red-600" size={24} />}
          label="inflammatoryMarkers"
          active={selectedCategory === 'inflammatoryMarkers'}
          compareFrom={sampleBiomarkerData.inflammatoryMarkers[selectedPeriod].comparePeriod}
          onClick={setSelectedCategory}
        />
        <BiomarkerCard
          title="Metabolic Markers"
          value={sampleBiomarkerData.metabolicMarkers[selectedPeriod].value}
          growShrink={sampleBiomarkerData.metabolicMarkers[selectedPeriod].growShrink}
          iconClass="bg-blue-100"
          icon={<HeartPulse className="text-blue-600" size={24} />}
          label="metabolicMarkers"
          active={selectedCategory === 'metabolicMarkers'}
          compareFrom={sampleBiomarkerData.metabolicMarkers[selectedPeriod].comparePeriod}
          onClick={setSelectedCategory}
        />
        <BiomarkerCard
          title="Hormone Markers"
          value={sampleBiomarkerData.hormoneMarkers[selectedPeriod].value}
          growShrink={sampleBiomarkerData.hormoneMarkers[selectedPeriod].growShrink}
          iconClass="bg-green-100"
          icon={<Activity className="text-green-600" size={24} />}
          label="hormoneMarkers"
          active={selectedCategory === 'hormoneMarkers'}
          compareFrom={sampleBiomarkerData.hormoneMarkers[selectedPeriod].comparePeriod}
          onClick={setSelectedCategory}
        />
      </div>

      <div className="h-[410px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={sampleBiomarkerData[selectedCategory][selectedPeriod].chartData.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartColors[selectedCategory]}
              strokeWidth={2}
              dot={{ fill: chartColors[selectedCategory] }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default BiomarkerDashboard;