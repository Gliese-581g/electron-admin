<template>
  <div class="second-menu">
    <h1 class="menu_title">{{ route.name }}</h1>
    <el-divider />
    <ul class="menu_list">
      <li
        v-for="item in route.children"
        :key="item.id"
        :class="{ activeIcon: activeIdx === item.id }"
        @click="handleActive(item)"
      >
        <el-icon v-if="item.meta.icon">
          <component :is="formatIconName(item)"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>
d
<script setup lang="ts">
import { routeType } from '@store/types'
import { ref } from 'vue'

import { useRouter } from 'vue-router'
const myRouter = useRouter()

defineProps<{
  route: {
    name: string
    children: routeType[]
  }
}>()
function formatIconName(route) {
  return route.meta.icon.replace(/^el-icon-/, '')
}

const activeIdx = ref('2')
function handleActive(route) {
  activeIdx.value = route.id
  myRouter.push(route.path)
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
    cursor: pointer;
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
