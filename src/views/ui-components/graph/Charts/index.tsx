import DemoLayout from '@/components/docs/DemoLayout'

// Demo
import BasicLine from './BasicLine'
import DashedLine from './DashedLine'
import BasicArea from './BasicArea'
import SplineArea from './SplineArea'
import BasicColumn from './BasicColumn'
import StackedColumn from './StackedColumn'
import BasicBar from './BasicBar'
import GroupedBar from './GroupedBar'
import SimplePie from './SimplePie'
import SimpleDonut from './SimpleDonut'

const mdPath = 'Charts'

const demoHeader = {
    title: 'John Doe',
}

const demos = [
    {
        mdName: 'BasicLine',
        mdPath: mdPath,
        title: 'Blood Pressure Monitoring',
        desc: ``,
        component: <BasicLine />,
    },
    {
        mdName: 'DashedLine',
        mdPath: mdPath,
        title: 'Skin Temperature Monitoring',
        desc: ``,
        component: <DashedLine />,
    },
    {
        mdName: 'BasicArea',
        mdPath: mdPath,
        title: 'Heart Rate Monitoring',
        desc: ``,
        component: <BasicArea />,
    },
    {
        mdName: 'SplineArea',
        mdPath: mdPath,
        title: 'Oxygen Saturation Monitoring',
        desc: ``,
        component: <SplineArea />,
    },
    {
        mdName: 'BasicColumn',
        mdPath: mdPath,
        title: 'Respiration Rate Monitoring',
        desc: ``,
        component: <BasicColumn />,
    },
    {
        mdName: 'StackedColumn',
        mdPath: mdPath,
        title: 'Heart Rate Variability (HRV) Monitoring',
        desc: ``,
        component: <StackedColumn />,
    },
    // {
    //     mdName: 'BasicBar',
    //     mdPath: mdPath,
    //     title: 'Basic Bar',
    //     desc: ``,
    //     component: <BasicBar />,
    // },
    // {
    //     mdName: 'GroupedBar',
    //     mdPath: mdPath,
    //     title: 'Grouped Bar',
    //     desc: ``,
    //     component: <GroupedBar />,
    // },
    // {
    //     mdName: 'SimplePie',
    //     mdPath: mdPath,
    //     title: 'Simple Pie',
    //     desc: ``,
    //     component: <SimplePie />,
    // },
    // {
    //     mdName: 'SimpleDonut',
    //     mdPath: mdPath,
    //     title: 'Simple Donut',
    //     desc: ``,
    //     component: <SimpleDonut />,
    // },
]


const Charts = () => {
    return (
        <DemoLayout
            header={demoHeader}
            demos={demos}
        />
    )
}

export default Charts
