<template>
  <div>
    <div class="navbar-left">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { watch, reactive } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

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

watch(route, (newVal) => {
  console.log(newVal.meta)
  breadcrumb.cName = newVal.name || ''
  breadcrumb.pName = newVal.meta.pName || ''
  breadcrumb.icon = newVal.meta.icon || ''
  console.log(breadcrumb.icon)
  breadcrumb.pIcon = newVal.meta.pIcon || ''
})
</script>

<style lang="scss" scoped>
.navbar-left {
  display: flex;
  align-items: center;
  .breadcrumb {
    display: flex;
    align-items: center;
  }
}
</style>
