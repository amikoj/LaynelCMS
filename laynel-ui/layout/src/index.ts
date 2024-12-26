import CommonLayout  from './common.vue'


interface Layouts {
    [key: string]: typeof CommonLayout
}


const common =  CommonLayout

const layouts: Layouts = {
    common,
}


export default layouts