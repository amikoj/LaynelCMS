
import { useWindowContext, WindowContext } from '@laynel-ui/hooks'
import { defineStore } from 'pinia'
import { AppSettings } from './interface';
import { computed, ref, toRefs } from 'vue';

const defaultAppSettings: AppSettings = {
    layout:'common',
    primaryColor: '#007bff',
    theme: 'light',
    direction: 'ltr',
    language: 'zh-cn',
}

export const useAppStore = defineStore('app', () => {

    const isCollapse = ref<boolean>(false); // 是否收缩菜单
    const windowContext = useWindowContext();

    const { context } = toRefs(windowContext);


    // 当前路由
    const route = computed(() => {

        if(context.value?.route) {
            return JSON.parse(context.value.route);
        }
        return {};
    });


    const routes = computed(() => {
        return route.value.routes;
    })

    const settings = ref<AppSettings>(defaultAppSettings);

    const layout = computed(() => {
        return settings.value.layout ?? 'common';
    });

    const primaryColor = computed(() => {
        return settings.value.primaryColor?? '#007bff';
    });



    /**
     * toggle collapse menu
     */
    const toggleCollapse = () => {
        isCollapse.value = !isCollapse.value;
    }

    return  {
        // state
        context,
        route,
        routes,
        settings,
        layout,
        primaryColor,
        isCollapse,

        toggleCollapse,
    }
});