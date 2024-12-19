import { ElButton, ElRow, ElCol, ElCollapse, ElAside, ElMenu, ElMenuItem } from 'element-plus'
import type { App } from 'vue'



export function install(app: App) {
  app.use(ElButton).use(ElRow).use(ElCol).use(ElCollapse).use(ElAside).use(ElMenu).use(ElMenuItem)
}