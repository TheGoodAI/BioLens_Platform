import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BiomarkerData {
    id: string;
    name: string;
    tests: number;
    growShrink: number;
    color: string;
}

interface BiomarkerProps {
    data: BiomarkerData[];
}

const biomarkerData: BiomarkerData[] = [
    {
        id: '1',
        name: 'Blood Glucose (HbA1c)',
        tests: 1842,
        growShrink: 15.2,
        color: 'bg-red-500'
    },
    {
        id: '2',
        name: 'Cholesterol Panel',
        tests: 1654,
        growShrink: 13.9,
        color: 'bg-blue-500'
    },
    {
        id: '3',
        name: 'Vitamin D (25-OH)',
        tests: 1433,
        growShrink: 9.5,
        color: 'bg-yellow-500'
    },
    {
        id: '4',
        name: 'Iron Studies',
        tests: 1245,
        growShrink: 2.3,
        color: 'bg-orange-500'
    },
    {
        id: '5',
        name: 'Thyroid Function',
        tests: 1122,
        growShrink: -0.7,
        color: 'bg-purple-500'
    },
    {
        id: '6',
        name: 'Liver Function',
        tests: 987,
        growShrink: -2.1,
        color: 'bg-green-500'
    }
];

const TopBiomarkers = () => {
    return (
        <Card>
            <div className="flex items-center justify-between p-4">
                <h4>Top Biomarkers</h4>
                <Button 
                    variant="default"
                    size="sm" 
                >
                    View all
                </Button>
            </div>
            <div className="mt-5">
                {biomarkerData.map((item, index) => (
                    <div
                        key={item.id}
                        className={`flex items-center justify-between py-2 px-4 ${
                            index !== biomarkerData.length - 1 ? 'border-b border-gray-200' : ''
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <div className={`w-[50px] h-[50px] rounded-lg ${item.color} flex items-center justify-center`}>
                                <span className="text-white font-medium text-lg">
                                    {item.name[0]}
                                </span>
                            </div>
                            <div>
                                <div className="font-bold text-gray-900">
                                    {item.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Tests: {item.tests}
                                </div>
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            item.growShrink >= 10 ? 'bg-emerald-100 text-emerald-600' :
                            item.growShrink >= 0 ? 'bg-blue-100 text-blue-600' :
                            'bg-red-100 text-red-600'
                        }`}>
                            {item.growShrink > 0 ? '+' : ''}{item.growShrink}%
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default TopBiomarkers;