<script setup lang="ts">
import Aside from '@/base/components/aside/aside.vue'
import Header from '@/base/components/header/header.vue'
import { useAppStore } from '@/base/store/app'
import { onMounted } from 'vue';
/**
 * 动态加载当前模块的入口文件 
 */
const loadEntry = () => {
  const { ctx } = useAppStore()
  const entryJs = ctx.entryJs
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
<div class="common-layout">
    <el-container>
        <Header />
      <el-container>
         <Aside />
        <el-main>
            <div id="app"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style lang="less" scoped>

</style>