
import {useWindowContext } from '@/base/hooks/window'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {

    const { context } = useWindowContext();

    return  {
        // state
        ctx: context,
        
    }
});