<template>
  <el-dialog v-model="dialogVisible" width="30%">
    <span>您确定退出此程序？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="closeApp"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  visible: boolean
}>()
const emit = defineEmits(['update:visible'])

const dialogVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  }
})
function closeApp() {
  window.electron.ipcRenderer.send('renderer-close-app')
}
</script>

<style lang="scss" scoped></style>
