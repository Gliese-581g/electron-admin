<template>
  <div class="flex-box">
    <el-row class="system-control">
      <el-icon @click="toggleDarkMode">
        <icon-parko-sun-one v-if="isDark" />
        <icon-parko-moon v-else />
      </el-icon>
      <el-icon>
        <icon-parko-translate />
      </el-icon>
      <el-icon @click="dialogVisible = true">
        <icon-parko-close />
      </el-icon>
    </el-row>
    <CloseDialog v-model:dialogVisible="dialogVisible" />
    <div class="left-banner" :class="{ darkMode: isDark }"></div>
    <div class="right-banner">
      <div class="login-box">
        <h1 class="title">登录</h1>
        <el-tabs v-model="activeName" class="login-tabs">
          <el-tab-pane label="账号登录" name="user">
            <PasswordForm />
          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="phone">
            <PhoneForm />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PasswordForm from './PasswordForm.vue'
import PhoneForm from './PhoneForm.vue'
import CloseDialog from '@components/CloseDialog.vue'
import { ref } from 'vue'
const activeName = ref<'user' | 'phone'>('user')
const dialogVisible = ref(false)
function toggleDarkMode() {
  toggleDark()
}

import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
isDark.value = false
const toggleDark = useToggle(isDark)
</script>
<style lang="scss">
.login-box > * {
  -webkit-app-region: no-drag;
}
</style>
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
    right: 20px;
    .el-icon {
      margin-left: 20px;
      cursor: pointer;
    }
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
  @media screen and (max-width: 700px) {
    .left-banner {
      display: none;
    }
  }
  .darkMode {
    background-color: #242526;
  }

  .right-banner {
    flex: 1;
    display: flex;
    // align-items: center;
    // flex-direction: column;
    justify-content: center;
    .login-box {
      width: 500px;
      padding: 80px 60px 30px;
      .title {
        text-align: center;
      }
    }
  }
}
</style>
