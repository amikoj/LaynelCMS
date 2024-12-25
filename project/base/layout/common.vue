<script setup lang="ts">
import Aside from '@/base/components/aside/aside.vue'
import Header from '@/base/components/header/header.vue'

</script>

<template>
    <el-container>
        common Layout
        <Header />
      <el-container>
         <Aside />
        <el-main>
            <div id="app"></div>
        </el-main>
      </el-container>
    </el-container>
</template>