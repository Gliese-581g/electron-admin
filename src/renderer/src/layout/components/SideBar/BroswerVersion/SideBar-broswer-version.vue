<template>
  <el-menu
    active-text-color="#ffd04b"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    background-color="#222b45"
    :unique-opened="true"
    :collapse-transition="false"
  >
    <MenuItem :routes="routes" />
  </el-menu>
</template>

<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import { useRouteStore } from '@store/routes'
import { storeToRefs } from 'pinia'
const routeStore = useRouteStore()
const { routes } = storeToRefs(routeStore)
</script>

<style lang="scss" scoped></style>
