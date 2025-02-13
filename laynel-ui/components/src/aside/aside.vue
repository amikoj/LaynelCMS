<script setup lang="ts">
import { useAside } from './aside'
import { Icon } from '@iconify/vue';
import { Expand } from '@element-plus/icons-vue'

const  {
    menus,
    primaryColor,
    isCollapse, 
    toggleCollapse,
} = useAside()

</script>

<template>
    <div class="aside-container flex flex-col relative">
        <el-menu  
          class="text-white text-14px flex-1" 
          :collapse="isCollapse" 
          @open="toggleCollapse"
          @close="toggleCollapse">

          <!--  logo -->
          <div class="logo text-black text-24px px-15px py-10px flex items-center justify-center">
            <div>Laynel</div>
         </div>
            <template v-for="(item, index) in menus">
                <el-menu-item v-if="!item.children" :index="index + ''">
                   <Icon v-if="item.icon" :icon="item.icon" width="24" height="24" class="mr-5px" />

                   <<router-link to="{{ item.url }}">
                    <span slot="title"> {{ item.title }}</span>
                   </router-link>
                
               </el-menu-item>


               <el-sub-menu v-else-if="item.children && item.children.length > 0" :index="index + '-sub'">
                <template #title>
                    <Icon v-if="item.icon" :icon="item.icon" width="24" height="24" class="mr-5px" />
                    <span>{{ item.title }}</span>
                </template>

                <el-menu-item v-for="(child, index) in item.children" :index="index + '-' + index">
                    <Icon v-if="child.icon" :icon="child.icon" width="24" height="24" class="mr-5px" />
                    <<router-link to="{{ child.url }}">
                    <span slot="title"> {{ child.title }}</span>
                   </router-link>
                </el-menu-item>

                </el-sub-menu>
            </template>
        </el-menu>


        <!--  toggle collapse button -->
          <div class="toggle-collapse-btn absolute bottom-10px right-10px z-10 cursor-pointer" @click="toggleCollapse">
            <el-icon>
               <Expand  class="text-24px"/>
            </el-icon>
         </div>
    </div>
</template>

<style lang="scss" scoped>
.aside-container {
    height: 100vh;
}
</style>