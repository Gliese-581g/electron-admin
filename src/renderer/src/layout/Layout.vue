<template>
  <el-container style="height: 100vh">
    <el-aside>
      <SideBar class="side-bar" />
    </el-aside>
    <el-container>
      <el-header height="90px"><TopBar class="top-bar" /></el-header>
      <el-scrollbar wrap-style="background-color: #f0f2f5">
        <el-main>
          <DashBoard class="dashboard" />
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import SideBar from './components/SideBar/SideBar.vue'
import TopBar from './components/TopBar/TopBar.vue'
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
