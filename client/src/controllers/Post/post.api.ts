import api from '../../api/apiService'
import type { Post, PostType } from '../../types'

export async function fetchPosts() {
    const response = await api.get<Post[]>('/posts')
    return response.data
}

export async function createPost(title: string, content: string, authorId: number, type: PostType) {
    const response = await api.post<Post>('/posts', { title, content, authorId, type })
    return response.data
}