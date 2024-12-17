<script setup lang="ts">
import  { ElButton } from 'element-plus'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-button.css'

const handleClick = () => {
      alert('Button clicked!')   // 点击按钮弹出提示框
    }
</script>

<template>
    <div>
        <el-button @click="handleClick">12点击我</el-button>
    </div>
</template>