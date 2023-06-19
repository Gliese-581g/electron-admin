<template>
  <el-dialog v-model="visible" width="30%" class="dialog-box">
    <span>您确定退出此程序？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="closeApp"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  dialogVisible: boolean
}>()
const emit = defineEmits(['update:dialogVisible'])

const visible = computed({
  get() {
    return props.dialogVisible
  },
  set(value) {
    emit('update:dialogVisible', value)
  }
})
function closeApp() {
  window.electron.ipcRenderer.send('renderer-close-app')
}
</script>

<style lang="scss">
.dialog-box * {
  -webkit-app-region: no-drag;
}
</style>
