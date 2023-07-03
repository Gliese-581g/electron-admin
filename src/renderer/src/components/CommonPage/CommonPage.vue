<template>
  <div v-loading="!itemPage.length" class="page-box">
    <slot name="searchForm"></slot>
    <div class="page-header">
      <slot name="pageHeader"></slot>
    </div>

    <slot name="editForm"></slot>

    <slot name="pageTable" :page="itemPage"></slot>
    <el-pagination
      v-model:current-page="pagination.current"
      v-model:page-size="pagination.size"
      :page-sizes="[8, 10, 12]"
      layout="->,total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 20px"
      @size-change="getPage()"
      @current-change="getPage()"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'

const props = defineProps<{
  getPage: (pageParam: any) => Promise<any>
}>()
const itemPage = ref<any[]>([])
const pagination = reactive({
  current: 1,
  size: 10
})
const total = ref(0)
const getPage = async () => {
  const data = await props.getPage(pagination)
  itemPage.value = data.records
  total.value = data.total
}
const itemId = ref('')
const dialogVisible = ref(false)
// 添加修改列表元素
const editForm = (id = '') => {
  itemId.value = id
  dialogVisible.value = true
}
// 初始化
onBeforeMount(() => {
  getPage()
})
//暴露方法
defineExpose({
  getPage,
  editForm
})
</script>

<style lang="scss" scoped>
.page-box {
  // margin: 40px;
  .page-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
