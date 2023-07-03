<template>
  <el-tag>{{ key }}</el-tag>
</template>

<script setup lang="ts">
import { useDictStore } from '@store/dict'
import { onBeforeMount, ref } from 'vue'
const props = defineProps<{
  dictType: string
  value: any
}>()
const key = ref('')
onBeforeMount(async () => {
  const dictStore = useDictStore()
  const dictOptions = await dictStore.getDictOptions(props.dictType)
  const option = dictOptions.find((item) => item.v == props.value)
  key.value = option.k
})
</script>

<style lang="scss" scoped></style>
