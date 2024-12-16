import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const conceptsNavigationConfig: NavigationTree[] = [
    {
        key: 'concepts',
        path: '',
        title: 'Concepts',
        translateKey: 'nav.concepts',
        icon: 'concepts',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        meta: {
            horizontalMenu: {
                layout: 'columns',
                columns: 4,
            },
        },
        subMenu: [
            {
                key: 'concepts.ai',
                path: '',
                title: 'AI',
                translateKey: 'nav.conceptsAi.ai',
                icon: 'ai',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.conceptsAi.aiDesc',
                        label: 'AI tools and resources',
                    },
                },
                subMenu: [
                    {
                        key: 'concepts.ai.chat',
                        path: `${CONCEPTS_PREFIX_PATH}/ai/chat`,
                        title: 'Chat',
                        translateKey: 'nav.conceptsAi.chat',
                        icon: 'aiChat',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey: 'nav.conceptsAi.chatDesc',
                                label: 'AI-powered chat systems',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'concepts.projects',
                path: '',
                title: 'Projects',
                translateKey: 'nav.conceptsProjects.projects',
                icon: 'projects',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.conceptsProjects.projectsDesc',
                        label: 'Manage and track projects',
                    },
                },
                subMenu: [
                    
                    {
                        key: 'concepts.projects.projectList',
                        path: `${CONCEPTS_PREFIX_PATH}/projects/project-list`,
                        title: 'Project List',
                        translateKey: 'nav.conceptsProjects.projectList',
                        icon: 'projectList',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsProjects.projectListDesc',
                                label: 'Organize all projects',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'concepts.projects.projectDetails',
                        path: `${CONCEPTS_PREFIX_PATH}/projects/project-details/27`,
                        title: 'Details',
                        translateKey: 'nav.conceptsProjects.projectDetails',
                        icon: 'projectDetails',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsProjects.projectDetailsDesc',
                                label: 'Project detailed information',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'concepts.projects.projectTasks',
                        path: `${CONCEPTS_PREFIX_PATH}/projects/tasks`,
                        title: 'Tasks',
                        translateKey: 'nav.conceptsProjects.projectTasks',
                        icon: 'projectTask',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsProjects.projectTasksDesc',
                                label: 'Manage project tasks',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'concepts.projects.projectIssue',
                        path: `${CONCEPTS_PREFIX_PATH}/projects/tasks/1`,
                        title: 'Issue',
                        translateKey: 'nav.conceptsProjects.projectIssue',
                        icon: 'projectIssue',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsProjects.projectIssueDesc',
                                label: 'Resolve project issues',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'concepts.customers',
                path: '',
                title: 'Customers',
                translateKey: 'nav.conceptsCustomers.customers',
                icon: 'customers',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.conceptsCustomers.customersDesc',
                        label: 'Customer management',
                    },
                },
                subMenu: [
                    {
                        key: 'concepts.customers.customerList',
                        path: `${CONCEPTS_PREFIX_PATH}/customers/customer-list`,
                        title: 'Customer List',
                        translateKey: 'nav.conceptsCustomers.customerList',
                        icon: 'customerList',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsCustomers.customerListDesc',
                                label: 'List of all customers',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'concepts.customers.customerEdit',
                        path: `${CONCEPTS_PREFIX_PATH}/customers/customer-edit/1`,
                        title: 'Customer Edit',
                        translateKey: 'nav.conceptsCustomers.customerEdit',
                        icon: 'customerEdit',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsCustomers.customerEditDesc',
                                label: 'Edit customer info',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'concepts.customers.customerCreate',
                        path: `${CONCEPTS_PREFIX_PATH}/customers/customer-create`,
                        title: 'Customer Create',
                        translateKey: 'nav.conceptsCustomers.customerCreate',
                        icon: 'customerCreate',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsCustomers.customerCreateDesc',
                                label: 'Add a new customer',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'concepts.customers.customerDetails',
                        path: `${CONCEPTS_PREFIX_PATH}/customers/customer-details/1`,
                        title: 'Customer Details',
                        translateKey: 'nav.conceptsCustomers.customerDetails',
                        icon: 'customerDetails',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsCustomers.customerDetailsDesc',
                                label: 'Detailed customer info',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },
            
        ],
    },
]

export default conceptsNavigationConfig
