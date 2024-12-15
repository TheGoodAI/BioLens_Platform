import React, { useState } from 'react';

const BiomarkerAnalysis = () => {
    const [period, setPeriod] = useState('This Month');

    const analysisData = {
        value: 15000,
        growShrink: 12.5,
        tests: {
            blood: { percent: 45, value: 6800 },
            hormone: { percent: 30, value: 4500 },
            vitamin: { percent: 25, value: 3800 }
        }
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Biomarker Analysis</h4>
                <div className="relative">
                    <button className="px-4 py-2 text-sm border rounded">
                        {period}
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold">{analysisData.growShrink}%</h2>
                    <div className="text-gray-600">
                        <div>Test</div>
                        <div>Growth</div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-6">
                {/* Blood Tests Bar */}
                <div className="flex-1">
                    <div className="h-2 rounded-full bg-red-200" 
                         style={{ width: `${analysisData.tests.blood.percent}%` }} />
                    <div className="mt-1 font-semibold">
                        {analysisData.tests.blood.percent}%
                    </div>
                </div>
                {/* Hormone Tests Bar */}
                <div className="flex-1">
                    <div className="h-2 rounded-full bg-purple-200" 
                         style={{ width: `${analysisData.tests.hormone.percent}%` }} />
                    <div className="mt-1 font-semibold">
                        {analysisData.tests.hormone.percent}%
                    </div>
                </div>
                {/* Vitamin Tests Bar */}
                <div className="flex-1">
                    <div className="h-2 rounded-full bg-yellow-200" 
                         style={{ width: `${analysisData.tests.vitamin.percent}%` }} />
                    <div className="mt-1 font-semibold">
                        {analysisData.tests.vitamin.percent}%
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mt-8">
                <div className="grid grid-cols-3 gap-4">
                    {/* Blood Tests */}
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-red-200 flex items-center justify-center mb-4">
                            <span className="text-2xl">●</span>
                        </div>
                        <div className="text-2xl font-bold mb-1">{(analysisData.tests.blood.value / 1000).toFixed(1)}K</div>
                        <div className="text-sm text-gray-600">Blood Tests</div>
                    </div>

                    {/* Hormone Tests */}
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center mb-4">
                            <span className="text-2xl">●</span>
                        </div>
                        <div className="text-2xl font-bold mb-1">{(analysisData.tests.hormone.value / 1000).toFixed(1)}K</div>
                        <div className="text-sm text-gray-600">Hormone Tests</div>
                    </div>

                    {/* Vitamin Tests */}
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center mb-4">
                            <span className="text-2xl">●</span>
                        </div>
                        <div className="text-2xl font-bold mb-1">{(analysisData.tests.vitamin.value / 1000).toFixed(1)}K</div>
                        <div className="text-sm text-gray-600">Vitamin Tests</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BiomarkerAnalysis;