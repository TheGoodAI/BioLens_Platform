import React from 'react';

const MedicalReferralsDashboard = () => {
  const medicalData = {
    visitors: 79328,
    channels: [
      {
        id: 'hopkins',
        name: 'Johns Hopkins Medicine',
        color: '#4285F4',
        total: 31731,
        percentage: 40,
      },
      {
        id: 'cleveland',
        name: 'Cleveland Clinic',
        color: '#E4405F',
        total: 23798,
        percentage: 30,
      },
      {
        id: 'cdc',
        name: 'CDC',
        color: '#1877F2',
        total: 11899,
        percentage: 15,
      },
      {
        id: 'who',
        name: 'WHO',
        color: '#14171A',
        total: 10313,
        percentage: 13,
      }
    ]
  };

  // SVG Icons as components
  const BuildingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/>
      <path d="M16 6h.01"/>
      <path d="M12 6h.01"/>
      <path d="M12 10h.01"/>
      <path d="M12 14h.01"/>
      <path d="M16 10h.01"/>
      <path d="M16 14h.01"/>
      <path d="M8 10h.01"/>
      <path d="M8 14h.01"/>
    </svg>
  );

  const ChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/>
      <path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  );

  const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  return (
    <div className="bg-white rounded-lg shadow-md w-full">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-blue-600">
              <BuildingIcon />
            </span>
            <h4 className="text-xl font-semibold text-gray-800">
              Medical Referral
            </h4>
          </div>
          <button className="px-3 py-2 text-sm border border-gray-200 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <ChartIcon />
            <span>Export Referral Data</span>
          </button>
        </div>
        
        {/* Content */}
        <div className="border-t pt-4">
          <div className="mb-3 text-gray-600 flex items-center gap-2">
            <span className="text-blue-500">
              <UserIcon />
            </span>
            Hospital Referrals
          </div>
          
          {/* Stats */}
          <div className="flex items-end gap-2 mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {medicalData.visitors.toLocaleString()}
            </h3>
            <span className="text-emerald-600 font-bold">
              +2.6%
            </span>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">
                    Referral Source
                  </th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-700">
                    Referral Percentage
                  </th>
                  <th className="py-3 px-4 text-right font-semibold text-gray-700">
                    Total Referrals
                  </th>
                </tr>
              </thead>
              <tbody>
                {medicalData.channels.map((channel) => (
                  <tr 
                    key={channel.id} 
                    className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full border-2 border-blue-100 flex-shrink-0"
                          style={{ backgroundColor: channel.color }}
                        />
                        <div className="font-semibold text-gray-700">
                          {channel.name}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-blue-600 font-medium">
                      {channel.percentage}%
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {channel.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalReferralsDashboard;