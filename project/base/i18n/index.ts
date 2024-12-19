import { createI18n  } from 'vue-i18n'
import zhCn from './zh-cn.json'
import enUS from './en-US.json'


const messages = {
  'zh-cn': zhCn,
  'en-US': enUS
}

const i18n = createI18n({
  locale: 'zh-cn',
  messages,
  fallbackLocale: 'en-US'
})

export default i18n