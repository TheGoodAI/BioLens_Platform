import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import GrowShrinkValue from '@/components/shared/GrowShrinkValue'
import { CSVLink } from 'react-csv'
import { NumericFormat } from 'react-number-format'
import { FaHospital, FaChartLine, FaUserMd } from 'react-icons/fa'
import type { TopChannelData } from '../types'

type TopMedicalReferralProps = {
    data: TopChannelData
}

const { TBody, THead, Tr, Th, Td } = Table

const TopMedicalReferrals = ({ data }: TopMedicalReferralProps) => {
    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <FaHospital className="text-2xl text-blue-600" />
                    <h4 className="text-xl font-semibold text-gray-800">
                        Top Medical Referral Channels
                    </h4>
                </div>
                <CSVLink
                    filename="medical-referrals.csv"
                    data={data.channels.map((channel) => {
                        return {
                            'Referral Source': channel.name,
                            'Referral Percentage': `${channel.percentage}%`,
                            'Total Referrals': channel.total,
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
            <div className="border-t pt-4">
                <div className="mb-3 text-gray-600 flex items-center gap-2">
                    <FaUserMd className="text-blue-500" />
                    Patient Referrals
                </div>
                <div className="flex items-end gap-2 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                        <NumericFormat
                            displayType="text"
                            value={data.visitors}
                            thousandSeparator={true}
                        />
                    </h3>
                    <GrowShrinkValue
                        className="font-bold"
                        value={2.6}
                        suffix="%"
                        positiveIcon="+"
                        negativeIcon=""
                    />
                </div>
                <Table className="mt-4" hoverable={true}>
                    <THead>
                        <Tr>
                            <Th className="!px-0">Referral Source</Th>
                            <Th>Referral Percentage</Th>
                            <Th className="!px-0">Total Referrals</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {data.channels.map((channel) => (
                            <Tr key={channel.id} className="hover:bg-blue-50 transition-colors">
                                <Td className="!px-0">
                                    <div className="flex items-center gap-3">
                                        <Avatar
                                            size={32}
                                            src={channel.img}
                                            className="border-2 border-blue-100"
                                        />
                                        <div className="font-semibold text-gray-700">
                                            {channel.name}
                                        </div>
                                    </div>
                                </Td>
                                <Td className="text-blue-600 font-medium">
                                    {channel.percentage}%
                                </Td>
                                <Td className="!px-0 font-medium">
                                    <NumericFormat
                                        displayType="text"
                                        value={channel.total}
                                        thousandSeparator={true}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </TBody>
                </Table>
            </div>
        </Card>
    )
}

export default TopMedicalReferrals