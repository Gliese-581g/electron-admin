<template>
  <div class="top-bar">
    <div class="nav-bar">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>
          <div class="breadcrumb">
            <el-icon v-if="breadcrumb.pIcon" size="20">
              <component :is="breadcrumb.pIcon"></component>
            </el-icon>
            <span>
              {{ breadcrumb.pName }}
            </span>
          </div>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <div class="breadcrumb">
            <el-icon v-if="breadcrumb.icon" size="20">
              <component :is="breadcrumb.icon"></component>
            </el-icon>
            <span>
              {{ breadcrumb.cName }}
            </span>
          </div>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <UserBar />
    </div>
    <ScrollBar :route-tabs="routeTabs" :active-id="activeId" @remove-tab="removeTab" />
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { watch, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserBar from './UserBar.vue'
import ScrollBar from './ScrollBar.vue'
const route = useRoute()
const router = useRouter()

const breadcrumb = reactive<{
  pName: any
  cName: any
  pIcon: any
  icon: any
}>({
  pName: '',
  cName: '',
  pIcon: '',
  icon: ''
})

const routeTabs = reactive<
  {
    name: string
    fullPath: string
    id: any
  }[]
>([])

const removeTab = (index, id) => {
  routeTabs.splice(index, 1)
  if (id === activeId.value) {
    router.push(routeTabs.pop()?.fullPath || '/')
  }
}
const activeId = ref<any>('')
watch(
  route,
  (newVal) => {
    if (!routeTabs.find((route) => route.fullPath === newVal.fullPath)) {
      routeTabs.push({
        name: newVal.name?.toString() || '',
        fullPath: newVal.fullPath,
        id: newVal.meta.id || ''
      })
    }
    activeId.value = newVal.meta.id
    breadcrumb.cName = newVal.name || ''
    breadcrumb.pName = newVal.meta.pName || ''
    breadcrumb.icon = newVal.meta.icon || ''
    breadcrumb.pIcon = newVal.meta.pIcon || ''
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.top-bar {
  .nav-bar {
    height: 50px;
    display: flex;
    align-items: center;
    .breadcrumb {
      display: flex;
      align-items: center;
    }
  }
}
</style>
