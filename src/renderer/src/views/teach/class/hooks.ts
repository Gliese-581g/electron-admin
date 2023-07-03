import { reactive, ref } from 'vue'
import { getUnitTree } from '@api/teach/class'
import { getPage } from '@api/system/user'

export default function useSelectData() {
  const treeData = ref()

  async function setTreeData() {
    const data = await getUnitTree()
    treeData.value = data
  }

  const tableData = ref([])
  const userParams = reactive({
    current: '1',
    size: '100',
    unitId: '',
    username: ''
  })

  const setTableData = async () => {
    const data = await getPage(userParams)
    tableData.value = data.records
  }
  return { treeData, setTreeData, tableData, setTableData, userParams }
}
