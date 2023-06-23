<template>
  <el-dialog v-model="visible" width="400px">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <span :id="titleId" :class="titleClass">切换角色</span>
      </div>
    </template>
    <div class="role-box">
      <el-avatar :src="userInfo.avatar"></el-avatar>
      <span>您当前的身份</span>
      <span class="role-name">{{ role.roleName }}</span>
      <el-dropdown v-if="roles.length > 1" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          修改<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in roles"
              :key="item.id"
              :command="item.id"
              :disabled="item.id === role.id"
              >{{ item.roleName }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@store/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const { userInfo, roles, role } = storeToRefs(userStore)

const props = defineProps<{
  dialogVisible: boolean
}>()
const emit = defineEmits(['update:dialogVisible', 'getUserList'])

const visible = computed({
  get() {
    return props.dialogVisible
  },
  set(value) {
    emit('update:dialogVisible', value)
  }
})
const router = useRouter()
const handleCommand = (command) => {
  userStore.changeRole(command)
  router.push('/').then(() => {
    location.reload()
  })
}
</script>

<style lang="scss" scoped>
.my-header {
  p {
    font-weight: bold;
  }
}
.role-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > * {
    margin-bottom: 10px;
  }
  .el-avatar {
    width: 100px;
    height: 100px;
  }
  .role-name {
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>
