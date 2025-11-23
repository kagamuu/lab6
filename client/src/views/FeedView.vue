<script setup lang="ts">
import { onMounted } from 'vue'
import { usePosts } from '../composables/usePosts'
import { useAuthors } from '../composables/useAuthors'
import { useBlogStore } from '../stores/blog'
import PostCard from '../components/PostCard.vue'

const { posts, loadPosts, isLoading: postsLoading } = usePosts()
const { loadAuthors, isLoading: authorsLoading } = useAuthors()
const blogStore = useBlogStore()

onMounted(async () => {
  await loadAuthors()
  await loadPosts()
  blogStore.setPosts(posts.value)
})
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">Стрічка постів</h1>

    <div v-if="postsLoading || authorsLoading" class="flex justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else-if="posts.length === 0" class="alert alert-info">
      <span>Постів ще немає. Створіть автора та додайте перший пост!</span>
    </div>

    <TransitionGroup v-else name="post" tag="div" class="grid gap-6">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.post-enter-active {
  transition: all 0.5s ease;
}

.post-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.post-move {
  transition: transform 0.5s ease;
}
</style>