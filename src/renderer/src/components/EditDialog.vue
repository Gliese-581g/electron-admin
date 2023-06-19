<template>
  <el-dialog v-model="dialogFormVisible" title="增加角色">
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
