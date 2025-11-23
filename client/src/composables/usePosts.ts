import { ref, computed } from 'vue'
import { fetchPosts, createPost as createPostApi } from '../controllers/Post/post.api'
import { useBlogStore } from '../stores/blog'
import type { PostType } from '../types'

export function usePosts() {
    const isLoading = ref(false)
    const blogStore = useBlogStore()

    const posts = computed(() => blogStore.posts)

    async function loadPosts() {
        isLoading.value = true
        try {
            const posts = await fetchPosts()
            blogStore.setPosts(posts)
        } finally {
            isLoading.value = false
        }
    }

    async function createPost(title: string, content: string, authorId: number, type: PostType) {
        isLoading.value = true
        try {
            const newPost = await createPostApi(title, content, authorId, type)
            blogStore.posts.unshift(newPost)
            return newPost
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        posts,
        loadPosts,
        createPost
    }
}