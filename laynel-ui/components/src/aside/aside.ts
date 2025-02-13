import { computed } from "vue"
import { useAppStore } from '@laynel-ui/store';

const STATIC_MENUS = [
    {
        title: '仪表盘',
        icon: 'fa fa-tachometer-alt',
        url: '/dashboard'
    },
    {
        title: '系统管理',
        icon: 'fa fa-setting',
        url: '/setting',
        children: [
            {
                title: '用户管理',
                icon: 'fa fa-user',
                url: '/settings/user'
            }
        ]
    },
]



export const useAside = () => {


    const  { primaryColor,isCollapse, toggleCollapse } = useAppStore()
    const menus = computed(() => {
        return STATIC_MENUS
    })


    return {
        menus,
        primaryColor,

        isCollapse, 
        toggleCollapse,
    }

}