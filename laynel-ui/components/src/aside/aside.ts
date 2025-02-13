import { computed } from "vue"
import { useAppStore } from '@laynel-ui/store';

const STATIC_MENUS = [
    {
        title: '仪表盘',
        icon: 'material-symbols:home',
        url: '/dashboard'
    },
    {
        title: '内容管理',
        icon: 'material-symbols:library-books',
        url: '/content',
        children: [
            {
                title: '文章管理',
                url: '/content/article'
            },
            {
                title: '分类管理',
                url: '/content/category'
            }
        ]
    },
    {
        title: '插件管理',
        icon: 'material-symbols:extension',
        url: '/plugin',
        children: [
            {
                title: '插件列表',
                url: '/plugin/list'
            },
            {
                title: '插件市场',
                url: '/plugin/market'
            }
        ]
    },
    {
        title: '主题管理',
        icon: 'material-symbols:palette',
        url: '/theme',
        children: [
            {
                title: '主题列表',
                url: '/theme/list'
            },
            {
                title: '主题市场',
                url: '/theme/market'
            }
        ]
    },
    {
        title: '作品管理',
        icon: 'material-symbols:folder',
        url: '/work',
        children: [
            {
                title: '作品列表',
                url: '/work/list'
            },
            {
                title: '作品分类',
                url: '/work/category'
            }
        ]   

    },
    {
        title: '系统管理',
        icon: 'material-symbols:settings',
        url: '/setting',
        children: [
            {
                title: '用户管理',
                url: '/settings/user'
            },
            {
                title: '角色管理',
                url: '/settings/role'
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