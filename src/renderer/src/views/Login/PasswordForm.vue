<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="password-form" size="large">
    <!-- 用户名 -->
    <el-form-item prop="username">
      <el-input v-model="ruleForm.username" clearable @input="errorMsg = ''">
        <template #prefix>
          <el-icon><i-ep-user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <!-- 密码 -->
    <el-form-item prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        clearable
        show-password
        @input="errorMsg = ''"
      >
        <template #prefix>
          <el-icon><i-ep-lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <!-- 验证码 -->
    <el-form-item prop="captcha">
      <div class="captcha">
        <el-input v-model="ruleForm.captcha" @input="errorMsg = ''">
          <template #prefix>
            <el-icon><i-ep-circle-check /></el-icon>
          </template>
        </el-input>
        <el-image :src="imgUrl" class="captcha-img" @click="getCaptchaImage" />
        <span class="errorMsg">{{ errorMsg }}</span>
      </div>
    </el-form-item>
    <el-form-item class="flexbox-item">
      <el-checkbox v-model="checkedMemo" label="记住密码" @change="handlerMemoChange"></el-checkbox>
      <span class="forget-pwd">忘记密码</span>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" round class="login-btn" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, ref } from 'vue'
import { reqGetCaptchaImage, reqLogin } from '@api/login'
import { nanoid } from 'nanoid'
import { Encrypt } from '@utils/aes'
import { useRouter } from 'vue-router'
import { abToDataUrl2 } from '@utils/index'
import { useMemoPassword } from './hooks'
const router = useRouter()

const { checkedMemo, handlerMemoChange, memoData, setMemoPassword } = useMemoPassword()

// 收集表单数据
const ruleForm = reactive({
  username: memoData.value.username,
  password: memoData.value.password,
  captcha: '' //验证码
})
// 验证表单
const rules = reactive({
  username: { required: true, message: '请输入用户名', trigger: 'change' },
  password: { required: true, message: '请输入密码', trigger: 'change' },
  captcha: [{ required: true, message: '请输入验证码', trigger: 'change' }]
})

// 获取验证码图片
const imgUrl = ref<FileReader['result']>('')
const key = nanoid() // 随机UUID

async function getCaptchaImage(): Promise<void> {
  const data = await reqGetCaptchaImage({
    key
  })
  // arrayBuffer转base64的data:url
  imgUrl.value = abToDataUrl2(data, 'image/png')
}
onBeforeMount(() => {
  getCaptchaImage()
})

// 表单校验提交表单
const ruleFormRef = ref()
const errorMsg = ref('')
function login() {
  ruleFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      //登录认证，获取token
      const { code, msg, data } = await reqLogin({
        // aes加密表单信息
        username: Encrypt(ruleForm.username),
        password: Encrypt(ruleForm.password),
        key,
        captcha: ruleForm.captcha
      })
      if (code === '200') {
        // 保存token
        sessionStorage.setItem('TOKEN', data)
        // 记住密码功能
        setMemoPassword(ruleForm.username, ruleForm.password)

        //登录后跳转

        router.push('/')
      }
      if (code === '10002') errorMsg.value = msg
      if (code === '10013') errorMsg.value = msg
      if (code === '10022') errorMsg.value = msg
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style lang="scss">
.password-form {
  .el-form-item.is-error .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  }
}
</style>
<style lang="scss">
.password-form {
  margin-top: 10px;
  .flexbox-item {
    display: flex;

    .forget-pwd {
      color: var(--el-color-primary);
      margin-left: auto;
    }
  }
  .captcha {
    display: flex;
    flex: 1;
    position: relative;

    .captcha-img {
      margin-left: 6px;
    }
    .errorMsg {
      position: absolute;
      left: 0;
      bottom: -30px;
      font-size: 12px;
      color: var(--el-color-danger);
    }
  }
  .login-btn {
    // margin: auto;
    width: 100%;
  }
}
</style>
