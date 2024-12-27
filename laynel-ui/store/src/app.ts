
import { useWindowContext, WindowContext } from '@laynel-ui/hooks'
import { defineStore } from 'pinia'
import { AppSettings } from './interface';
import { computed, ref } from 'vue';

const defaultAppSettings: AppSettings = {
    layout:'common',
    primaryColor: '#007bff',
}

export const useAppStore = defineStore('app', () => {

    const { context } = useWindowContext();
    const settings = ref<AppSettings>(defaultAppSettings);

    const layout = computed(() => {
        return settings.value.layout ?? 'common';
    });

    const primaryColor = computed(() => {
        return settings.value.primaryColor?? '#007bff';
    });

    return  {
        // state
        ctx: context.value as WindowContext,
        settings,
        layout,
        primaryColor,
    }
});