<template>
  <div class="layout">
    <SideBar class="side-bar" />
    <!-- <MenuBar class="menu-bar" /> -->
    <div class="right-bar">
      <NavigationBar class="navigation-bar" />
      <TagView class="tag-view" />
      <DashBoard class="dashboard" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from './components/SideBar/SideBar.vue'
// import MenuBar from './components/MenuBar/MenuBar.vue'
import NavigationBar from './components/NavigationBar/NavigationBar.vue'
import TagView from './components/TagView/TagView.vue'
import DashBoard from './components/DashBoard/DashBoard.vue'

import { useUserStore } from '@store/user'
import { onBeforeMount } from 'vue'

onBeforeMount(async () => {
  // 请求用户信息，保存用户信息
  const userStore = useUserStore()
  await userStore.geUserInfo()
})
</script>

<style lang="scss" scoped>
.layout {
  // position: relative;
  display: flex;
  height: 100vh;
}
.side-bar {
  width: 250px;
  color: #fff;
}
.menu-bar {
  width: 200px;
}
.right-bar {
  flex: 1;
  // position: relative;
  .navigation-bar {
    // position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: antiquewhite;
  }
  .tag-view {
    width: 100%;
    height: 50px;
    background-color: aquamarine;
  }
  .dashboard {
    width: 100%;
    background-color: #f0f2f5;
  }
}
</style>
