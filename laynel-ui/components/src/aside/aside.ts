import { computed, toRefs } from "vue"
import { useAppStore } from '@laynel-ui/store';

export const URL_PREFIX = '/admin'

export interface MenuItemProps {
    title: string;
    icon?: string;
    url: string;
    children?: MenuItemProps[];
    [key: string]: any;
}


export const useAside = () => {
    const appStore = useAppStore()
    const { toggleCollapse } = appStore
    const { isCollapse , primaryColor, routes, route} = toRefs(appStore)

    const menus = computed(() => {
        console.log(routes.value)
        return routes.value
    })


    const jumpTo = (item: MenuItemProps) => {
        window.location.href = `${URL_PREFIX}${item.url}`
    }

    return {
        menus,
        primaryColor,
        isCollapse, 
        route,
        toggleCollapse,
        jumpTo,
    }

}