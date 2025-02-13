
import { LaynelHeader, LaynelToolkit } from './header'
import { LaynelAside } from './aside'
import 'virtual:uno.css'
export * from './header'
export * from './aside'



const components: Record<string, any> = {
    LaynelHeader,
    LaynelToolkit,
    LaynelAside
}


export default {
    install(app: any) {

        for (const key in components) {
            const component = components[key]
            if (component.install) {
                component.install(app)
            }else {
                app.component(key, component)
            }
        }
    }
}

