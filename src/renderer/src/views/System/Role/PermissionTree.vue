<template>
  <el-form-item label="菜单权限">
    <el-checkbox v-model="treeControl.extend" @change="toggleExtend">展开/折叠</el-checkbox>
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
import * as roleApi from '@api/system/role'

const treeControl = reactive({
  extend: false,
  selectAll: false,
  interactive: true //父子联动
})
const defaultProps = {
  id: 'id',
  label: 'name',
  children: 'children'
}

const menuTree = ref([])
onBeforeMount(async () => {
  const data = await roleApi.getMenuTree()
  menuTree.value = data
})
const treeRef = ref()

// 全选
function toggleSelectAll(value) {
  const nodesMap = treeRef.value.store.nodesMap
  Object.keys(nodesMap).forEach((key) => (nodesMap[key].checked = value))
}
// 展开与折叠
function toggleExtend(value) {
  const nodesMap = treeRef.value.store.nodesMap
  Object.keys(nodesMap).forEach((key) => (nodesMap[key].expanded = value))
}
// 若节点可用被选中 (show-checkbox 为 true), 它将返回当前选中节点 key 的数组
const getCheckedKeys = () => {
  return treeRef.value!.getCheckedKeys(false)
}
// 设置目前选中的节点，使用此方法必须设置 node-key 属性
// 参数permissions 一个需要被选中的多节点 key 的数组
const setCheckedKeys = (permissions: string[]) => {
  treeRef.value!.setCheckedKeys(permissions)
}

defineExpose({
  getCheckedKeys,
  setCheckedKeys
})
</script>

<style lang="scss" scoped></style>
