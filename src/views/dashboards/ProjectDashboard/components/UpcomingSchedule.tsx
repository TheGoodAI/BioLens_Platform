import { useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import Card from '@/components/ui/Card';
import Calendar from '@/components/ui/Calendar';
import ScrollBar from '@/components/ui/ScrollBar';
import classNames from '@/utils/classNames';
import dayjs from 'dayjs';

type EventType = 'Meeting' | 'Break' | 'Event' | 'Task';

type EventDetails = {
    label: string;
    icon: React.ReactNode;
    color: string;
};

type ScheduledEvent = {
    id: string;
    type: EventType;
    label: string;
    time?: Date;
};

type ScheduledEventProps = ScheduledEvent;

const eventTypes: Record<EventType, EventDetails> = {
    Meeting: {
        label: 'Meeting',
        icon: <i className="fas fa-users" />, // Replace with actual icon
        color: 'bg-blue-500',
    },
    Break: {
        label: 'Break',
        icon: <i className="fas fa-coffee" />, // Replace with actual icon
        color: 'bg-green-500',
    },
    Event: {
        label: 'Event',
        icon: <i className="fas fa-calendar" />, // Replace with actual icon
        color: 'bg-purple-500',
    },
    Task: {
        label: 'Task',
        icon: <i className="fas fa-tasks" />, // Replace with actual icon
        color: 'bg-yellow-500',
    },
};

const ScheduledEvent = (props: ScheduledEventProps) => {
    const { type, label, time } = props;

    const event = eventTypes[type];

    return (
        <div className="flex items-center justify-between gap-4 py-1">
            <div className="flex items-center gap-3">
                <div>
                    <Avatar
                        className={classNames('text-gray-900', event.color)}
                        icon={event.icon}
                        shape="round"
                    />
                </div>
                <div>
                    <div className="font-bold heading-text">{label}</div>
                    <div className="font-normal">{event.label}</div>
                </div>
            </div>
            <div>
                <span className="font-semibold heading-text">
                    {time && dayjs(time).format('hh:mm')}{' '}
                </span>
                <small>{time && dayjs(time).format('A')}</small>
            </div>
        </div>
    );
};

const UpcomingSchedule = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        dayjs().toDate()
    );

    const staticEvents: ScheduledEvent[] = [
        {
            id: '1',
            type: 'Meeting',
            label: 'Daily Standup',
            time: dayjs().set('hour', 10).set('minute', 0).toDate(),
        },
        {
            id: '2',
            type: 'Break',
            label: 'Lunch Break',
            time: dayjs().set('hour', 12).set('minute', 0).toDate(),
        },
        {
            id: '3',
            type: 'Event',
            label: 'Townhall',
            time: dayjs().set('hour', 15).set('minute', 0).toDate(),
        },
        {
            id: '4',
            type: 'Task',
            label: 'Write Daily Report',
            time: dayjs().set('hour', 17).set('minute', 0).toDate(),
        },
    ];

    return (
        <Card>
            <div className="flex flex-col md:flex-row xl:flex-col md:gap-10 xl:gap-0">
                <div className="flex items-center mx-auto w-[280px]">
                    <Calendar
                        value={selectedDate}
                        onChange={(val) => {
                            setSelectedDate(val);
                        }}
                    />
                </div>
                <div className="w-full">
                    <div className="my-6">
                        <h5>
                            Biomarker Schedule{' '}
                            {selectedDate && dayjs(selectedDate).isSame(dayjs(), 'day')
                                ? 'today'
                                : dayjs(selectedDate).format('DD MMM')}
                        </h5>
                    </div>
                    <div className="w-full">
                        <ScrollBar className="overflow-y-auto h-[280px] xl:max-w-[280px]">
                            <div className="flex flex-col gap-4">
                                {staticEvents.map((event) => (
                                    <ScheduledEvent key={event.id} {...event} />
                                ))}
                            </div>
                        </ScrollBar>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default UpcomingSchedule;
