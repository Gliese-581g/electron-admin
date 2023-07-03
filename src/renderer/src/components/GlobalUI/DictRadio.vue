<template>
  <el-radio v-for="item in dictOptions" :key="item.id" :label="item.v">{{ item.k }}</el-radio>
</template>

<script setup lang="ts">
import { useDictStore } from '@renderer/store/dict'
import { onBeforeMount, ref } from 'vue'
const props = defineProps<{
  dictType: string
}>()
const dictOptions = ref<any[]>([])
onBeforeMount(async () => {
  const dictStore = useDictStore()
  dictOptions.value = await dictStore.getDictOptions(props.dictType)
})
</script>

<style lang="scss" scoped></style>
