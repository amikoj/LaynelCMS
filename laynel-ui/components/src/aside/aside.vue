<script setup lang="ts">
import { useAppStore } from '@laynel-ui/store';
import { Icon } from '@iconify/vue';

const { primaryColor } = useAppStore()

</script>

<template>
    <div class="aside-container flex flex-col">
        <div class="logo">
            <h1>Laynel CMS Aside</h1>
        </div>

        <el-menu :style="{ backgroundColor: primaryColor }" class="text-white text-14px">
            <el-menu-item index="1">
                <Icon icon="material-symbols:home" width="24" height="24" />
                <span slot="title">Dashboard</span>
            </el-menu-item>

            <el-sub-menu index="2">
                <template #title>
                    <i class="el-icon-setting"></i>
                    <span>Settings</span>
                </template>
                <el-menu-item index="2-1">Option 1</el-menu-item>
                <el-menu-item index="2-2">Option 2</el-menu-item>
                <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<style lang="scss" scoped>
.aside-container {
    height: 100%;
}
</style>