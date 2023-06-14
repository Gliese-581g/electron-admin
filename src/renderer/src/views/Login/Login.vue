<template>
  <div class="flex-box">
    <el-row class="system-control">
      <el-button circle>
        <el-icon><i-ep-moon /></el-icon>
      </el-button>
      <el-button circle>
        <el-icon><i-ep-moon /></el-icon>
      </el-button>
    </el-row>
    <div class="left-banner"></div>
    <div class="login-box">
      <h1 class="title">登录</h1>
      <el-tabs v-model="activeName" class="login-tabs">
        <el-tab-pane label="账号登录" name="user">
          <PasswordForm />
        </el-tab-pane>
        <el-tab-pane label="手机号登录" name="phone">phone</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import PasswordForm from './PasswordForm.vue'
import { ref } from 'vue'
const activeName = ref<'user' | 'phone'>('user')
</script>
<style lang="scss" scoped>
.flex-box {
  display: flex;
  justify-content: center;
  width: 100vw;
  position: relative;
  // align-items: center;
  height: 100vh;
  .system-control {
    -webkit-app-region: no-drag;

    position: absolute;
    top: 15px;
    right: 15px;
  }
  .left-banner {
    flex: 1;
    height: 100vh;
    background-color: #f2f3f5;
    background-image: url(login-banner.png);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .login-box {
    flex: 1;
    display: flex;
    padding-top: 90px;
    align-items: center;
    flex-direction: column;
    & > * {
      -webkit-app-region: no-drag;
    }

    .title {
      text-align: center;
    }
  }
}
</style>
