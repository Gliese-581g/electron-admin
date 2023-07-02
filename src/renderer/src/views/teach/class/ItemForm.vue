<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="title + props.pageName"
    @close="handleClose"
    @open="handleOpen"
  >
    <el-scrollbar height="300px">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="100px" class="itemForm">
        <el-form-item label="班级名称" prop="className">
          <el-input v-model="form.className" autocomplete="off" />
        </el-form-item>
        <el-form-item label="授课方式" prop="teachingMethod">
          <el-input v-model="form.teachingMethod" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选择科目" prop="subjectId">
          <el-select v-model="form.subjectId" class="m-2" placeholder="请选择科目">
            <el-option
              v-for="item in allSubject"
              :key="item.id"
              :label="item.subjectName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="满课人数" prop="fullPeople">
          <el-input v-model="form.fullPeople" autocomplete="off" />
        </el-form-item>
        <el-form-item label="开班时间" prop="beginDate">
          <el-date-picker
            v-model="form.beginDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开班日期"
            end-placeholder="结业日期"
          />
        </el-form-item>
        <el-form-item label="主讲老师" prop="mainTeacherId">
          <el-input v-model="form.mainTeacherId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="助教老师" prop="assistTeacherId">
          <el-input v-model="form.assistTeacherId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学管老师" prop="manageTeacherId">
          <el-input v-model="form.manageTeacherId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="授课课时" prop="manageTeacherId">
          <el-checkbox-group v-model="teachingDay">
            <el-checkbox-button label="1">星期一</el-checkbox-button>
            <el-checkbox-button label="2">星期二</el-checkbox-button>
            <el-checkbox-button label="3">星期三</el-checkbox-button>
            <el-checkbox-button label="4">星期四</el-checkbox-button>
            <el-checkbox-button label="5">星期五</el-checkbox-button>
            <el-checkbox-button label="6">星期六</el-checkbox-button>
            <el-checkbox-button label="7">星期天</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="选择时间段" prop="beginDate">
          <el-date-picker
            v-model="form.teachingTime"
            type="daterange"
            range-separator="至"
            start-placeholder="选择开始时间"
            end-placeholder="选择结束时间"
          />
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref } from 'vue'
import * as pageApi from '@api/teach/class'
import useItemForm from '@renderer/hooks/useItemForm'
// import { dateToStr, strToDate } from '@utils/index'

const props = defineProps<{
  pageName: string
  id: string
  dialogVisible: boolean
}>()
const emit = defineEmits(['update:dialogVisible', 'getPage'])
const form = reactive<pageApi.addItemParam>({
  id: '',
  className: '',
  teachingMethod: '',
  subjectId: '',
  fullPeople: 0,
  mainTeacherId: '',
  assistTeacherId: '',
  manageTeacherId: '',
  classHour: 0,
  beginDate: '',
  endDate: '',
  teachingDay: '',
  teachingTime: '',
  status: 0
})
// const dateRange = computed({
//   get() {
//     const beginDate = strToDate(form.beginDate)
//     const endDate = strToDate(form.endDate)
//     return [beginDate, endDate]
//   },
//   set(newArr) {
//     form.beginDate = dateToStr(newArr[0])
//     form.endDate = dateToStr(newArr[1])
//   }
// })
const teachingDay = computed({
  get() {
    const result = form.teachingDay ? form.teachingDay.split(',') : []
    return result
  },
  set(newArr) {
    form.teachingDay = newArr.join(',')
    console.log(form.teachingDay)
  }
})
// const teachingDay = ref([])
const { ruleFormRef, dialogFormVisible, validateForm, title } = useItemForm(props, emit, pageApi)

const rules = reactive({})

const onSubmit = () => {
  validateForm(form)
}
const allSubject = ref<any[]>([])
onBeforeMount(async () => {
  const data = await pageApi.getAllSubject()
  allSubject.value = data
})

const handleOpen = async () => {
  if (props.id) {
    const data = await pageApi.getItemById(props.id)
    for (const key in form) {
      if (data[key] !== undefined) form[key] = data[key]
    }
  }
}
const handleClose = () => {
  ruleFormRef.value.resetFields()
}
</script>

<style lang="scss" scoped>
.itemForm {
  padding-right: 30px;
}
</style>
