<template>
  <div class="sidebar">
    <el-scrollbar>
      <ul class="first-menu">
        <li class="logo">
          <el-icon size="30">
            <icon-ph-discord-logo-fill></icon-ph-discord-logo-fill>
          </el-icon>
        </li>
        <li
          v-for="route in routesStore.asyncRoutes"
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
    </el-scrollbar>
    <el-scrollbar class="second-menu">
      <SecondMenu :route="activeRoute" />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useRoutesStore } from '@store/routes'
import { ref, reactive, watch } from 'vue'
import SecondMenu from './SecondMenu.vue'
import { useRoute } from 'vue-router'

const routesStore = useRoutesStore()
function formatIconName(route) {
  return route.meta.icon.replace(/^el-icon-/, '')
}
const routesMap = useRoute()

const activeIdx = ref('')

const activeRoute = reactive<{
  activeIdx: any
  name: string
  children: routeType[]
}>({
  activeIdx: '',
  name: '',
  children: []
})
function handleActive(route) {
  activeIdx.value = route.id
  activeRoute.name = route.name
  activeRoute.children = route.children || []
}

watch(
  routesMap,
  (newVal) => {
    const initial = routesStore.asyncRoutes.find((route) => route.id === newVal.meta.pid)
    handleActive(initial)
    activeRoute.activeIdx = routesMap.meta.id || ''
  },
  {
    immediate: true
  }
)
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
  .second-menu {
    flex: 1;
  }
}
</style>
