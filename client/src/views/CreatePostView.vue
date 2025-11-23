<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthors } from '../composables/useAuthors'
import { usePosts } from '../composables/usePosts'
import { useBlogStore } from '../stores/blog'
import { showToast } from '../services/toastService'
import type { PostType } from '../types'

const router = useRouter()
const { loadAuthors, isLoading: authorsLoading } = useAuthors()
const { createPost, isLoading: postLoading } = usePosts()
const blogStore = useBlogStore()

const selectedAuthorId = ref<number | null>(null)
const title = ref('')
const content = ref('')
const selectedType = ref<PostType>('Games')

const postTypes: PostType[] = ['Games', 'Sports', 'Study']

onMounted(async () => {
  await loadAuthors()
})

async function handleCreatePost() {
  if (!selectedAuthorId.value) {
    showToast('Select author', 'error')
    return
  }
  if (!title.value) {
    showToast('Enter post title', 'error')
    return
  }
  if (!content.value) {
    showToast('Enter post content', 'error')
    return
  }

  try {
    await createPost(title.value, content.value, selectedAuthorId.value, selectedType.value)
    showToast('Post created successfully', 'success')
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-4xl font-bold mb-8">Створити пост</h1>

    <div v-if="authorsLoading" class="flex justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else-if="blogStore.authors.length === 0" class="alert alert-warning mb-4">
      <span>Спочатку створіть автора!</span>
    </div>

    <div v-else class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Автор</span>
          </label>
          <select v-model="selectedAuthorId" class="select select-bordered">
            <option :value="null" disabled>Оберіть автора</option>
            <option v-for="author in blogStore.authors" :key="author.id" :value="author.id">
              {{ author.name }}
            </option>
          </select>
        </div>

        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">Назва посту</span>
          </label>
          <input
              v-model="title"
              type="text"
              placeholder="Введіть назву"
              class="input input-bordered"
          />
        </div>

        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">Опис посту</span>
          </label>
          <textarea
              v-model="content"
              placeholder="Введіть опис"
              class="textarea textarea-bordered h-32"
          ></textarea>
        </div>

        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">Тип посту</span>
          </label>
          <select v-model="selectedType" class="select select-bordered">
            <option v-for="type in postTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>

        <div class="card-actions justify-center mt-6">
          <button
              @click="handleCreatePost"
              class="btn btn-primary btn-wide"
              :disabled="postLoading"
          >
            <span v-if="postLoading" class="loading loading-spinner"></span>
            <span v-else>Створити пост</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>