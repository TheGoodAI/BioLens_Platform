import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import classNames from '@/utils/classNames'
import isLastChild from '@/utils/isLastChild'
import { 
    FaCheckCircle, 
    FaCalendarAlt, 
    FaMicroscope, 
    FaChartLine 
} from 'react-icons/fa'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import type { Task } from '../types'

type ResearchTasksProps = {
    data: Task[]
}

export const labelClass: Record<string, string> = {
    'In Progress': 'bg-blue-200 text-blue-800',
    Completed: 'bg-green-200 text-green-800',
    Pending: 'bg-yellow-200 text-yellow-800',
    High: 'bg-red-200 text-red-800',
    Medium: 'bg-orange-200 text-orange-800',
    Low: 'bg-purple-200 text-purple-800',
}

const ResearchTasks = ({ data }: ResearchTasksProps) => {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        if (tasks.length === 0) {
            setTasks(data)
        }
    }, [data, tasks.length])

    const handleChange = (taskId: string) => {
        const newTasks = structuredClone(tasks).map((task) => {
            if (task.id === taskId) {
                task.checked = !task.checked
            }
            return task
        })
        setTasks(newTasks)
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <FaMicroscope className="text-2xl text-blue-600" />
                    <h4 className="text-xl font-semibold text-gray-800">
                        Research Task Management
                    </h4>
                </div>
                <Link to="/research/tasks">
                    <Button 
                        variant="default" 
                        size="sm" 
                        className="flex items-center gap-2"
                    >
                        <FaChartLine /> View All Tasks
                    </Button>
                </Link>
            </div>
            <div className="space-y-4">
                {tasks.map((task, index) => (
                    <div
                        key={task.id}
                        className={classNames(
                            'flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-blue-50 transition-colors',
                            !isLastChild(tasks, index) && 'mb-2',
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <button
                                className="text-[26px] cursor-pointer"
                                role="button"
                                onClick={() => handleChange(task.id)}
                            >
                                {task.checked ? (
                                    <FaCheckCircle className="text-green-500" />
                                ) : (
                                    <FaCheckCircle className="text-gray-300 hover:text-green-300" />
                                )}
                            </button>
                            <div>
                                <div
                                    className={classNames(
                                        'font-semibold text-gray-800 mb-1',
                                        task.checked &&
                                            'line-through text-gray-500 opacity-70',
                                    )}
                                >
                                    {task.name}
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                    <FaCalendarAlt className="text-blue-500" />
                                    {task.dueDate
                                        ? dayjs(task.dueDate).format('MMMM DD, YYYY')
                                        : 'No due date'}
                                </div>
                            </div>
                        </div>
                        <div>
                            <Tag
                                className={`mr-2 rtl:ml-2 ${
                                    task.priority
                                        ? labelClass[task.priority]
                                        : 'bg-gray-200 text-gray-700'
                                }`}
                            >
                                {task.priority || 'Unassigned'}
                            </Tag>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default ResearchTasks