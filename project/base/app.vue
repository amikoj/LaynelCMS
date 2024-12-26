<script setup lang="ts">
import { useAppStore } from '@laynel-ui/store';
import { onMounted, defineAsyncComponent } from 'vue';
import {Layouts, LaynelCommonLayout}  from '@laynel-ui/layout'

const { ctx, layout } = useAppStore()
const Layout = Layouts[`laynle-${layout}`] || LaynelCommonLayout

const Page = defineAsyncComponent(() => import(ctx.entry))




/**
 * 动态加载当前模块的入口文件 
 */
 const loadEntry = () => {
  const entryJs = ctx.entry
  if (entryJs) {
    import(entryJs).then(res => {
      console.log('entryJs is loaded successfully:', res)
      Page.value =   res
    }).catch(err => {
      console.error('entryJs load failed:', err)
    })
  }else {
    console.error('entryJs is not found in appStore')
  }
}

onMounted(() => {
  // loadEntry()
})
</script>

<template>
  <el-config-provider>
     <Layout >
        <!-- <div id="app"></div> -->

        <Page />
    
     </Layout>
  </el-config-provider>
</template>