import { onBeforeMount, reactive, ref } from 'vue'

export default function usePage<T>(pageApi: any, pageName: string) {
  const pageData = ref<T[]>([])
  const pagination = reactive({
    current: 1,
    size: 10
  })
  const total = ref(0)
  const getPage = async (searchParams = {}) => {
    const pageParams = Object.assign(pagination, searchParams)
    const data = await pageApi.getPage(pageParams)
    pageData.value = data.records
    total.value = data.total
  }
  // 初始化
  onBeforeMount(() => {
    getPage()
  })
  const itemId = ref('')
  const dialogVisible = ref(false)
  // 添加修改列表元素
  const editForm = (id = '') => {
    itemId.value = id
    dialogVisible.value = true
  }
  const handleDelete = async (id) => {
    try {
      await pageApi.deleteItem(id)
      ElMessage.success(`删除${pageName}成功`)
      getPage()
    } catch (error: any) {
      if (!(error instanceof Error)) {
        ElMessage.error(`删除${pageName}失败，失败原因${error.msg}`)
      } else console.error(error)
    }
  }
  return { pageData, pagination, getPage, total, dialogVisible, itemId, handleDelete, editForm }
}
