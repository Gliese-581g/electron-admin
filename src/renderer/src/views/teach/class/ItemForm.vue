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
          <el-radio-group v-model="form.teachingMethod">
            <DictRadio :dict-type="DictType.CRM_TEACHING_METHOD" />
          </el-radio-group>
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
            v-model="dateRangeValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开班日期"
            end-placeholder="结业日期"
          />
        </el-form-item>
        <el-form-item label="主讲老师" prop="mainTeacherId">
          <CustomSelect v-model:id="form.mainTeacherId" />
        </el-form-item>
        <el-form-item label="助教老师" prop="assistTeacherId">
          <CustomSelect v-model:id="form.assistTeacherId" />
        </el-form-item>
        <el-form-item label="学管老师" prop="manageTeacherId">
          <CustomSelect v-model:id="form.manageTeacherId" />
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
          <div class="time-select">
            <el-time-select
              v-model="startTime"
              :max-time="endTime"
              placeholder="开始时间"
              end="22:00"
              step="00:30"
            />
            <span class="separator">至</span>
            <el-time-select
              v-model="endTime"
              :min-time="startTime"
              placeholder="结束时间"
              step="00:30"
              end="24:00"
            />
          </div>
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
import { DictType } from '@config/index'
import CustomSelect from './CustomSelect.vue'
import { dateToStr, strToDate } from '@utils/index'
import { DateModelType } from 'element-plus'

const props = defineProps<{
  pageName: string
  id: string
  dialogVisible: boolean
}>()
const emit = defineEmits(['update:dialogVisible', 'getPage'])
const form = reactive<pageApi.addItemParam>({
  id: '',
  className: '',
  teachingMethod: '0',
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
const dateRangeValue = computed<[DateModelType, DateModelType]>({
  get() {
    const beginDate = strToDate(form.beginDate)
    const endDate = strToDate(form.endDate)
    return [beginDate, endDate]
  },
  set(newArr) {
    form.beginDate = dateToStr(newArr[0] as Date)
    if (newArr[1]) form.endDate = dateToStr(newArr[1] as Date)
  }
})

const startTime = ref('')
const endTime = ref('')
const formatTeachingTime = () => {
  return startTime.value + '-' + endTime.value
}
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
const { ruleFormRef, dialogFormVisible, validateForm, title } = useItemForm(props, emit, pageApi)

const rules = reactive({})

const onSubmit = () => {
  form.teachingTime = formatTeachingTime()
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
  .time-select {
    display: flex;
    .separator {
      padding: 0 10px;
    }
  }
}
</style>
