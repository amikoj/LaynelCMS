<script setup lang="ts">
import { useAppStore } from '@laynel-ui/store';
import { onMounted, ref } from 'vue';
import {Layouts, LaynelCommonLayout}  from '@laynel-ui/layout'

const { ctx, layout } = useAppStore()
const Layout = Layouts[`laynle-${layout}`] || LaynelCommonLayout

const Page = ref<any>()

/**
 * 动态加载当前模块的入口文件 
 */
 const loadEntry = () => {
  const entryJs = ctx.entry
  if (entryJs) {
    import(entryJs).then(res => {
      console.log('entryJs is loaded successfully:', res)
      Page.value =   res.Dashboard
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
        <!-- <div id="app"></div> -->
         <template v-if="Page">

           <Page />
         </template>

         <template v-else>

           <div class="loading" v-loading="true">
             页面正在加载中...
           </div>
         </template>
    
     </Layout>
  </el-config-provider>
</template>