<template>
  <el-form ref="formRef" :model="form" :rules="rules" class="form-box">
    <el-form-item prop="phone">
      <el-input
        v-model="form.phone"
        type="text"
        placeholder="请输入手机号码"
        size="large"
        clearable
      >
        <template #prepend>+86</template>
        <template #prefix>
          <el-icon><Cellphone /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-input
        v-model="form.captcha"
        placeholder="请输入验证码"
        class="captcha-input"
        size="large"
        maxlength="6"
        :show-word-limit="false"
      >
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
        <template #suffix>
          <span v-if="!countDown" class="captcha-btn" size="large" @click.stop="getLoginCaptcha"
            >获取验证码</span
          >
          <span v-else>{{ countDown }}秒后重新发送</span>
        </template>
      </el-input>
    </el-form-item>
    <el-button type="primary" round class="login-btn" size="large" @click="login">登录</el-button>
  </el-form>
  <p>还没有账号？创建新账号</p>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { reqGetCaptcha, loginByMobile } from '@api/login'
import { Encrypt } from '@utils/aes'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  phone: '',
  captcha: ''
})

const rules = reactive({
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
    {
      pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      //pattern: /^1[3456789]\d{9}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  captcha: [{ required: true, message: '验证码输入错误，请重新输入' }]
})

const countDown = ref(0)
const formRef = ref()
const getLoginCaptcha = () => {
  formRef.value.validateField(['phone'], async (valid) => {
    if (valid) {
      const { code, msg } = await reqGetCaptcha({ mobile: Encrypt(form.phone) })
      if (code === '200') {
        ElMessage.success('发送验证码成功')
        countDown.value = 60
        const timer = setInterval(() => {
          if (countDown.value) --countDown.value
          else clearInterval(timer)
        }, 1000)
      } else ElMessage.error(msg)
    }
  })
}
const login = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      const { code, msg, data } = await loginByMobile({
        mobile: Encrypt(form.phone),
        captcha: Encrypt(form.captcha)
      })
      if (code === '200') {
        // 保存token

        sessionStorage.setItem('TOKEN', data)

        //登录后跳转
        ElMessage.success('登录成功')
        router.push('/')
      } else ElMessage.error(msg)
    }
  })
}
</script>

<style lang="scss" scoped>
.form-box {
  margin-top: 10px;
  .captcha-btn {
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
    }
  }
  .login-btn {
    width: 100%;
  }
}
</style>
