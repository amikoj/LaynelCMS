import { withInstall } from '@laynel-ui/utils'
import CommonLayout  from './common.vue'
import type { App } from 'vue'


/**
 * 单独导出layout组件
 */
export const  LaynelCommonLayout = withInstall(CommonLayout, 'laynel-common')



/**
 * 所有的layout组件集合
 */
const components: Record<string, typeof CommonLayout> = {
   'laynel-common': LaynelCommonLayout,
}


export const Layouts  = Object.freeze(components)


export default  {
    install: (app: App) => {
        for (const key in components) {
            const component = components[key]
            if (component.install) {
                component.install(app)
            }else{
                app.component(key, component)
            }
            
        }
    }
}