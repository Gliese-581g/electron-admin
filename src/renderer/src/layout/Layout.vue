<template>
  <el-container>
    <el-aside>
      <SideBar class="side-bar" />
    </el-aside>
    <el-container>
      <el-header><NavigationBar class="navigation-bar" /></el-header>
      <el-main><DashBoard class="dashboard" /></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import SideBar from './components/SideBar/SideBar.vue'
// import MenuBar from './components/MenuBar/MenuBar.vue'
import NavigationBar from './components/NavigationBar/NavigationBar.vue'
// import TagView from './components/TagView/TagView.vue'
import DashBoard from './components/DashBoard/DashBoard.vue'

import { useUserStore } from '@store/user'
import { onBeforeMount } from 'vue'

onBeforeMount(async () => {
  // 请求用户信息，保存用户信息
  const userStore = useUserStore()
  await userStore.geUserInfo()
})
</script>

<style lang="scss" scoped></style>
