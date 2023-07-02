<template>
  <el-form ref="searchFormRef" class="search-form" :model="searchForm" inline>
    <el-form-item label="字典名称" prop="dictType">
      <el-select v-model="searchForm.dictType" placeholder="请选择字典名称">
        <el-option v-for="item in dictTypes" :key="item.id" :label="item.name" :value="item.type" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-form-item label="字典键" prop="key">
        <el-input v-model="searchForm.key" clearable />
      </el-form-item>
      <el-form-item label="字典值" prop="value">
        <el-input v-model="searchForm.key" clearable />
      </el-form-item>
      <el-button type="primary" @click="emit('getPage', searchForm)"> 搜索 </el-button>
      <el-button @click="resetForm(searchFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'
import * as dictTypeApi from '@api/system/dictType'
import { useRoute } from 'vue-router'
const route = useRoute()

const emit = defineEmits(['getPage'])
const searchFormRef = ref()
const searchForm = reactive<{
  dictType: string // 字典类型type
  key: string // 键
  value: string // 值
}>({
  dictType: '',
  key: '',
  value: ''
})
const dictTypes = ref<dictTypeApi.DictType[]>([])
onBeforeMount(async () => {
  const data = await dictTypeApi.getPage({
    current: 1,
    size: 100
  })
  dictTypes.value = data.records
  if (route.query?.dictType) {
    searchForm.dictType = route.query.dictType as string
    emit('getPage', searchForm)
  }
})

function resetForm(formEl) {
  if (!formEl) return
  formEl.resetFields()
  emit('getPage', searchForm)
}
</script>

<style lang="scss" scoped></style>
