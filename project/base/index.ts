import { createApp} from 'vue'
import App from './app.vue'
import i18n from '@/base/i18n'

// Create a new Vue instance and mount the App component to the #root element
const app = createApp(App)

app.use(i18n)
app.mount('#root')