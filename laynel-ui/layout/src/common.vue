<script setup lang="ts">
import { LaynelAside, LaynelHeader } from "@laynel-ui/components";
import { useAppStore } from '@laynel-ui/store';
import { toRefs } from "vue";


const appStore = useAppStore();
const { isCollapse } = toRefs(appStore);



</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside class="p-0 h-full"  :width="isCollapse ? 64 : 200">
                <LaynelAside />
            </el-aside>

            <el-container>
                <el-header>
                    <LaynelHeader />
                </el-header>
                <el-main>
                    <slot />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="scss">
.common-layout {
    .el-header {
        padding: 0;
    }
}
</style>
