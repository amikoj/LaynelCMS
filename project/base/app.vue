<script setup lang="ts">
import { useAppStore } from './store/app';
import { onMounted } from 'vue';
import layouts  from './layout'




const CommonLaout = layouts.common

const { ctx, layout } = useAppStore()
const Layout = layouts[layout] || CommonLaout

/**
 * 动态加载当前模块的入口文件 
 */
 const loadEntry = () => {
  const entryJs = ctx.entry
  if (entryJs) {
    import(entryJs).then(res => {
      console.log('entryJs is loaded successfully:', res)
    }).catch(err => {
      console.error('entryJs load failed:', err)
    })
  }else {
    console.error('entryJs is not found in appStore')
  }
}

onMounted(() => {
  loadEntry()
})
</script>

<template>
  <el-config-provider>
     <Layout >
        <div id="app"></div>
     </Layout>
  </el-config-provider>
</template>