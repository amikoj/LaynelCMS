import { computed, Ref } from "vue";
import { WindowContext } from "../interface";




export const useWindowContext = () => {
    const context: Ref<WindowContext> = computed(() =>(window as any)?.__context__ ?? {});

    return {
        context,
    }
}