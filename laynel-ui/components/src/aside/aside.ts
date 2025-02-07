import { computed } from "vue"

const STATIC_MENUS = [
    {
        name: 'Dashboard',
        icon: 'fa fa-tachometer-alt',
        url: '/dashboard'
    },
    {
        name: 'Users',
        icon: 'fa fa-users',
        url: '/users'
    },
    {
        name: 'Settings',
        icon: 'fa fa-cogs',
        url: '/settings'
    }
]



export const useAside = () => {

    const menus = computed(() => {
        return STATIC_MENUS
    })


    return {
        menus
    }

}