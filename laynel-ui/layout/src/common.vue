<script setup lang="ts">
import {Aside, Header} from '@laynel-ui/components'

</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <Aside />
                </el-aside>
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
        padding:0;
    }


}
</style>