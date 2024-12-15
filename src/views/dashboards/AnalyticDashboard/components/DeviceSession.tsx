import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import { COLORS } from '@/constants/chart.constant'
import { FaDesktop, FaMobileAlt, FaTabletAlt, FaHeartbeat } from 'react-icons/fa'
import type { DeviceSessionData } from '../types'

type MedicalDeviceUsageProps = {
    data: DeviceSessionData
}

const MedicalDeviceUsage = ({ data }: MedicalDeviceUsageProps) => {
    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <FaHeartbeat className="text-2xl text-blue-600" />
                    <h4 className="text-xl font-semibold text-gray-800">
                        Medical Device Access Analytics
                    </h4>
                </div>
            </div>
            <div className="mt-6">
                <Chart
                    height={280}
                    series={data.series}
                    customOptions={{
                        colors: [COLORS[0], COLORS[7], COLORS[8]],
                        labels: data.labels,
                        plotOptions: {
                            pie: {
                                donut: {
                                    labels: {
                                        show: true,
                                        total: {
                                            show: true,
                                            showAlways: true,
                                            label: 'Total Access',
                                            formatter: function (w: any) {
                                                return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0)
                                            },
                                        },
                                    },
                                    size: '75%',
                                },
                            },
                        },
                        legend: {
                            position: 'bottom',
                            horizontalAlign: 'center'
                        }
                    }}
                    type="donut"
                />
            </div>
            <div className="mt-8 flex justify-center gap-12 mx-auto">
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <div 
                        className="text-4xl rounded-full p-3 bg-blue-100 text-blue-600 shadow-md"
                    >
                        <FaDesktop />
                    </div>
                    <div>
                        <span className="block text-gray-600 mb-1">Clinical Workstations</span>
                        <h5 className="text-xl font-bold text-blue-800">
                            {data.percentage[0]}%
                        </h5>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <div 
                        className="text-4xl rounded-full p-3 bg-green-100 text-green-600 shadow-md"
                    >
                        <FaMobileAlt />
                    </div>
                    <div>
                        <span className="block text-gray-600 mb-1">Mobile Devices</span>
                        <h5 className="text-xl font-bold text-green-800">
                            {data.percentage[1]}%
                        </h5>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <div 
                        className="text-4xl rounded-full p-3 bg-purple-100 text-purple-600 shadow-md"
                    >
                        <FaTabletAlt />
                    </div>
                    <div>
                        <span className="block text-gray-600 mb-1">Tablet Devices</span>
                        <h5 className="text-xl font-bold text-purple-800">
                            {data.percentage[2]}%
                        </h5>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default MedicalDeviceUsage