import { ref } from 'vue'
import { fetchAuthors, createAuthor as createAuthorApi } from '../controllers/Author/author.api'
import { useBlogStore } from '../stores/blog'
import type { Author } from '../types'

export function useAuthors() {
    const isLoading = ref(false)
    const blogStore = useBlogStore()

    async function loadAuthors() {
        isLoading.value = true
        try {
            const authors = await fetchAuthors()
            blogStore.setAuthors(authors)
        } finally {
            isLoading.value = false
        }
    }

    async function createAuthor(name: string, avatar: string) {
        isLoading.value = true
        try {
            const newAuthor = await createAuthorApi(name, avatar)
            blogStore.authors.push(newAuthor)
            return newAuthor
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        loadAuthors,
        createAuthor
    }
}