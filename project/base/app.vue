<script setup lang="ts">
import  { ElButton } from 'element-plus'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-button.css'

const handleClick = () => {
    // 按钮点击事  
    
  console.log('测试按钮点击事件') 
}

</script>

<template>
    <div>
        <el-button @click="handleClick">按钮</el-button>
    </div>
</template>