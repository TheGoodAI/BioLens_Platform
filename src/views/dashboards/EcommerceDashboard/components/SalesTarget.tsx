import { useState } from 'react'
import Card from '@/components/ui/Card'
import Progress from '@/components/ui/Progress'
import Select from '@/components/ui/Select'
import AbbreviateNumber from '@/components/shared/AbbreviateNumber'

// Define types
type Period = 'thisWeek' | 'thisMonth' | 'thisYear'

interface PeriodData {
    achieved: number
    target: number
    percentage: number
}

interface BiomarkerTargetData {
    [key: string]: PeriodData
}

type BiomarkerTargetProps = {
    data: BiomarkerTargetData
}

// Static Options
const options = [
    { value: 'thisWeek', label: 'This Week' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'thisYear', label: 'This Year' },
]

// Period Labels
const periodLabel: Record<Period, string> = {
    thisMonth: 'month',
    thisWeek: 'week',
    thisYear: 'year',
}

// Sample static data
const sampleData: BiomarkerTargetData = {
    thisWeek: {
        achieved: 128,
        target: 150,
        percentage: 85,
    },
    thisMonth: {
        achieved: 542,
        target: 600,
        percentage: 90,
    },
    thisYear: {
        achieved: 6240,
        target: 7500,
        percentage: 83,
    },
}

const BiomarkerTarget = ({ data = sampleData }: BiomarkerTargetProps) => {
    const [selectedPeriod, setSelectedPeriod] = useState<Period>('thisMonth')

    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <h4>Biomarker Goals</h4>
                <Select
                    className="w-[120px]"
                    size="sm"
                    placeholder="Select period"
                    value={options.filter(
                        (option) => option.value === selectedPeriod,
                    )}
                    options={options}
                    isSearchable={false}
                    onChange={(option) => {
                        if (option?.value) {
                            setSelectedPeriod(option?.value as Period)
                        }
                    }}
                />
            </div>
            <div className="flex items-center justify-between mt-8">
                <div className="flex flex-col">
                    <h2>
                        <AbbreviateNumber
                            value={data[selectedPeriod].achieved}
                        />
                        <span className="opacity-60 text-base font-bold">
                            {' / '}
                            <AbbreviateNumber
                                value={data[selectedPeriod].target}
                            />{' '}
                            Tests
                        </span>
                    </h2>
                    <div className="mt-1">
                        Completed this {periodLabel[selectedPeriod]}
                    </div>
                </div>
                <div>
                    <Progress
                        percent={data[selectedPeriod].percentage}
                        width={80}
                        variant="circle"
                        strokeWidth={8}
                    />
                </div>
            </div>
        </Card>
    )
}

export default BiomarkerTarget