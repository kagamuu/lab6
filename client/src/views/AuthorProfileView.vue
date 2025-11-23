<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import { useAuthors } from '../composables/useAuthors'
import { fetchAuthorPosts } from '../controllers/Author/author.api'
import PostCard from '../components/PostCard.vue'
import type { PostType, Post } from '../types'

const route = useRoute()
const blogStore = useBlogStore()
const { loadAuthors, isLoading: authorsLoading } = useAuthors()

const authorId = computed(() => parseInt(route.params.id as string))
const author = computed(() => blogStore.getAuthorById(authorId.value))
const selectedFilter = ref<PostType | 'all'>('all')
const authorPosts = ref<Post[]>([])
const isLoading = ref(false)

const filteredPosts = computed(() => {
  if (selectedFilter.value === 'all') {
    return authorPosts.value
  }
  return authorPosts.value.filter(p => p.type === selectedFilter.value)
})

const postStats = computed(() => {
  return {
    Games: authorPosts.value.filter(p => p.type === 'Games').length,
    Sports: authorPosts.value.filter(p => p.type === 'Sports').length,
    Study: authorPosts.value.filter(p => p.type === 'Study').length
  }
})

const totalPosts = computed(() => {
  return authorPosts.value.length
})

const countdownValue = ref(0)

onMounted(async () => {
  await loadAuthors()

  isLoading.value = true
  try {
    authorPosts.value = await fetchAuthorPosts(authorId.value)
  } finally {
    isLoading.value = false
  }

  setTimeout(() => {
    countdownValue.value = totalPosts.value
  }, 500)
})

function selectFilter(filter: PostType | 'all') {
  selectedFilter.value = filter
  const elem = document.activeElement as HTMLElement
  elem?.blur()
}
</script>

<template>
  <div v-if="authorsLoading || isLoading" class="flex justify-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>

  <div v-else-if="!author" class="alert alert-error">
    <span>Автор не знайдений</span>
  </div>

  <div v-else>
    <div class="card bg-base-100 shadow-xl mb-8">
      <div class="card-body">
        <div class="flex items-center gap-6">
          <div class="avatar">
            <div class="w-32 rounded-full">
              <img :src="author.avatar" :alt="author.name" />
            </div>
          </div>

          <div class="flex-1">
            <h1 class="text-4xl font-bold mb-4">{{ author.name }}</h1>

            <div class="stats shadow">
              <div class="stat">
                <div class="stat-title">Всього постів</div>
                <div class="stat-value">
                  <span class="countdown">
                    <span :style="{ '--value': countdownValue }"></span>
                  </span>
                </div>
              </div>

              <div v-if="postStats.Games > 0" class="stat">
                <div class="stat-title">Games</div>
                <div class="stat-value text-primary">{{ postStats.Games }}</div>
              </div>

              <div v-if="postStats.Sports > 0" class="stat">
                <div class="stat-title">Sports</div>
                <div class="stat-value text-secondary">{{ postStats.Sports }}</div>
              </div>

              <div v-if="postStats.Study > 0" class="stat">
                <div class="stat-title">Study</div>
                <div class="stat-value text-accent">{{ postStats.Study }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Пости автора</h2>

      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-outline">
          Фільтр: {{ selectedFilter === 'all' ? 'Всі' : selectedFilter }}
        </div>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a @click="selectFilter('all')">Всі</a></li>
          <li><a @click="selectFilter('Games')">Games</a></li>
          <li><a @click="selectFilter('Sports')">Sports</a></li>
          <li><a @click="selectFilter('Study')">Study</a></li>
        </ul>
      </div>
    </div>

    <div v-if="filteredPosts.length === 0" class="alert alert-info">
      <span>Постів не знайдено</span>
    </div>

    <div class="grid gap-6">
      <PostCard v-for="post in filteredPosts" :key="post.id" :post="post" />
    </div>
  </div>
</template>