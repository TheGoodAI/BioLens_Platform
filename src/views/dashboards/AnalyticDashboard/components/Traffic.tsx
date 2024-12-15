// import React, { useMemo } from 'react'
// import { FaHeartbeat, FaChartLine, FaFileMedical } from 'react-icons/fa'
// import Button from '@/components/ui/Button'
// import { CSVLink } from 'react-csv'
// import { NumericFormat } from 'react-number-format'
// import Progress from '@/components/ui/Progress'
// import classNames from '@/utils/classNames'

// type PatientVitalsData = {
//     category: string
//     value: number
//     progress: number
//     unit: string
// }

// const PatientMonitorDashboard = () => {
//     const patientVitalsData: PatientVitalsData[] = useMemo(() => [
//         {
//             category: 'Total Patients',
//             value: 1245,
//             progress: 75,
//             unit: 'patients'
//         },
//         {
//             category: 'Monthly Assessments',
//             value: 456,
//             progress: 62,
//             unit: 'assessments'
//         },
//         {
//             category: 'Critical Conditions',
//             value: 34,
//             progress: 45,
//             unit: 'cases'
//         },
//         {
//             category: 'Treatment Efficiency',
//             value: 89,
//             progress: 88,
//             unit: '%'
//         }
//     ], [])

//     return (
//         <div className="bg-white shadow-lg rounded-xl overflow-hidden">
//             <div className="bg-blue-50 p-6 border-b border-blue-100">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                         <FaHeartbeat className="text-3xl text-blue-600" />
//                         <div>
//                             <h2 className="text-2xl font-bold text-gray-800">
//                                 Patient Monitor
//                             </h2>
//                             <p className="text-gray-600 mt-1">
//                                 Explore the metrics to understand trends and drive improvements
//                             </p>
//                         </div>
//                     </div>
//                     <CSVLink
//                         filename="patient-metrics.csv"
//                         data={patientVitalsData.map((item) => ({
//                             Category: item.category,
//                             Value: item.value,
//                             Unit: item.unit,
//                             Progress: `${item.progress}%`
//                         }))}
//                     >
//                         <Button 
//                             variant="default" 
//                             size="sm" 
//                             className="flex items-center gap-2"
//                         >
//                             <FaChartLine /> Export Data
//                         </Button>
//                     </CSVLink>
//                 </div>
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
//                 {patientVitalsData.map((item, index) => (
//                     <div 
//                         key={item.category} 
//                         className="bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition-all"
//                     >
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="text-lg font-semibold text-gray-700">
//                                 {item.category}
//                             </h3>
//                             <FaFileMedical className={classNames(
//                                 "text-2xl",
//                                 index === 0 && "text-blue-500",
//                                 index === 1 && "text-green-500",
//                                 index === 2 && "text-red-500",
//                                 index === 3 && "text-purple-500"
//                             )} />
//                         </div>
//                         <div className="flex items-baseline gap-2 mb-3">
//                             <span className="text-2xl font-bold text-gray-900">
//                                 <NumericFormat
//                                     displayType="text"
//                                     value={item.value}
//                                     thousandSeparator={true}
//                                 />
//                             </span>
//                             <span className="text-sm text-gray-500">{item.unit}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <Progress
//                                 percent={item.progress}
//                                 size="sm"
//                                 customColorClass={classNames(
//                                     item.progress < 50 && 'bg-red-500',
//                                     item.progress >= 50 && item.progress < 75 && 'bg-yellow-500',
//                                     item.progress >= 75 && 'bg-green-500'
//                                 )}
//                             />
//                             <span className="text-sm font-medium text-gray-600">
//                                 {item.progress}%
//                             </span>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div className="bg-blue-50 p-4 text-center border-t border-blue-100">
//                 <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
//                     <FaHeartbeat className="text-blue-500" />
//                     Comprehensive Patient Vitals Assessment
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default PatientMonitorDashboard

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import Progress from '@/components/ui/Progress'
import classNames from '@/utils/classNames'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import { CSVLink } from 'react-csv'
import { FaHospital, FaChartLine } from 'react-icons/fa'
import type { TrafficData } from '../types'

type MedicalReferralAnalyticsProps = {
    data: TrafficData[]
}

const { Tr, Td, TBody, THead, Th } = Table

const columnHelper = createColumnHelper<TrafficData>()

const columns = [
    columnHelper.accessor('source', {
        header: 'Referral Source',
        cell: (props) => {
            const { source } = props.row.original
            return <div className="font-semibold text-blue-700">{source}</div>
        },
    }),
    columnHelper.accessor('visits', {
        header: 'Patient Referrals',
    }),
    columnHelper.accessor('uniqueVisitors', {
        header: 'Unique Patients',
    }),
    columnHelper.accessor('bounceRate', {
        header: 'Consultation Rate',
    }),
    columnHelper.accessor('avgSessionDuration', {
        header: 'Avg. Consultation Time',
    }),
    columnHelper.accessor('progress', {
        header: 'Treatment Goal Progress (%)',
        size: 150,
        cell: (props) => {
            const { progress } = props.row.original
            return (
                <Progress
                    percent={progress}
                    size="sm"
                    customColorClass={classNames(
                        'bg-red-500',
                        progress > 40 && 'bg-yellow-500',
                        progress > 70 && 'bg-green-500',
                    )}
                />
            )
        },
    }),
]

const MedicalReferralAnalytics = ({ data = [] }: MedicalReferralAnalyticsProps) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <FaHospital className="text-2xl text-blue-600" />
                    <h4 className="text-xl font-semibold text-gray-800">
                        Medical Referral Analytics
                    </h4>
                </div>
                <CSVLink
                    filename="medical-referrals.csv"
                    data={data.map((traffic) => {
                        return {
                            'Referral Source': traffic.source,
                            'Patient Referrals': traffic.visits,
                            'Unique Patients': traffic.uniqueVisitors,
                            'Consultation Rate': traffic.bounceRate,
                            'Avg. Consultation Time': traffic.avgSessionDuration,
                            'Treatment Goal Progress': `${traffic.progress}%`,
                        }
                    })}
                >
                    <Button 
                        size="sm" 
                        className="flex items-center gap-2"
                    >
                        <FaChartLine /> Export Referral Data
                    </Button>
                </CSVLink>
            </div>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id} className="bg-blue-50">
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        style={{
                                            width: `${header.getSize()}px`,
                                        }}
                                        className="text-blue-700 font-semibold"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr 
                                key={row.id} 
                                className="hover:bg-blue-50 transition-colors"
                            >
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id} className="py-3">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    )
}

export default MedicalReferralAnalytics