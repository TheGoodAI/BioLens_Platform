import React, { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ScrollBar from '@/components/ui/ScrollBar'
import Timeline from '@/components/ui/Timeline'
import { ActivityAvatar, ActivityEvent } from '@/components/view/Activity'
import isEmpty from 'lodash/isEmpty'
import { 
    FaMicroscope, 
    FaChartLine 
} from 'react-icons/fa'
import type { Activities } from '../types'

type ResearchActivitiesProps = {
    data: Activities
}

const ResearchActivities = ({ data }: ResearchActivitiesProps) => {
    const [activities, setActivities] = useState<Activities>([])

    useEffect(() => {
        if (activities.length === 0) {
            setActivities(data)
        }
    }, [data, activities.length])

    return (
        <Card>
            <div className="flex sm:flex-row flex-col md:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3">
                    <FaMicroscope className="text-2xl text-blue-600" />
                    <h4 className="text-xl font-semibold text-gray-800">
                        Research Activities
                    </h4>
                </div>
                <Button 
                    asElement="div" 
                    size="sm"
                >
                    All Activities
                </Button>
            </div>
            <div className="mt-4">
                <ScrollBar className="max-h-[390px]">
                    <Timeline>
                        {isEmpty(activities) ? (
                            <Timeline.Item>No Research Activities</Timeline.Item>
                        ) : (
                            activities.map((event, index) => (
                                <Timeline.Item
                                    key={event.type + index}
                                    media={<ActivityAvatar data={event} />}
                                >
                                    <div className="mt-1">
                                        <ActivityEvent compact data={event} />
                                    </div>
                                </Timeline.Item>
                            ))
                        )}
                    </Timeline>
                </ScrollBar>
            </div>
        </Card>
    )
}

export default ResearchActivities