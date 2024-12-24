<script setup lang="ts">
import Aside from '@/base/components/aside/aside.vue'
import Header from '@/base/components/header/header.vue'
import { useAppStore } from '@/base/store/app'

const { ctx } = useAppStore()


</script>

<template>
<div class="common-layout">
    <el-container>
        <Header />
      <el-container>
         <Aside />
        <el-main>

            <div ></div>
            <div id="app"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style lang="less" scoped>

</style>