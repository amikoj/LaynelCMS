

export const useWindowContext = () => {

    const context = computed(() => window.context);


    return {
        context,
    }
}