<template>
  <div class="login">
    <el-form :model="form" :rules="rules" ref="loginForm" @submit.prevent="onSubmit" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api'

const form = ref({
  username: '',
  password: ''
})

const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const loginForm = ref(null)
const router = useRouter()

const onSubmit = async () => {
  loginForm.value.validate(async (valid) => {
    if (valid) {
      // try {
      //   const response = await login({ username: form.value.username, password: form.value.password })
      //   localStorage.setItem('isLoggedIn', 'true')
      //   localStorage.setItem('token', response.token)
      //   router.push('/')
      // } catch (error) {
      //   alert('用户名或密码错误')
      // }
      if (form.value.username === 'admin' && form.value.password === 'admin') {
        localStorage.setItem('isLoggedIn', 'true')
        router.push('/')
      } else {
        alert('用户名或密码错误')
      }
    } else {
      console.log('表单验证失败')
      return false
    }
  })
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>