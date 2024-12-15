import React, { useMemo } from 'react'
import Card from '@/components/ui/Card'
import GrowShrinkValue from '@/components/shared/GrowShrinkValue'
import classNames from '@/utils/classNames'
import { NumericFormat } from 'react-number-format'
import { 
    FaHeartbeat, 
    FaProcedures, 
    FaDisease, 
    FaBriefcaseMedical, 
    FaSyringe,
    FaNotesMedical,
    FaUserMd 
} from 'react-icons/fa'
import { MetricsData, Period } from '../types'
import type { ReactNode } from 'react'

type WidgetProps = {
    title: string
    value: string | number | ReactNode
    growShrink: number
    compareFrom: string
    icon: ReactNode
    iconClass: string
}

type MetricsProps = {
    data: MetricsData
    selectedPeriod: Period
}

const VS_PERIOD: Record<Period, string> = {
    thisMonth: 'vs last month',
    thisWeek: 'vs last week',
    thisYear: 'vs last year',
}

const Widget: React.FC<WidgetProps> = React.memo(({
    title,
    growShrink,
    value,
    compareFrom,
    icon,
    iconClass,
}) => {
    return (
        <Card className="w-full">
            <div className="flex items-center gap-4">
                <div
                    className={classNames(
                        'flex items-center justify-center h-16 w-16 rounded-full text-3xl',
                        iconClass,
                    )}
                >
                    {icon}
                </div>
                <div className="flex-grow">
                    <div className="text-lg font-semibold text-gray-700 mb-2">{title}</div>
                    <div className="flex items-baseline gap-2 mb-1">
                        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <GrowShrinkValue
                            className="font-bold"
                            value={growShrink}
                            suffix="%"
                            positiveIcon="+"
                            negativeIcon=""
                        />
                        <span className="text-gray-500 text-sm">{compareFrom}</span>
                    </div>
                </div>
            </div>
        </Card>
    )
})

const MedicalMetrics: React.FC<MetricsProps> = ({ data, selectedPeriod }) => {
    const widgetConfigs = useMemo(() => [
        {
            title: "Patient Admissions",
            value: (
                <NumericFormat
                    displayType="text"
                    value={data.visitors.value}
                    thousandSeparator={true}
                />
            ),
            growShrink: data.visitors.growShrink,
            compareFrom: VS_PERIOD[selectedPeriod],
            icon: <FaProcedures />,
            iconClass: "bg-blue-100 text-blue-600"
        },
        {
            title: "Treatment Efficacy",
            value: `${data.conversionRate.value}%`,
            growShrink: data.conversionRate.growShrink,
            compareFrom: VS_PERIOD[selectedPeriod],
            icon: <FaHeartbeat />,
            iconClass: "bg-green-100 text-green-600"
        },
        {
            title: "Diagnostic Procedures",
            value: (
                <NumericFormat
                    displayType="text"
                    value={data.adCampaignClicks.value}
                    thousandSeparator={true}
                />
            ),
            growShrink: data.adCampaignClicks.growShrink,
            compareFrom: VS_PERIOD[selectedPeriod],
            icon: <FaSyringe />,
            iconClass: "bg-purple-100 text-purple-600"
        },
        {
            title: "Pathological Conditions",
            value: (
                <NumericFormat
                    displayType="text"
                    value={Math.floor(Math.random() * 500)}
                    thousandSeparator={true}
                />
            ),
            growShrink: Math.floor(Math.random() * 10 - 5),
            compareFrom: VS_PERIOD[selectedPeriod],
            icon: <FaDisease />,
            iconClass: "bg-red-100 text-red-600"
        },
        {
            title: "Medical Interventions",
            value: (
                <NumericFormat
                    displayType="text"
                    value={Math.floor(Math.random() * 300)}
                    thousandSeparator={true}
                />
            ),
            growShrink: Math.floor(Math.random() * 10 - 5),
            compareFrom: VS_PERIOD[selectedPeriod],
            icon: <FaBriefcaseMedical />,
            iconClass: "bg-yellow-100 text-yellow-600"
        },
        {
            title: "Clinical Research Protocols",
            value: (
                <NumericFormat
                    displayType="text"
                    value={Math.floor(Math.random() * 150)}
                    thousandSeparator={true}
                />
            ),
            growShrink: Math.floor(Math.random() * 10 - 5),
            compareFrom: VS_PERIOD[selectedPeriod],
            icon: <FaNotesMedical />,
            iconClass: "bg-indigo-100 text-indigo-600"
        },
        {
            title: "Specialist Consultations",
            value: (
                <NumericFormat
                    displayType="text"
                    value={Math.floor(Math.random() * 250)}
                    thousandSeparator={true}
                />
            ),
            growShrink: Math.floor(Math.random() * 10 - 5),
            compareFrom: VS_PERIOD[selectedPeriod],
            icon: <FaUserMd />,
            iconClass: "bg-teal-100 text-teal-600"
        }
    ], [data, selectedPeriod]);

    return (
        <div className="space-y-4">
            {widgetConfigs.map((config, index) => (
                <Widget key={config.title} {...config} />
            ))}
        </div>
    )
}

export default MedicalMetrics