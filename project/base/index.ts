import { createApp} from 'vue'
import App from './app.vue'
import ElementPlus from 'element-plus'
import i18n from '@/base/i18n'


const app = createApp(App)

app.use(i18n)
.use(ElementPlus)
app.mount('#root')