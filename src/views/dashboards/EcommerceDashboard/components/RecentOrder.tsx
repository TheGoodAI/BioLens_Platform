import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface BiomarkerTest {
    id: string;
    name: string;
    status: 'completed' | 'pending' | 'failed';
    date: string;
    patient: string;
    value: number;
}

const sampleData: BiomarkerTest[] = [
    {
        id: "BT001",
        name: "Blood Glucose (HbA1c)",
        status: "completed",
        date: "2024-03-15",
        patient: "John Smith",
        value: 5.7
    },
    {
        id: "BT002",
        name: "Cholesterol Panel",
        status: "pending",
        date: "2024-03-14",
        patient: "Sarah Johnson",
        value: 185
    },
    {
        id: "BT003",
        name: "Vitamin D",
        status: "completed",
        date: "2024-03-14",
        patient: "Michael Brown",
        value: 32
    },
    {
        id: "BT004",
        name: "Thyroid Function",
        status: "failed",
        date: "2024-03-13",
        patient: "Emma Davis",
        value: 4.2
    },
    {
        id: "BT005",
        name: "Iron Studies",
        status: "completed",
        date: "2024-03-13",
        patient: "James Wilson",
        value: 95
    }
];

const statusStyles = {
    completed: { dot: 'bg-green-500', text: 'text-green-500' },
    pending: { dot: 'bg-yellow-500', text: 'text-yellow-500' },
    failed: { dot: 'bg-red-500', text: 'text-red-500' }
};

const RecentBiomarkerTests = () => {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold">Recent Biomarker Tests</h4>
                <Button variant="default" size="sm">
                    View All Tests
                </Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold">Test ID</th>
                            <th className="text-left py-3 px-4 font-semibold">Test Name</th>
                            <th className="text-left py-3 px-4 font-semibold">Status</th>
                            <th className="text-left py-3 px-4 font-semibold">Date</th>
                            <th className="text-left py-3 px-4 font-semibold">Patient</th>
                            <th className="text-left py-3 px-4 font-semibold">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleData.map((test) => (
                            <tr key={test.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">
                                    <span className="font-semibold text-blue-600 cursor-pointer">
                                        #{test.id}
                                    </span>
                                </td>
                                <td className="py-3 px-4">{test.name}</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center">
                                        <div className={`w-2 h-2 rounded-full ${statusStyles[test.status].dot} mr-2`} />
                                        <span className={`capitalize font-semibold ${statusStyles[test.status].text}`}>
                                            {test.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-4">{test.date}</td>
                                <td className="py-3 px-4">{test.patient}</td>
                                <td className="py-3 px-4 font-semibold">
                                    {test.value} {test.name.includes('Glucose') ? 'mmol/L' : 
                                               test.name.includes('Cholesterol') ? 'mg/dL' : 
                                               test.name.includes('Vitamin D') ? 'ng/mL' : ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default RecentBiomarkerTests;