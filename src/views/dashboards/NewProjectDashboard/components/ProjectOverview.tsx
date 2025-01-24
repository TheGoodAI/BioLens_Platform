import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend, // Explicitly import Legend
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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

// CSV Parsing Function
const parseCSV = (csvText: string): PatientData[] => {
  const lines = csvText.split("\n").filter((line) => line.trim() !== "");
  const headers = lines[0].split(",").map((header) => header.trim());
  const data = lines.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim());
    const patient: any = {};
    headers.forEach((header, index) => {
      const parsedValue = isNaN(Number(values[index])) ? values[index] : Number(values[index]);
      patient[header] = parsedValue;
    });
    return patient as PatientData;
  });
  return data;
};

const BiomarkerDashboard: React.FC = () => {
  const [allPatients, setAllPatients] = useState<PatientData[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://ucarecdn.com/630c83cc-5a74-4628-a1e3-e4f4e9170a2b/CRS_dataset_v3.csv"
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const csvText = await response.text();
        const patients = parseCSV(csvText);
        setAllPatients(patients);
        setSelectedPatient(patients[0]); // Default to the first patient
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !selectedPatient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-xl text-gray-600">
          {loading ? "Loading patient data..." : "No data available"}
        </h1>
      </div>
    );
  }

  const ageDistribution = allPatients.map((p) => ({ age: p.Age }));
  const symptomOccurrences = [
    { symptom: "Chills", count: allPatients.filter((p) => p.Chills === "Yes").length },
    { symptom: "Fatigue", count: allPatients.filter((p) => p.Fatigue === "Yes").length },
    { symptom: "Headache", count: allPatients.filter((p) => p.Headache === "Yes").length },
  ];
  const genderDistribution = [
    { gender: "Male", count: allPatients.filter((p) => p.Gender === "Male").length },
    { gender: "Female", count: allPatients.filter((p) => p.Gender === "Female").length },
  ];
  const temperatureHistory = Array.from({ length: 10 }, (_, i) => ({
    time: `${i * 2}h ago`,
    value: selectedPatient.Temperature + (Math.random() - 0.5),
  }));
  const heartRateHistory = Array.from({ length: 10 }, (_, i) => ({
    time: `${i * 2}h ago`,
    value: selectedPatient.Heart_Rate_bpm + (Math.random() - 0.5),
  }));

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">CRS Dashboard</h1>
          <select
            className="border rounded-md p-2"
            value={selectedPatient?.Patient_ID}
            onChange={(e) => {
              const selected = allPatients.find((p) => p.Patient_ID === e.target.value);
              if (selected) setSelectedPatient(selected);
            }}
          >
            {allPatients.map((patient) => (
              <option key={patient.Patient_ID} value={patient.Patient_ID}>
                {patient.Patient_Name} ({patient.Patient_ID})
              </option>
            ))}
          </select>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-4 space-y-8">
        <section className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-gray-700">Gender Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={genderDistribution}
                  dataKey="count"
                  nameKey="gender"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-gray-700">Symptom Occurrences</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={symptomOccurrences}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="symptom" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-gray-700">Age Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="age" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-gray-700">Temperature History</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={temperatureHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-gray-700">Heart Rate History</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={heartRateHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BiomarkerDashboard;
