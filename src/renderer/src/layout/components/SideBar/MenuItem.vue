<template>
  <template v-for="route in routes" :key="route.id">
    <el-sub-menu v-if="route.children" :index="route.id">
      <template #title>{{ route.name }}</template>
      <MenuItem :routes="route.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="route.id">
      {{ route.name }}
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { routeType } from '@store/types'
defineProps<{
  routes: routeType[]
}>()
</script>

<style lang="scss" scoped></style>
