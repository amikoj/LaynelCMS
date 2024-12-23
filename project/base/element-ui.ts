import {
  ElButton,
  ElRow,
  ElCol,
  ElCollapse,
  ElAside,
  ElMenu,
  ElMenuItem,
  ElContainer,
  ElHeader,
  ElMain,
  ElFooter,
  ElConfigProvider,
} from 'element-plus'
import type { App } from 'vue'


export function install_components(app: App) {
  app
    .use(ElButton)
    .use(ElRow)
    .use(ElCol)
    .use(ElCollapse)
    .use(ElAside)
    .use(ElMenu)
    .use(ElMenuItem)
    .use(ElContainer)
    .use(ElHeader)
    .use(ElMain)
    .use(ElFooter)
}