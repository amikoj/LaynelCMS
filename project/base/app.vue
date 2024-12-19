<script setup lang="ts">
import  { ElButton } from 'element-plus'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-button.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Layout from './components/layout.vue'

const handleClick = () => {
    // 按钮点击事将  
  console.log('测试按钮点击事件') 
}
</script>

<template>
  <el-config-provider :locale="zhCn">
     <Layout />
  </el-config-provider>
</template>