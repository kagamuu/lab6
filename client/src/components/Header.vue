<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useAuth } from '../composables/useAuth'
import { showToast } from '../services/toastService'
import ThemeSwitcher from './ThemeSwitcher.vue'

const authStore = useAuthStore()
const router = useRouter()
const { logout, isLoading } = useAuth()

const isLoggedIn = computed(() => authStore.isLoggedIn)

async function handleLogout() {
  try {
    await logout()
    authStore.setLoggedIn(false)
    showToast('Logout successful', 'success')
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <header class="navbar bg-base-200 shadow-lg">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-xl">📝 Мікроблог</RouterLink>
    </div>
    <div class="flex-none gap-2">
      <RouterLink to="/" class="btn btn-ghost">Стрічка</RouterLink>

      <ThemeSwitcher />

      <template v-if="isLoggedIn">
        <RouterLink to="/admin/create-author" class="btn btn-ghost">Створити автора</RouterLink>
        <RouterLink to="/admin/create-post" class="btn btn-ghost">Створити пост</RouterLink>
        <button @click="handleLogout" class="btn btn-ghost" :disabled="isLoading">
          <span v-if="isLoading" class="loading loading-spinner"></span>
          <span v-else>Logout</span>
        </button>
      </template>
      <RouterLink v-else to="/login" class="btn btn-ghost">Login</RouterLink>

    </div>
  </header>
</template>