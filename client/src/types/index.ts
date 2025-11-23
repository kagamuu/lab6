export interface Author {
    id: number
    name: string
    avatar: string
}

export interface Post {
    id: number
    title: string
    content: string
    authorId: number
    type: PostType
    date: string
}

export type PostType = 'Games' | 'Sports' | 'Study'

export const POST_TYPE_COLORS: Record<PostType, string> = {
    Games: 'badge-primary',
    Sports: 'badge-secondary',
    Study: 'badge-accent'
}

export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
    success: boolean
    isLoggedIn: boolean
}