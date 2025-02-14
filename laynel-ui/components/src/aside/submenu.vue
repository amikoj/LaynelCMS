<script setup lang="ts">
import {  PropType } from 'vue';
import { MenuItemProps, useAside } from './aside';
import { Icon } from "@iconify/vue";

defineProps({
    item: {
        type: Object as PropType<MenuItemProps>,
        required: true
    },
    index: {
        type: String,
        required: true
    }
})

const {jumpTo} = useAside()


</script>

<template>
    <el-sub-menu  :index="item.name">
        <template #title>
            <Icon v-if="item.icon" :icon="item.icon" width="16" height="16" class="mr-12px text-gray-500" />
            <span>{{ item.title }}</span>
        </template>

        <template v-for="(child, idx) in item.children">
            <el-menu-item v-if="!child.children" :index="child.name" @click="jumpTo(child)">
                <Icon v-if="child.icon" :icon="child.icon"width="16" height="16" class="mr-12px text-gray-500" />
                <span>{{ child.title }}</span>
            </el-menu-item>
            <submenu v-else-if="child.children && child.children.length > 0" :item="child" :index="index + '-' + idx"></submenu>
        </template>
    </el-sub-menu>
</template>