import { UI_COMPONENTS_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const uiComponentNavigationConfig: NavigationTree[] = [
    {
        key: 'uiComponent',
        path: '',
        title: 'Ui Component',
        translateKey: 'nav.uiComponents',
        icon: 'uiComponents',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        meta: {
            horizontalMenu: {
                layout: 'tabs',
                columns: 2,
            },
        },
        subMenu: [            
            {
                key: 'uiComponent.graph',
                path: '',
                title: 'Graph',
                translateKey: 'nav.uiComponentsGraph.graph',
                icon: 'graph',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.uiComponentsGraph.graphDesc',
                        label: 'Graphical elements',
                    },
                },
                subMenu: [
                    {
                        key: 'uiComponent.graph.charts',
                        path: `${UI_COMPONENTS_PREFIX_PATH}/graph/charts`,
                        title: 'Charts',
                        translateKey: 'nav.uiComponentsGraph.charts',
                        icon: 'uiGraphChart',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.uiComponentsGraph.chartsDesc',
                                label: 'Various charts',
                            },
                        },
                        subMenu: [],
                    },                    
                ],
            },
        ],
    },
]

export default uiComponentNavigationConfig
