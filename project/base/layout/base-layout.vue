<script setup lang="ts">
import Aside from '@/base/components/aside.vue'

const {  } = useAppStore()


</script>

<template>
<div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>


            <el-button>按钮</el-button>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style lang="less" scoped>

</style>