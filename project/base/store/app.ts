
import {useWindowContext } from '@/base/hooks/window'
import { defineStore } from 'pinia'
import { AppSettings, WindowContext } from '../interface';
import { computed, ref } from 'vue';

const defaultAppSettings: AppSettings = {
    layout:'common'
}

export const useAppStore = defineStore('app', () => {

    const { context } = useWindowContext();
    const settings = ref<AppSettings>(defaultAppSettings);

    const layout = computed(() => {
        return settings.value.layout ?? 'common';
    });

    return  {
        // state
        ctx: context.value as WindowContext,
        settings,
        layout,
    }
});