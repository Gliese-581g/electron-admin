<template>
  <ul class="user-bar">
    <li>
      <el-dropdown trigger="click">
        <span v-if="userStore.userInfo" class="el-dropdown-link">
          <el-avatar :src="userStore.userInfo.avatar" />
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="dialogVisible = true">切换角色</el-dropdown-item>
            <el-dropdown-item @click="signOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </li>
    <li @click="drawer = true">
      <el-icon><icon-parko-message /></el-icon>
      <el-drawer v-model="drawer" title="消息">
        <span>Hi there!</span>
      </el-drawer>
    </li>
    <li>
      <el-icon><icon-parko-search /></el-icon>
    </li>
    <li>
      <el-icon><icon-parko-minus /></el-icon>
    </li>
    <li @click="fullScreen">
      <el-icon><icon-parko-full-screen /></el-icon>
    </li>
  </ul>
  <ChangeRole v-model:dialog-visible="dialogVisible" />
</template>

<script setup lang="ts">
import { useUserStore } from '@store/user'
import { useAuthStore } from '@store/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ChangeRole from './ChangeRole.vue'

const userStore = useUserStore()
const authStore = useAuthStore()

const router = useRouter()
const signOut = () => {
  authStore.$reset()
  userStore.$reset()
  router.push('/login')
}

const drawer = ref(false)
// TODO 全屏api
const fullScreen = () => {
  document.exitFullscreen()
}

const dialogVisible = ref(false)
</script>

<style lang="scss" scoped>
.user-bar {
  margin-left: auto;
  display: flex;
  height: 100%;
  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      background-color: rgb(214, 214, 214);
    }
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
