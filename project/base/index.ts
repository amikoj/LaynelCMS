import { createApp} from 'vue'
import App from './app.vue'
import i18n from '@/base/i18n'
// import  { install_components } from './element-ui'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import '@/base/styles/global.css'
import 'virtual:uno.css'

// Create a new Vue instance and mount the App component to the #root element
const app = createApp(App)
// install_components(app)
app.use(i18n).use(ElementPlus).use(createPinia())
app.mount('#root')