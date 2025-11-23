<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useAuthStore } from '../stores/auth'
import { showToast } from '../services/toastService'

const router = useRouter()
const { login, isLoading } = useAuth()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')

async function handleLogin() {
  if (!username.value || !password.value) {
    showToast('Fill all fields', 'error')
    return
  }

  try {
    const result = await login(username.value, password.value)
    if (result.success) {
      authStore.setLoggedIn(true)
      showToast('Login successful', 'success')
      router.push('/admin/create-author')
    }
  } catch (error) {
    authStore.setLoggedIn(false)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-20">
    <h1 class="text-4xl font-bold mb-8 text-center">Login</h1>

    <div class="alert alert-info shadow-lg mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <div>
        <h3 class="font-bold">Тестовий доступ (Admin)</h3>
        <div class="text-xs">Логін: admin | Пароль: admin123</div>
      </div>
    </div>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input
              v-model="username"
              type="text"
              placeholder="Enter username"
              class="input input-bordered"
          />
        </div>

        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input
              v-model="password"
              type="password"
              placeholder="Enter password"
              class="input input-bordered"
          />
        </div>

        <div class="card-actions justify-center mt-6">
          <button
              @click="handleLogin"
              class="btn btn-primary btn-wide"
              :disabled="isLoading"
          >
            <span v-if="isLoading" class="loading loading-spinner"></span>
            <span v-else>Login</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>