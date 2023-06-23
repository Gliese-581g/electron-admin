<template>
  <el-form-item label="菜单权限">
    <el-checkbox v-model="treeControl.extend" @change="toggleInteractive">展开/折叠</el-checkbox>
    <el-checkbox v-model="treeControl.selectAll" @change="toggleSelectAll">全选/全不选</el-checkbox>
    <el-checkbox v-model="treeControl.interactive">父子联动/不联动</el-checkbox>
    <el-scrollbar height="100px" style="width: 500px">
      <el-tree
        ref="treeRef"
        :data="menuTree"
        :props="defaultProps"
        node-key="id"
        show-checkbox
        accordion
        :default-expand-all="treeControl.extend"
        :check-strictly="!treeControl.interactive"
      />
    </el-scrollbar>
  </el-form-item>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'
import { getMenuTree } from '@api/role'

const treeControl = reactive({
  extend: false,
  selectAll: false,
  interactive: true
})
const defaultProps = {
  id: 'id',
  label: 'name',
  children: 'children'
}

const menuTree = ref([])
onBeforeMount(async () => {
  const { code, msg, data } = await getMenuTree()
  if (code === '200') {
    menuTree.value = data
  } else console.log(msg)
})
const treeRef = ref()

function toggleSelectAll(value) {
  const nodesMap = treeRef.value.store.nodesMap
  Object.keys(nodesMap).forEach((key) => (nodesMap[key].checked = value))
}
function toggleInteractive(value) {
  const nodesMap = treeRef.value.store.nodesMap
  Object.keys(nodesMap).forEach((key) => (nodesMap[key].expanded = value))
}
const getCheckedKeys = () => {
  return treeRef.value!.getCheckedKeys(false)
}

const setCheckedKeys = (permissions) => {
  treeRef.value!.setCheckedKeys(permissions)
}

defineExpose({
  getCheckedKeys,
  setCheckedKeys
})
</script>

<style lang="scss" scoped></style>
