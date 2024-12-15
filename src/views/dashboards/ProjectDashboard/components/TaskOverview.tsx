import { useState } from 'react'
import Card from '@/components/ui/Card'
import Segment from '@/components/ui/Segment'
import Badge from '@/components/ui/Badge'
import Chart from '@/components/shared/Chart'
import { COLORS } from '@/constants/chart.constant'
import { 
    FaMicroscope, 
    FaChartLine, 
    FaFlask, 
    FaCheckCircle 
} from 'react-icons/fa'
import isEmpty from 'lodash/isEmpty'
import type { TaskOverviewChart } from '../types'

type ResearchTaskOverviewProps = {
    data?: Record<string, TaskOverviewChart>
}

type ChartLegendProps = {
    label: string
    value: number
    color?: string
    showBadge?: boolean
    icon?: React.ReactNode
}

const ChartLegend = ({
    label,
    value,
    color,
    showBadge = true,
    icon
}: ChartLegendProps) => {
    return (
        <div className="flex items-center gap-3">
            {showBadge && (
                <Badge className="mt-2.5" style={{ backgroundColor: color }} />
            )}
            {icon && <div className="text-xl text-gray-600">{icon}</div>}
            <div>
                <h5 className="font-bold text-gray-800">{value}</h5>
                <p className="text-gray-600 text-sm">{label}</p>
            </div>
        </div>
    )
}

const ResearchTaskOverview = ({ data }: ResearchTaskOverviewProps) => {
    const [timeRange, setTimeRange] = useState('weekly')

    return (
        <Card>
            <div className="flex sm:flex-row flex-col md:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3">
                    <FaMicroscope className="text-2xl text-blue-600" />
                    <h4 className="text-xl font-semibold text-gray-800">
                        Research Task Overview
                    </h4>
                </div>
                <Segment
                    value={timeRange}
                    size="sm"
                    onChange={(val) => setTimeRange(val as string)}
                >
                    <Segment.Item value="daily">Daily</Segment.Item>
                    <Segment.Item value="weekly">Weekly</Segment.Item>
                </Segment>
            </div>
            {!isEmpty(data) && (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <ChartLegend
                                showBadge={false}
                                label="Total Research Tasks"
                                value={data[timeRange].total}
                                icon={<FaMicroscope />}
                            />
                        </div>
                        <div className="flex gap-x-6">
                            <ChartLegend
                                color={COLORS[7]}
                                label={data[timeRange].series[0].name}
                                value={data[timeRange].onGoing}
                                icon={<FaFlask />}
                            />
                            <ChartLegend
                                color={COLORS[8]}
                                label={data[timeRange].series[1].name}
                                value={data[timeRange].finished}
                                icon={<FaCheckCircle />}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Chart
                            series={data[timeRange].series}
                            xAxis={data[timeRange].range}
                            type="bar"
                            customOptions={{
                                colors: [COLORS[7], COLORS[8]],
                                legend: { show: false },
                                plotOptions: {
                                    bar: {
                                        columnWidth: '15px',
                                        borderRadius: 4,
                                        borderRadiusApplication: 'end',
                                    },
                                },
                                title: {
                                    text: 'Research Task Progression',
                                    align: 'left',
                                    style: {
                                        fontSize: '14px',
                                        color: '#333'
                                    }
                                }
                            }}
                        />
                    </div>
                </>
            )}
        </Card>
    )
}

export default ResearchTaskOverview