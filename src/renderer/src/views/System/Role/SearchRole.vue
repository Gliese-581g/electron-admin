<template>
  <el-form ref="searchFormRef" class="search-form" :model="searchForm" inline>
    <el-form-item label="角色名称" prop="roleName">
      <el-input v-model="searchForm.roleName" clearable />
    </el-form-item>
    <el-form-item label="权限编码" prop="rolePerm">
      <el-input v-model="searchForm.rolePerm" clearable />
    </el-form-item>
    <el-form-item label="状态" prop="enabled">
      <el-select v-model="searchForm.enabled" placeholder="请选择启动状态">
        <el-option label="启用" :value="1" />
        <el-option label="停用" :value="0" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="emit('getList', searchForm)"> 搜索 </el-button>
      <el-button @click="resetForm(searchFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
const emit = defineEmits(['getList'])
const searchFormRef = ref()
const searchForm = reactive<{
  roleName: string
  rolePerm: string
  enabled: string | number
}>({
  roleName: '',
  rolePerm: '',
  enabled: ''
})

function resetForm(formEl) {
  if (!formEl) return
  formEl.resetFields()
  emit('getList')
}
</script>

<style lang="scss" scoped></style>

// 本地筛选
