<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthors } from '../composables/useAuthors'
import { showToast } from '../services/toastService'
import avatar1 from '../assets/avatars/avatar1.png'
import avatar2 from '../assets/avatars/avatar2.png'
import avatar3 from '../assets/avatars/avatar3.png'
import avatar4 from '../assets/avatars/avatar4.png'
import avatar5 from '../assets/avatars/avatar5.png'
import avatar6 from '../assets/avatars/avatar6.png'
import avatar7 from '../assets/avatars/avatar7.png'

const router = useRouter()
const { createAuthor, isLoading } = useAuthors()

const name = ref('')

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7] as const

const selectedAvatar = ref(avatar1)

async function handleCreateAuthor() {
  if (!name.value) {
    showToast('Enter author name', 'error')
    return
  }

  try {
    const author = await createAuthor(name.value, selectedAvatar.value)
    showToast('Author created successfully', 'success')
    router.push(`/author/${author.id}`)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-4xl font-bold mb-8">Створити автора</h1>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Ім'я автора</span>
          </label>
          <input
              v-model="name"
              type="text"
              placeholder="Введіть ім'я"
              class="input input-bordered"
          />
        </div>

        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">Оберіть аватар</span>
          </label>
          <div class="grid grid-cols-4 gap-4">
            <div
                v-for="avatar in avatars"
                :key="avatar"
                @click="selectedAvatar = avatar"
                class="avatar cursor-pointer transition-all hover:scale-110"
            >
              <div
                  class="w-20 rounded-full"
                  :class="{ 'ring ring-primary ring-4': selectedAvatar === avatar }"
              >
                <img :src="avatar" />
              </div>
            </div>
          </div>
        </div>

        <div class="card-actions justify-center mt-6">
          <button
              @click="handleCreateAuthor"
              class="btn btn-primary btn-wide"
              :disabled="isLoading"
          >
            <span v-if="isLoading" class="loading loading-spinner"></span>
            <span v-else>Створити автора</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>