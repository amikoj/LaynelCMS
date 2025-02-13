<script setup lang="ts">
import { useAside } from "./aside";
import { Icon } from "@iconify/vue";
import { Expand } from "@element-plus/icons-vue";
import submenu from "./submenu.vue";

const { menus, isCollapse, toggleCollapse, jumpTo } = useAside();
</script>

<template>
    <div class="aside-container flex flex-col relative" >
        <el-menu class="text-white text-14px flex-1 overflow-y-auto" :collapse="isCollapse">
            <!--  logo -->
            <div  class="logo text-black text-24px px-15px py-10px flex items-center justify-center">
                <div v-if="!isCollapse">Laynel CMS</div>
            </div>
            <template v-for="(item, index) in menus">
                <el-menu-item v-if="!item.children" :index="index + ''" @click="jumpTo(item)">
                    <Icon v-if="item.icon" :icon="item.icon" width="24" height="24" class="mr-5px" />
                    <span  >{{ item.title }}</span>
                </el-menu-item>

                <template v-else-if="item.children && item.children.length > 0">
                    <submenu :item="item" :index="index + '-sub'"></submenu>
                </template>
            </template>
        </el-menu>

        <!--  toggle collapse button -->
        <div class="toggle-collapse-btn absolute bottom-10px right-17px z-10 cursor-pointer" @click="toggleCollapse">
            <el-button circle :icon="Expand"  />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.aside-container {
    height: 100vh;
    overflow: hidden;
    a {
        text-decoration: none;
        color: inherit;
        cursor: auto;
    }
}
</style>
