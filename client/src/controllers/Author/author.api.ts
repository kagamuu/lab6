import api from '../../api/apiService'
import type { Author } from '../../types'

export async function fetchAuthors() {
    const response = await api.get<Author[]>('/authors')
    return response.data
}

export async function createAuthor(name: string, avatar: string) {
    const response = await api.post<Author>('/authors', { name, avatar })
    return response.data
}

export async function fetchAuthorPosts(authorId: number) {
    const response = await api.get(`/authors/${authorId}/posts`)
    return response.data
}