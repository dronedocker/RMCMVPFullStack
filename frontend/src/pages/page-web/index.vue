<template>
  <div class="login">
    <div class="logo-wrapper">
      <a-image class="logo-img" :src="djiLogo" :preview="false" />
    </div>
    <p class="logo-text">ReadyMonitor Cloud MVP</p>
    <a-form
      layout="inline"
      :model="formState"
      class="login-form"
    >
      <a-form-item>
        <a-input v-model:value="formState.username" placeholder="Username">
          <template #prefix>
            <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="formState.password"
          type="password"
          placeholder="Password"
        >
          <template #prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="loginBtnDisabled"
          @click="onSubmit"
        >
          Login
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import djiLogo from '/@/assets/icons/dji_logo.png'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { reactive, computed } from 'vue'
import { login, LoginBody } from '/@/api/manage'
import { useRouter } from 'vue-router'
import { ERouterName, ELocalStorageKey } from '/@/types/index'

const formState = reactive<LoginBody>({
  username: '',
  password: '',
  flag: true
})

const loginBtnDisabled = computed(() => {
  return !formState.username || !formState.password
})

const router = useRouter()

const onSubmit = async () => {
  try {
    const res = await login(formState)
    console.log('Login response:', res)

    if (res?.code === 0) {
      message.success('Login successful')

      if (res.data?.token) {
        localStorage.setItem(ELocalStorageKey.Token, res.data.token)
        console.log('Token saved:', ELocalStorageKey.Token)
      }

      try {
        await router.push('/home')
        console.log('Redirected to:', router.currentRoute.value.fullPath)
      } catch (navError) {
        console.error('Navigation error:', navError)
        message.error('Navigation failed')
      }
    } else {
      message.error(res?.message || 'Login failed')
    }
  } catch (error) {
    console.error('Unexpected login error:', error)
    message.error('Unexpected error during login')
  }
}
</script>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f5f8fa;
}

.logo-wrapper {
  max-width: 160px;
  margin-bottom: 20px;
}

.logo-img {
  width: 100%;
  height: auto;
  display: block;
}

.logo-text {
  font-size: 24px;
  color: #2d8cf0;
  margin-bottom: 30px;
  font-weight: 600;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>
