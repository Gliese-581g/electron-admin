<template>
  <div>
    <div class="operate-bar">
      <el-button type="primary" :icon="Plus" @click="editForm()">新建科目</el-button>
      <el-button :icon="Printer">导出</el-button>
    </div>
    <!-- 用户表单 -->
    <SubjectForm :id="subjectId" v-model:dialogVisible="dialogVisible" @get-page="getPage" />
    <el-table :data="subjectPage" border stripe style="width: 100%">
      <el-table-column type="index" min-width="100" align="center" />
      <el-table-column prop="subjectName" label="科目名称" min-width="120" align="center" />
      <el-table-column prop="amount" label="售价(元)" width="120" align="center" />
      <el-table-column prop="enabled" label="科目状态" width="120" align="center" />
      <el-table-column label="协议" min-width="120" align="center">
        <template #default>
          <el-button link type="primary" size="small" :icon="Document">查看协议</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" min-width="200" align="center">
        <template #default="{ row }">
          <el-button link type="primary" size="small" :icon="Edit" @click="editForm(row.id)">
            编辑科目</el-button
          >
          <el-popconfirm title="确定删除?" @confirm="handleDelete(row.id)">
            <template #reference>
              <el-button link size="small" type="danger" :icon="Delete">删除科目</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pagination.current"
      v-model:page-size="pagination.size"
      :page-sizes="[6, 8, 10]"
      layout="->,total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 20px"
      @size-change="handlePageChange"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'
import * as subjectApi from '@api/teach/subject'
import SubjectForm from './SubjectForm.vue'

import { Delete, Edit, Document, Plus, Printer } from '@element-plus/icons-vue'

const subjectPage = ref<subjectApi.SubjectVO[]>([])
const total = ref(0)
const pagination = reactive({
  current: 1,
  size: 8
})

const getPage = async () => {
  const data = await subjectApi.getSubjectPage(pagination)
  subjectPage.value = data.records
  total.value = data.total
}
const subjectId = ref('')
const dialogVisible = ref(false)
const handlePageChange = () => {
  getPage()
}
const editForm = (id = '') => {
  subjectId.value = id
  dialogVisible.value = true
}
const handleDelete = async (id) => {
  try {
    await subjectApi.deleteSubject(id)
    ElMessage.success('删除科目成功')
    getPage()
  } catch (error: any) {
    if (!(error instanceof Error)) {
      ElMessage.error(`删除科目失败，失败原因${error.msg}`)
    } else console.error(error)
  }
}
// 初始化
onBeforeMount(() => {
  getPage()
})
</script>

<style lang="scss" scoped>
.operate-bar {
  margin-bottom: 15px;
}
</style>
