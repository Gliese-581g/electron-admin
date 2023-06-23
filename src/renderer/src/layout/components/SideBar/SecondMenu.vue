<template>
  <div class="second-menu">
    <h1 class="menu_title">{{ route.name }}</h1>
    <el-divider />
    <ul v-if="route.children" class="menu_list">
      <li
        v-for="item in route.children"
        :key="item.id"
        :class="{ activeIcon: route.activeIdx === item.id }"
      >
        <router-link :to="item.path" :class="{ activeIcon: route.activeIdx === item.id }">
          <el-icon v-if="item.meta.icon">
            <component :is="formatIconName(item)"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { routeType } from '@store/types'

defineProps<{
  route: {
    activeIdx: string
    name: string
    children: routeType[]
  }
}>()
function formatIconName(route) {
  return route.meta.icon.replace(/^el-icon-/, '')
}
</script>

<style lang="scss" scoped>
.second-menu {
  flex: 1;
  padding-left: 20px;
  border-right: 1px solid var(--el-border-color);
  li {
    display: flex;
    align-items: center;
    margin: 30px 10px;
    .el-icon {
      margin-right: 5px;
    }
  }
  .activeIcon {
    color: var(--el-color-primary);
  }
}
</style>
