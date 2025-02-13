<script setup lang="ts">
import { Aside, Header } from '@laynel-ui/components'
import { useAppStore } from '@laynel-ui/store'
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
      <Aside />
      <el-container>
        <Header />
        <el-main>
            <div id="app"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style lang="less" scoped>

</style>