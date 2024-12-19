import { createApp} from 'vue'
import App from './app.vue'
import i18n from '@/base/i18n'


const app = createApp(App)

app.use(i18n)
app.mount('#root')