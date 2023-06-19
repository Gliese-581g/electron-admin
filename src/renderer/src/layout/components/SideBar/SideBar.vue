<template>
  <div class="sidebar">
    <ul class="first-menu">
      <li class="logo">
        <el-icon size="30">
          <icon-ph-discord-logo-fill></icon-ph-discord-logo-fill>
        </el-icon>
      </li>
      <li
        v-for="route in routes"
        :key="route.id"
        :class="{ activeIcon: activeIdx === route.id }"
        @click="handleActive(route)"
      >
        <el-icon v-if="!(route.name === '小鹿线')" size="20">
          <component :is="formatIconName(route)"></component>
        </el-icon>
        <span>{{ route.name }}</span>
      </li>
    </ul>
    <SecondMenu :route="activeRoute" />
  </div>
</template>

<script setup lang="ts">
import { useRouteStore } from '@store/routes'
import { routeType } from '@store/types'
import { storeToRefs } from 'pinia'
import { ref, reactive, watch } from 'vue'
import SecondMenu from './SecondMenu.vue'

const routeStore = useRouteStore()
const { routes } = storeToRefs(routeStore)
function formatIconName(route) {
  return route.meta.icon.replace(/^el-icon-/, '')
}
const activeIdx = ref('1')
const activeRoute = reactive<{
  name: string
  children: routeType[]
}>({
  name: '',
  children: []
})
function handleActive(route) {
  activeIdx.value = route.id
  activeRoute.name = route.name
  activeRoute.children = route.children || []
}
watch(routes, () => {
  if (routes.value.length > 0) {
    const route = routes.value[0]
    activeRoute.name = route.name
    activeRoute.children = route.children || []
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  height: 100vh;
  .first-menu {
    background-color: #222b45;
    color: #fff;
    font-size: 14px;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px 20px;
      cursor: pointer;
      -webkit-app-region: no-drag;
      .el-icon {
        margin-bottom: 5px;
      }
    }
    .logo {
      cursor: default;
      -webkit-app-region: drag;
    }
    .activeIcon {
      background-color: var(--el-color-primary);
    }
  }
}
</style>
