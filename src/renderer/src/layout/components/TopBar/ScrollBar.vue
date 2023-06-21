<template>
  <ul class="scroll-bar">
    <li v-for="(tab, index) in routeTabs" :key="tab.id" :class="{ active: activeId === tab.id }">
      <router-link :to="tab.fullPath" class="link">
        {{ tab.name }}
      </router-link>
      <el-icon size="12px" @click="removeTab(index, tab.id)"><icon-parko-close /></el-icon>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  routeTabs: {
    name: string
    fullPath: string
    id: string
  }[]
  activeId: string
}>()
const emit = defineEmits(['removeTab'])

const removeTab = (index, id) => {
  emit('removeTab', index, id)
}
</script>

<style lang="scss" scoped>
.scroll-bar {
  border-top: 1px solid #eee;
  display: flex;
  height: 40px;
  li {
    display: flex;
    align-items: center;
    color: #727272;
    padding: 0 20px;
    border-right: 1px solid #eee;
    .link {
      color: #727272;
    }
    .el-icon {
      margin-left: 10px;
    }
  }
  .active {
    color: #fff;
    background-color: var(--el-color-primary);
    .link {
      color: #fff;
    }
  }
}
</style>
