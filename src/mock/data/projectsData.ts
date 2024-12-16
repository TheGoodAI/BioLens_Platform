const y = new Date().getFullYear()

export const projectDetailsData = {
    content: `<h5>Patient overview</h5><p>68-year-old male patient with multiple chronic conditions including hypertension and type 2 diabetes. Regular monitoring and consistent follow-up required for optimal health management. Patient demonstrates good compliance with prescribed treatments and maintains scheduled appointments.</p><h5>About the patient</h5><p>Under continuous care since March 2019. Patient presents with a complex medical history requiring coordinated care across multiple specialties. Treatment compliance has been excellent with notable improvements in health indicators over the past two years.</p><ul><li>Cardiovascular Status: Primary diagnosis of hypertension with BP readings stabilized at 132/82 mmHg (average over past 3 months). Current medication regimen includes Lisinopril 10mg daily and Amlodipine 5mg daily. Recent echocardiogram shows improved left ventricular function with EF at 54%.</li><li>Diabetes Management: Type 2 Diabetes well-controlled with current HbA1c at 6.8%. Treatment includes Metformin 1000mg BID and Jardiance 10mg daily. CGM data shows 85% Time in Range with minimal hypoglycemic events.</li><li>Preventive Care: Completed annual health screenings including colonoscopy (2023), cardiac stress test, and immunizations. Regular monitoring of comprehensive metabolic panel and lipid profile shows stable results.</li></ul><img src="/img/others/article-img-1.jpg" alt="Patient Health Trends" /><h5>Treatment goals</h5><p>Current objectives focus on maintaining stable vital signs and optimizing medication management. Goals include sustaining BP below 135/85 mmHg, HbA1c below 7.0%, and implementing structured lifestyle modifications for improved health outcomes. Regular monitoring and periodic health assessments are essential components of the care plan.</p><h5>Care requirements</h5><p>Treatment protocol includes daily blood pressure monitoring, weekly medication compliance checks, and monthly comprehensive health evaluations. Coordination with specialists including cardiology and endocrinology maintains integrated care approach. Regular laboratory assessments and preventive screenings scheduled as per standard protocols.</p>`,
    activities: [],
    members: [],
    tasks: [],
    client: {
        clientName: 'Metro Healthcare Partners',
        skateHolder: {
            name: 'Dr. Sarah Thompson',
            img: '/img/avatars/thumb-2.jpg',
        },
        projectManager: {
            name: 'Nancy Chen',
            img: '/img/avatars/thumb-3.jpg',
        },
    },
    schedule: {
        startDate: 1709994804,
        dueDate: 1741502004,
        status: 'Active',
        completion: 85,
    },
}

export const projectListData = [
    {
        id: '27',
        name: 'James Wilson',
        category: 'Cardiology',
        desc: 'Hypertension patient requiring regular blood pressure monitoring and medication management',
        attachmentCount: 12,
        totalTask: 32,
        completedTask: 27,
        progression: 80,
        dayleft: 21,
        favourite: true,
        member: [
            {
                name: 'Dr. Sarah Thompson',
                img: '/img/avatars/thumb-8.jpg',
            },
            {
                name: 'Nurse Wilson',
                img: '/img/avatars/thumb-5.jpg',
            },
        ],
    },
    {
        id: '28',
        name: 'Mary Johnson',
        category: 'Endocrinology',
        desc: 'Type 2 diabetes patient with recent medication adjustments',
        attachmentCount: 5,
        totalTask: 36,
        completedTask: 15,
        progression: 45,
        dayleft: 19,
        favourite: true,
        member: [
            {
                name: 'Dr. Roberts',
                img: '/img/avatars/thumb-1.jpg',
            },
        ],
    },
    {
        id: '29',
        name: 'Robert Davis',
        category: 'Pulmonology',
        desc: 'Chronic asthma patient requiring regular respiratory assessments and inhaler management',
        attachmentCount: 8,
        totalTask: 27,
        completedTask: 19,
        progression: 73,
        dayleft: 6,
        favourite: false,
        member: [
            {
                name: 'Dr. Martinez',
                img: '/img/avatars/thumb-3.jpg',
            },
            {
                name: 'Nurse Chen',
                img: '/img/avatars/thumb-9.jpg',
            },
        ],
    },
    {
        id: '31',
        name: 'Patricia Brown',
        category: 'Orthopedics',
        desc: 'Post-operative knee replacement patient in rehabilitation phase',
        attachmentCount: 8,
        totalTask: 78,
        completedTask: 23,
        progression: 21,
        dayleft: 52,
        favourite: true,
        member: [
            {
                name: 'Dr. Anderson',
                img: '/img/avatars/thumb-10.jpg',
            },
            {
                name: 'PT Smith',
                img: '/img/avatars/thumb-8.jpg',
            },
            {
                name: 'Nurse Wilson',
                img: '/img/avatars/thumb-6.jpg',
            },
            {
                name: 'Dr. Thompson',
                img: '/img/avatars/thumb-11.jpg',
            },
            {
                name: 'RN Johnson',
                img: '/img/avatars/thumb-14.jpg',
            },
        ],
    },
    {
        id: '30',
        name: 'Michael Lee',
        category: 'Neurology',
        desc: 'Chronic migraine patient on preventive medication therapy',
        attachmentCount: 2,
        totalTask: 15,
        completedTask: 13,
        progression: 87,
        dayleft: 2,
        favourite: true,
        member: [
            {
                name: 'Dr. Williams',
                img: '/img/avatars/thumb-11.jpg',
            },
        ],
    },
    {
        id: '32',
        name: 'Sarah Adams',
        category: 'Gastroenterology',
        desc: 'IBS patient following specialized dietary protocol with regular monitoring',
        attachmentCount: 6,
        totalTask: 18,
        completedTask: 9,
        progression: 50,
        dayleft: 6,
        favourite: false,
        member: [
            {
                name: 'Dr. Roberts',
                img: '/img/avatars/thumb-12.jpg',
            },
        ],
    },
    {
        id: '33',
        name: 'David Miller',
        category: 'Primary Care',
        desc: 'Annual physical examination and preventive care screening due',
        attachmentCount: 3,
        totalTask: 26,
        completedTask: 19,
        progression: 67,
        dayleft: 14,
        favourite: false,
        member: [
            {
                name: 'Dr. Baker',
                img: '/img/avatars/thumb-4.jpg',
            },
            {
                name: 'Nurse Wells',
                img: '/img/avatars/thumb-8.jpg',
            },
        ],
    },
    {
        id: '34',
        name: 'Linda White',
        category: 'Rheumatology',
        desc: 'Rheumatoid arthritis patient requiring ongoing pain management and monitoring',
        attachmentCount: 3,
        totalTask: 26,
        completedTask: 19,
        progression: 88,
        dayleft: 18,
        favourite: false,
        member: [
            {
                name: 'Dr. Carter',
                img: '/img/avatars/thumb-1.jpg',
            },
            {
                name: 'RN Wilson',
                img: '/img/avatars/thumb-7.jpg',
            },
        ],
    },
    {
        id: '35',
        name: 'Thomas Garcia',
        category: 'Psychiatry',
        desc: 'Anxiety disorder patient with medication management and regular counseling',
        attachmentCount: 3,
        totalTask: 74,
        completedTask: 31,
        progression: 42,
        dayleft: 37,
        favourite: false,
        member: [
            {
                name: 'Dr. Murray',
                img: '/img/avatars/thumb-13.jpg',
            },
            {
                name: 'Therapist Soto',
                img: '/img/avatars/thumb-15.jpg',
            },
        ],
    },
]

const toBeProcessCards = [
    {
        id: 'zb7zxtjctd',
        name: 'New Patient Intake - Diabetes',
        description:
            'New patient presenting with uncontrolled Type 2 Diabetes. Initial A1C reading: 8.9%. Patient reports frequent urination, increased thirst, and fatigue. Previous medical records pending from primary care physician.',
        cover: '/img/others/img-13.jpg',
        members: [
            {
                id: '1',
                name: 'Dr. Sarah Thompson',
                email: 'thompson.s@healthcare.com',
                img: '/img/avatars/thumb-1.jpg',
            },
            {
                id: '2',
                name: 'Nurse Chen',
                email: 'chen.n@healthcare.com',
                img: '/img/avatars/thumb-2.jpg',
            },
            {
                id: '3',
                name: 'Dr. Roberts',
                email: 'roberts.e@healthcare.com',
                img: '/img/avatars/thumb-3.jpg',
            },
        ],
        labels: ['Urgent', 'New Patient'],
        attachments: [
            {
                id: 'jubuK7XGp3',
                name: 'lab_results.pdf',
                src: '/img/others/img-13.jpg',
                size: '36.1kb',
            },
            {
                id: 'xsb3HCejCM',
                name: 'medical_history.pdf',
                src: '/img/others/img-14.jpg',
                size: '55.9kb',
            },
        ],
        comments: [
            {
                id: 'R22TqMkACm',
                name: 'Dr. Thompson',
                src: '/img/avatars/thumb-9.jpg',
                message:
                    'Patient requires immediate intervention for glucose management. Scheduling comprehensive diabetes education and nutrition consultation. Will start on Metformin 500mg BID after baseline kidney function is assessed.',
                date: new Date(y, 4, 20),
            },
        ],
        dueDate: new Date(y, 7, 5),
        checked: false,
    },
    {
        id: '7qgsduurxt',
        name: 'Abnormal Blood Pressure Readings',
        description:
            'Patient presenting with consistently elevated blood pressure readings over past week. Average readings: 162/95 mmHg. Currently on Lisinopril 10mg daily. No other symptoms reported.',
        cover: '',
        members: [
            {
                id: '8',
                name: 'Dr. Wilson',
                email: 'wilson.m@healthcare.com',
                img: '/img/avatars/thumb-8.jpg',
            },
        ],
        labels: ['Priority'],
        attachments: [],
        comments: [
            {
                id: 'Wx8FDSsVTg',
                name: 'Nurse Martinez',
                src: '/img/avatars/thumb-6.jpg',
                message:
                    'Evening readings showing slight improvement: 158/92 mmHg. Patient confirms medication compliance.',
                date: new Date(y, 4, 20),
            },
            {
                id: '3AhkqqSFFr',
                name: 'Dr. Wilson',
                src: '/img/avatars/thumb-3.jpg',
                message:
                    'Increasing Lisinopril to 20mg daily. Schedule follow-up in one week. Request home BP monitoring logs.',
                date: new Date(y, 4, 20),
            },
        ],
        dueDate: new Date(y, 6, 11),
    },
    {
        id: 'wtwgpz6csc',
        name: 'Routine Follow-up - Asthma',
        description:
            'Quarterly follow-up for asthma management. Patient reports good control with current inhaler regimen. Peak flow readings within normal range.',
        cover: '',
        members: [
            {
                id: '13',
                name: 'Dr. Murray',
                email: 'murray.c@healthcare.com',
                img: '/img/avatars/thumb-13.jpg',
            },
            {
                id: '5',
                name: 'Nurse Stewart',
                email: 'stewart.e@healthcare.com',
                img: '/img/avatars/thumb-5.jpg',
            },
        ],
        labels: ['Routine'],
        attachments: [],
        comments: [
            {
                id: 'bAvBdtKHNC',
                name: 'Dr. Murray',
                src: '/img/avatars/thumb-11.jpg',
                message:
                    'Pulmonary function tests stable. Continuing current medication regimen. Review proper inhaler technique at next visit.',
                date: new Date(y, 4, 20),
            },
        ],
        dueDate: new Date(y, 7, 5),
        checked: false,
    },
]

const processingCards = [
    {
        id: 'ywejrdr3rn',
        name: 'Cardiac Monitoring Required',
        description:
            'Patient experiencing intermittent chest pain with elevated blood pressure readings. Holter monitor placed for 24-hour cardiac rhythm assessment. Initial ECG shows minor ST changes.',
        cover: '',
        members: [
            {
                id: '2',
                name: 'Dr. Thompson',
                email: '',
                img: '/img/avatars/thumb-2.jpg',
            },
            {
                id: '8',
                name: 'Nurse Wilson',
                email: 'wilson.n@healthcare.com',
                img: '/img/avatars/thumb-8.jpg',
            },
        ],
        labels: ['Urgent'],
        attachments: [],
        comments: [
            {
                id: 'afPugkEmkp',
                name: 'Dr. Thompson',
                src: '/img/avatars/thumb-1.jpg',
                message: '',
                date: new Date(y, 5, 16),
            },
        ],
        dueDate: new Date(y, 3, 17),
        checked: false,
    },
    {
        id: 'tkBXWJGwkr',
        name: 'Post-Surgery Recovery',
        description:
            'Day 2 post-knee replacement surgery. Patient reporting moderate pain levels (5/10). Physical therapy to begin this afternoon.',
        cover: '',
        members: [
            {
                id: '10',
                name: 'Dr. Miles',
                email: 'miles.e@healthcare.com',
                img: '/img/avatars/thumb-10.jpg',
            },
        ],
        labels: ['In Treatment'],
        attachments: [
            {
                id: 'NjHJhHeWrG',
                name: 'post_op_xray.jpg',
                src: '/img/others/img-16.jpg',
                size: '46.1kb',
            },
        ],
        comments: [
            {
                id: 'MAsPDzGwnA',
                name: 'Dr. Alexander',
                src: '/img/avatars/thumb-3.jpg',
                message:
                    'PT evaluation scheduled for 2 PM. Continue current pain management protocol. Monitor wound site for any signs of infection.',
                date: new Date(y, 4, 20),
            },
        ],
        dueDate: null,
        checked: false,
    },
    {
        id: 'VQgUDrYJYH',
        name: 'Diabetes Management Review',
        description:
            'Monthly diabetes follow-up appointment. Recent HbA1c: 7.2%. Patient maintains good medication compliance but reports occasional difficulty with dietary restrictions. Blood glucose logs show some elevated evening readings.',
        cover: '',
        members: [
            {
                id: '6',
                name: 'Dr. Pierce',
                email: 'pierce.a@healthcare.com',
                img: '/img/avatars/thumb-6.jpg',
            },
        ],
        labels: ['Routine', 'Follow-up'],
        attachments: [],
        comments: [],
        dueDate: new Date(y, 4, 20),
        checked: false,
    },
]

const submittedCards = [
    {
        id: 'jzjn95g3v4',
        name: 'Medication Review Required',
        description:
            'Patient reported mild side effects from current hypertension medication. Blood pressure readings stable at 128/82. Considering adjustment to current beta-blocker dosage.',
        cover: '',
        members: [
            {
                id: '3',
                name: 'Dr. Alexander',
                email: 'alexander.m@healthcare.com',
                img: '/img/avatars/thumb-3.jpg',
            },
        ],
        labels: ['Medication Review'],
        attachments: [],
        comments: [
            {
                id: 'nBAGhJqe9v',
                name: 'Dr. Alexander',
                src: '/img/avatars/thumb-3.jpg',
                message: '',
                date: new Date(y, 1, 8),
            },
        ],
        dueDate: null,
        checked: false,
    },
    {
        id: 'ZFQDPmscwA',
        name: 'Lab Results for Review',
        description:
            'Comprehensive metabolic panel and lipid profile results ready for review. Notable elevation in liver enzymes. Patient fasting compliance confirmed.',
        cover: '/img/others/img-15.jpg',
        members: [
            {
                id: '9',
                name: 'Dr. Simmmons',
                email: 'simmmons.c@healthcare.com',
                img: '/img/avatars/thumb-9.jpg',
            },
            {
                id: '10',
                name: 'Dr. Miles',
                email: 'miles.e@healthcare.com',
                img: '/img/avatars/thumb-10.jpg',
            },
        ],
        labels: ['Priority Review'],
        attachments: [
            {
                id: 'NjHJhHeWrG',
                name: 'lab_results.pdf',
                src: '/img/others/img-15.jpg',
                size: '42.6kb',
            },
        ],
        comments: [
            {
                id: 'nBAGhJqe9v',
                name: 'Dr. Alexander',
                src: '/img/avatars/thumb-3.jpg',
                message:
                    'ALT and AST levels elevated to twice normal range. Recommend ultrasound of liver and repeat labs in 2 weeks. Will discuss lifestyle modifications at follow-up appointment.',
                date: new Date(y, 1, 8),
            },
        ],
        dueDate: null,
        checked: false,
    },
]

const completedCards = [
    {
        id: 'yhjk5679xr',
        name: 'Treatment Complete - Physical Therapy',
        description:
            'Patient has completed 12-week post-operative physical therapy program. All rehabilitation goals met. Range of motion restored to 95% of baseline.',
        cover: '',
        members: [
            {
                id: '13',
                name: 'Dr. Murray',
                email: 'murray.c@healthcare.com',
                img: '/img/avatars/thumb-13.jpg',
            },
            {
                id: '9',
                name: 'PT Simmmons',
                email: 'simmmons.c@healthcare.com',
                img: '/img/avatars/thumb-9.jpg',
            },
        ],
        labels: ['Completed'],
        attachments: [],
        comments: [
            {
                id: 'yxc5gwrXUZ',
                name: 'Dr. Alexander',
                src: '/img/avatars/thumb-3.jpg',
                message:
                    'Patient cleared for return to normal activities. Maintenance exercise program provided. Follow-up in 3 months.',
                date: new Date(y, 3, 4),
            },
        ],
        dueDate: new Date(y, 3, 4),
        checked: true,
    },
    {
        id: 'UMgvapYVXm',
        name: 'Medication Adjustment Successful',
        description:
            'Blood pressure now stabilized with new medication regimen. Average readings 122/78 mmHg over past week.',
        cover: '',
        members: [
            {
                id: '5',
                name: 'Dr. Stewart',
                email: 'stewart.e@healthcare.com',
                img: '/img/avatars/thumb-5.jpg',
            },
            {
                id: '6',
                name: 'Nurse Pierce',
                email: 'pierce.a@healthcare.com',
                img: '/img/avatars/thumb-6.jpg',
            },
            {
                id: '7',
                name: 'Nurse Horton',
                email: 'horton.r@healthcare.com',
                img: '/img/avatars/thumb-7.jpg',
            },
        ],
        labels: ['Resolved'],
        attachments: [],
        comments: [],
        dueDate: new Date(y, 7, 19),
        checked: true,
    },
    {
        id: 'uRZNVsCmDW',
        name: 'Diabetes Education Complete',
        description:
            'Patient has completed comprehensive diabetes management program. Demonstrates proper glucose monitoring technique and understanding of dietary guidelines.',
        cover: '',
        members: [
            {
                id: '4',
                name: 'Nurse Baker',
                email: 'baker.s@healthcare.com',
                img: '/img/avatars/thumb-4.jpg',
            },
        ],
        labels: ['Education Complete'],
        attachments: [],
        comments: [],
        dueDate: new Date(y, 4, 6),
        checked: true,
    },
    {
        id: 'PBSGmhVgvS',
        name: 'Annual Physical Completed',
        description:
            'All preventive screenings completed. Immunizations updated. Health maintenance plan reviewed.',
        cover: '',
        members: [
            {
                id: '5',
                name: 'Dr. Stewart',
                email: 'stewart.e@healthcare.com',
                img: '/img/avatars/thumb-5.jpg',
            },
            {
                id: '3',
                name: 'Dr. Alexander',
                email: 'alexander.m@healthcare.com',
                img: '/img/avatars/thumb-3.jpg',
            },
        ],
        labels: ['Routine Complete'],
        attachments: [],
        comments: [
            {
                id: 'dNskbPFeQD',
                name: 'Dr. Alexander',
                src: '/img/avatars/thumb-3.jpg',
                message:
                    'All screening results within normal limits. Schedule follow-up in one year.',
                date: new Date(y, 4, 20),
            },
            {
                id: 'qNzkmRZiTO',
                name: 'Dr. Thompson',
                src: '/img/avatars/thumb-2.jpg',
                message: 'Confirmed.',
                date: new Date(y, 4, 20),
            },
        ],
        dueDate: new Date(y, 7, 13),
        checked: true,
    },
]

export const issueData = {
    ticketId: '#PT-127',
    title: 'Abnormal Lab Results',
    createdBy: 'Dr. Thompson',
    underProject: 'Patient Care',
    status: 'In progress',
    priority: 'High',
    description: `<p>Patient's recent laboratory results show significant abnormalities requiring immediate attention. Comprehensive metabolic panel indicates elevated liver enzymes (ALT: 150, AST: 165) and borderline kidney function (GFR: 58).</p>
	<p>Current symptoms include fatigue, mild abdominal discomfort, and decreased appetite over the past two weeks. No fever or acute distress noted.</p>
	<p>Patient's medication list has been reviewed for potential drug-induced liver injury. Currently taking: Lisinopril 10mg daily, Metformin 1000mg BID, Atorvastatin 40mg daily.</p>
	<p>Family history significant for autoimmune hepatitis in mother. No recent alcohol use or exposure to hepatotoxic substances reported.</p>
	`,
    dueDate: 1742795479,
    assignees: [
        {
            id: '2',
            name: 'Dr. Thompson',
            email: 'thompson.s@healthcare.com',
            img: '/img/avatars/thumb-2.jpg',
        },
        {
            id: '3',
            name: 'Dr. Alexander',
            email: 'alexander.m@healthcare.com',
            img: '/img/avatars/thumb-3.jpg',
        },
    ],
    labels: [
        {
            id: '1',
            title: 'Urgent',
        },
        {
            id: '2',
            title: 'Lab Review',
        },
    ],
    comments: [
        {
            id: 'Wx8FDSsVTg',
            name: 'Nurse Pierce',
            src: '/img/avatars/thumb-6.jpg',
            message:
                'Patient contacted and scheduled for follow-up appointment tomorrow at 10 AM. Fasting labs will be repeated.',
            date: new Date(y, 4, 20),
        },
        {
            id: '3AhkqqSFFr',
            name: 'Dr. Wilson',
            src: '/img/avatars/thumb-7.jpg',
            message:
                '<strong>@Dr.Thompson</strong> Recommending temporary discontinuation of atorvastatin pending further evaluation.',
            date: new Date(y, 4, 20),
        },
    ],
    attachments: [
        {
            id: 'jubuK7XGp3',
            name: 'lab_results.pdf',
            src: '/img/others/img-13.jpg',
            size: '36.1kb',
        },
        {
            id: 'NjHJhHeWrG',
            name: 'previous_labs.pdf',
            src: '/img/others/img-16.jpg',
            size: '46.1kb',
        },
    ],
    activity: [
        {
            type: 'UPDATE-TICKET',
            dateTime: 1646580000,
            ticket: 'PT-127',
            status: 1,
            userName: 'Dr. Thompson',
            userImg: '',
        },
        {
            type: 'COMMENT',
            dateTime: 1646578417,
            userName: 'Nurse Pierce',
            userImg: '/img/avatars/thumb-1.jpg',
            comment: `Patient scheduled for follow-up tomorrow. Labs ordered.`,
        },
        {
            type: 'ADD-TAGS-TO-TICKET',
            dateTime: 1646574027,
            userName: 'Dr. Stewart',
            tags: ['Urgent', 'Lab Review'],
        },
        {
            type: 'ADD-FILES-TO-TICKET',
            dateTime: 1646569123,
            userName: 'Nurse Baker',
            files: ['lab_results.pdf'],
            ticket: 'PT-1092',
        },
        {
            type: 'COMMENT-MENTION',
            dateTime: 1646565473,
            userName: 'Dr. Wilson',
            userImg: '/img/avatars/thumb-7.jpg',
            comment: `<strong>@Dr.Thompson</strong> Recommending temporary discontinuation of atorvastatin pending further evaluation.`,
        },
        {
            type: 'ASSIGN-TICKET',
            dateTime: 1646554397,
            userName: 'Dr. Wheeler',
            assignee: 'Dr. Moreno',
            ticket: 'PT-1092',
        },
    ],
}

export const scrumboardData = {
    'New Patients': toBeProcessCards,
    'In Treatment': processingCards,
    'For Review': submittedCards,
    Discharged: completedCards,
}

export const taskBugFix = [
    {
        id: '0a2ff03d-1b61-4ab0-aa43-e5c7f4578a79',
        name: 'Blood Pressure Check Required',
        dueDate: '2024-08-05T00:00:00.000Z',
        checked: false,
        progress: 'In Progress',
        priority: 'High',
        assignee: {
            name: 'Nurse Wells',
            img: '/img/avatars/thumb-8.jpg',
        },
    },
    {
        id: 'da1d38c9-e7ad-4d7d-88d4-bc88e152d10e',
        name: 'Glucose Level Monitoring',
        dueDate: '2024-07-15T00:00:00.000Z',
        checked: true,
        progress: 'Completed',
        priority: 'Medium',
        assignee: {
            name: 'Dr. Thompson',
            img: '/img/avatars/thumb-2.jpg',
        },
    },
    {
        id: 'cd820d94-aa38-40f0-97ab-2a5c82f3c701',
        name: 'Heart Rate Monitoring',
        dueDate: '2024-09-20T00:00:00.000Z',
        checked: false,
        progress: 'In Progress',
        priority: 'High',
        assignee: {
            name: 'Dr. Miles',
            img: '/img/avatars/thumb-10.jpg',
        },
    },
    {
        id: 'f5bfcff3-975c-4b22-a49b-1eeb8a3c03ec',
        name: 'Temperature Check',
        dueDate: '2024-09-05T00:00:00.000Z',
        checked: false,
        progress: 'In Progress',
        priority: 'High',
        assignee: {
            name: 'Nurse Alexander',
            img: '/img/avatars/thumb-3.jpg',
        },
    },
    {
        id: 'c773847d-7f60-4d27-b3b0-6f61915e9b1a',
        name: 'Respiratory Rate Assessment',
        dueDate: '2024-07-25T00:00:00.000Z',
        checked: true,
        progress: 'Completed',
        priority: 'Medium',
        assignee: {
            name: 'Dr. Gotelli',
            img: '/img/avatars/thumb-1.jpg',
        },
    },
]

export const taskDevelopment = [
    {
        id: '9ff33d5e-2f1c-4b20-b8ae-2241ed9cc624',
        name: 'Medication Review',
        dueDate: '2024-08-30T00:00:00.000Z',
        checked: false,
        progress: 'Pending',
        priority: 'Medium',
        assignee: {
            name: 'Dr. Thompson',
            img: '/img/avatars/thumb-2.jpg',
        },
    },
    {
        id: 'a6951cbb-fb0d-4223-b73a-8b8b9e40f0d2',
        name: 'Physical Therapy Session',
        dueDate: '2024-10-15T00:00:00.000Z',
        checked: false,
        progress: 'Pending',
        priority: 'Low',
        assignee: {
            name: 'PT Thompson',
            img: '/img/avatars/thumb-2.jpg',
        },
    },
    {
        id: 'b671d721-4d5e-4b63-8827-739e8d5cb22c',
        name: 'Update Treatment Plan',
        dueDate: '2024-08-10T00:00:00.000Z',
        checked: false,
        progress: 'In Progress',
        priority: 'High',
        assignee: {
            name: 'Dr. Alexander',
            img: '/img/avatars/thumb-3.jpg',
        },
    },
    {
        id: 'f4d29527-84e6-4702-92d6-805b6a703dc8',
        name: 'Patient Education Session',
        dueDate: '2024-08-20T00:00:00.000Z',
        checked: false,
        progress: 'Pending',
        priority: 'Medium',
        assignee: {
            name: 'Nurse Pierce',
            img: '/img/avatars/thumb-6.jpg',
        },
    },
]

export const taskUiUx = [
    {
        id: 'b8d49ba2-ae0e-4567-aa82-ef057f0a2d2b',
        name: 'Annual Physical Examination',
        dueDate: '2024-09-25T00:00:00.000Z',
        checked: false,
        progress: 'In Progress',
        priority: 'High',
        assignee: {
            name: 'Dr. Thompson',
            img: '/img/avatars/thumb-2.jpg',
        },
    },
    {
        id: 'fffb790d-fc52-4df6-8403-07128cc6fb31',
        name: 'Vaccination Schedule Review',
        dueDate: '2024-08-15T00:00:00.000Z',
        checked: false,
        progress: 'Pending',
        priority: 'Medium',
        assignee: {
            name: 'Nurse Pierce',
            img: '/img/avatars/thumb-6.jpg',
        },
    },
    {
        id: 'b32d5d2b-f762-426f-9bbd-ec15c879e1a5',
        name: 'Health Screening Assessment',
        dueDate: '2024-10-05T00:00:00.000Z',
        checked: false,
        progress: 'Pending',
        priority: 'Low',
        assignee: {
            name: 'Dr. Gotelli',
            img: '/img/avatars/thumb-1.jpg',
        },
    },
]

export const taskPlaning = [
    {
        id: '8e00e8d5-b87e-4c97-8d80-695ff91f50b0',
        name: 'Treatment Plan Development',
        dueDate: '2024-09-30T00:00:00.000Z',
        checked: false,
        progress: 'In Progress',
        priority: 'High',
        assignee: {
            name: 'Dr. Thompson',
            img: '/img/avatars/thumb-2.jpg',
        },
    },
    {
        id: 'a1a1d440-8f4c-4be4-a92b-249107fd4e1d',
        name: 'Quarterly Care Review Schedule',
        dueDate: '2024-08-20T00:00:00.000Z',
        checked: false,
        progress: 'Pending',
        priority: 'Medium',
        assignee: {
            name: 'Nurse Pierce',
            img: '/img/avatars/thumb-6.jpg',
        },
    },
    {
        id: 'c18b5a49-43f1-4dd3-bf5a-3f4e5e4b3db2',
        name: 'Long-term Care Strategy Planning',
        dueDate: '2024-10-10T00:00:00.000Z',
        checked: false,
        progress: 'Pending',
        priority: 'Low',
        assignee: {
            name: 'Dr. Gotelli',
            img: '/img/avatars/thumb-1.jpg',
        },
    },
]

export const tasksData = {
    'Bug fix': taskBugFix,
    Development: taskDevelopment,
    'UI/UX': taskUiUx,
    Planing: taskPlaning,
}
