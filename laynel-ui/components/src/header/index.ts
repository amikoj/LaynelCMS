import Header from './header.vue'
import { withInstall } from '@laynel-ui/utils'
import toolKit from './toolkit.vue'


export const LaynelHeader = withInstall(Header, 'LaynelHeader')
export const LaynelToolkit = withInstall(toolKit, 'LaynelToolkit')

export default LaynelHeader