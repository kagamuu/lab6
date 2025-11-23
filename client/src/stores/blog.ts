import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Author, Post } from '../types'

export const useBlogStore = defineStore('blog', () => {
    const authors = ref<Author[]>([])
    const posts = ref<Post[]>([])

    function setAuthors(data: Author[]) {
        authors.value = data
    }

    function setPosts(data: Post[]) {
        posts.value = data
    }

    function getAuthorById(id: number) {
        return authors.value.find(a => a.id === id)
    }

    return {
        authors,
        posts,
        setAuthors,
        setPosts,
        getAuthorById
    }
})