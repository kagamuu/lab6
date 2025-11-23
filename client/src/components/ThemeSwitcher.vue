<script setup lang="ts">
import { ref, onMounted } from 'vue'

const themes = ['light', 'dark', 'cupcake', 'night']
const currentTheme = ref('light')

onMounted(() => {
  currentTheme.value = localStorage.getItem('theme') || 'light'
})

function changeTheme(theme: string) {
  currentTheme.value = theme
  localStorage.setItem('theme', theme)
  document.documentElement.setAttribute('data-theme', theme)
}
</script>

<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost">
      Тема
    </div>
    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
      <li v-for="theme in themes" :key="theme">
        <a @click="changeTheme(theme)" :class="{ 'active': currentTheme === theme }">
          {{ theme }}
        </a>
      </li>
    </ul>
  </div>
</template>