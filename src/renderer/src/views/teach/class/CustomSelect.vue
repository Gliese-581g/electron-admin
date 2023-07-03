<template>
  <el-select ref="selectRef" v-model="selectedLabel" class="m-2" placeholder="请选择">
    <template #empty>
      <div class="empty">
        <el-form inline>
          <el-form-item>
            <el-input v-model="userParams.username" placeholder="请输入用户名称" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="setTableData()"> 搜索 </el-button>
          </el-form-item>
        </el-form>
        <div class="option-wrapper">
          <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" />
          <el-scrollbar max-height="200px">
            <el-table :data="tableData" @current-change="handleCurrentChange">
              <el-table-column prop="username" label="用户名称" min-width="100px" />
              <el-table-column prop="realName" label="真实姓名" min-width="150px" />
            </el-table>
          </el-scrollbar>
        </div>
      </div>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import useSelectData from './hooks'

const props = defineProps<{
  id: string
}>()
const emit = defineEmits(['update:id'])

const selectedId = computed({
  get() {
    return props.id
  },
  set(newVal) {
    console.log(newVal)
    emit('update:id', newVal)
  }
})
const selectedLabel = ref('')
// children 指定子树为节点对象的某个属性值
// label 指定节点标签为节点对象的某个属性值
const defaultProps = {
  children: 'children',
  label: 'name'
}
// 设置和获取选项的方法
const { treeData, setTreeData, tableData, setTableData, userParams } = useSelectData()
onBeforeMount(async () => {
  setTreeData()
  setTableData()
})
// 筛选表单
const handleNodeClick = (data) => {
  userParams.unitId = data.id
  setTableData()
}
const selectRef = ref()
// table的单选事件，触发select blur
const handleCurrentChange = (user) => {
  if (user) {
    console.log('user', user)
    selectedId.value = user.id
    selectedLabel.value = user.realName
    selectRef.value.blur()
  }
}
</script>

<style lang="scss" scoped>
.empty {
  padding: 15px;
  width: 600px;
  .option-wrapper {
    display: flex;
    justify-content: space-between;
  }
}
</style>
