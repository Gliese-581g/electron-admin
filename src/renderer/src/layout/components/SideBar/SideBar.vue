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
import { useRoutesStore } from '@store/routes'
import { routeType } from '@store/types'
import { storeToRefs } from 'pinia'
import { ref, reactive, computed } from 'vue'
import SecondMenu from './SecondMenu.vue'
import { useRoute } from 'vue-router'

const routesStore = useRoutesStore()
const { routes } = storeToRefs(routesStore)
function formatIconName(route) {
  return route.meta.icon.replace(/^el-icon-/, '')
}
const routesMap = useRoute()
const activeIdx = ref(routesMap.meta.pid)

const initialRoute = computed(() => {
  const initial = routes.value.find((route) => route.id === routesMap.meta.pid)
  return {
    initId: routesMap.meta.id || '',
    name: initial?.name || '',
    children: initial?.children || []
  }
})

const activeRoute = reactive<{
  initId: string | object
  name: string
  children: routeType[]
}>({
  initId: initialRoute.value.initId,
  name: initialRoute.value.name,
  children: initialRoute.value.children
})
function handleActive(route) {
  activeIdx.value = route.id
  activeRoute.name = route.name
  activeRoute.children = route.children || []
}
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
