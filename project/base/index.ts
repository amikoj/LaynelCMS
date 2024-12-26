import { createApp} from 'vue'
import App from './app.vue'
import i18n from '@laynel-ui/i18n'
import ElementPlus from 'element-plus'
import '@/base/styles/global.css'
import 'virtual:uno.css'
import  LaynelComponents from '@laynel-ui/components'
import store from '@laynel-ui/store'


// Create a new Vue instance and mount the App component to the #root element
const app = createApp(App)
// install_components(app)
app.use(i18n).use(ElementPlus).use(store).use(LaynelComponents)
app.mount('#root')