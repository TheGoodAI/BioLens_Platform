import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import GrowShrinkValue from '@/components/shared/GrowShrinkValue'
import { CSVLink } from 'react-csv'
import { FaFileMedical, FaUserMd, FaChartLine } from 'react-icons/fa'
import type { TopPageData } from '../types'

type TopMedicalProceduresProps = {
    data: TopPageData[]
}

const { Tr, Td, TBody, THead, Th } = Table

const TopMedicalProcedures = ({ data }: TopMedicalProceduresProps) => {
    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <FaFileMedical className="text-2xl text-blue-600" />
                    <h4 className="text-xl font-semibold text-gray-800">
                        Top Medical Procedures
                    </h4>
                </div>
                <CSVLink
                    filename="medical-procedures.csv"
                    data={data.map((row) => {
                        return {
                            procedureName: row.pageUrl,
                            procedureVolume: row.views.amount,
                            'Procedure Volume Growth': `${row.views.growth}%`,
                            'Unique Patient Count': row.uniqueVisitor.amount,
                            'Patient Count Growth': `${row.uniqueVisitor.growth}%`,
                        }
                    })}
                >
                    <Button 
                        size="sm" 
                         
                        className="flex items-center gap-2"
                    >
                        <FaChartLine /> Export Data
                    </Button>
                </CSVLink>
            </div>
            <div className="border-t pt-4">
                <Table hoverable={true}>
                    <THead>
                        <Tr>
                            <Th className="!px-0">
                                <div className="flex items-center gap-2">
                                    <FaUserMd className="text-blue-500" />
                                    Procedure Name
                                </div>
                            </Th>
                            <Th className="!text-right max-w-[100px]">
                                Procedure Volume
                            </Th>
                            <Th className="!px-0 !text-right max-w-[100px]">
                                Unique Patients
                            </Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {data.map((row) => {
                            return (
                                <Tr key={row.pageUrl} className="hover:bg-blue-50 transition-colors">
                                    <Td className="!px-0">
                                        <div className="font-semibold text-gray-700">
                                            {row.pageUrl}
                                        </div>
                                    </Td>
                                    <Td>
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="font-medium">{row.views.amount}</span>
                                            <GrowShrinkValue
                                                className="font-bold"
                                                value={row.views.growth}
                                                suffix="%"
                                                positiveIcon="+"
                                                negativeIcon=""
                                            />
                                        </div>
                                    </Td>
                                    <Td className="!px-0">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="font-medium">
                                                {row.uniqueVisitor.amount}
                                            </span>
                                            <GrowShrinkValue
                                                className="font-bold"
                                                value={row.uniqueVisitor.growth}
                                                suffix="%"
                                                positiveIcon="+"
                                                negativeIcon=""
                                            />
                                        </div>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </TBody>
                </Table>
            </div>
        </Card>
    )
}

export default TopMedicalProcedures