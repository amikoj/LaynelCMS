<script setup lang="ts">
import  { ElButton } from 'element-plus'


const handleClick = () => {
      alert('Button clicked!')
    }
</script>

<template>
    <div>
        <el-button @click="handleClick">Click Me</el-button>
    </div>
</template>