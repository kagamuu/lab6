<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import { POST_TYPE_COLORS } from '../types'
import type { Post } from '../types'

const props = defineProps<{
  post: Post
}>()

const router = useRouter()
const store = useBlogStore()

const author = computed(() => store.getAuthorById(props.post.authorId))
const colorClass = computed(() => POST_TYPE_COLORS[props.post.type])

function goToProfile() {
  if (author.value) {
    router.push(`/author/${author.value.id}`)
  }
}
</script>

<template>
  <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
    <div class="card-body">
      <div class="flex items-center gap-4 mb-4">
        <div class="avatar cursor-pointer" @click="goToProfile">
          <div class="w-12 rounded-full">
            <img :src="author?.avatar" :alt="author?.name" />
          </div>
        </div>
        <div class="flex-1">
          <h3 class="font-bold cursor-pointer hover:underline" @click="goToProfile">
            {{ author?.name }}
          </h3>
          <p class="text-sm text-base-content/60">{{ post.date }}</p>
        </div>
        <div class="badge" :class="colorClass">{{ post.type }}</div>
      </div>

      <h2 class="card-title">{{ post.title }}</h2>
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>