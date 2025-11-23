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

export interface User {
    username: string
    password: string
    isLoggedIn: boolean
}

export interface LoginRequest {
    username: string
    password: string
}

export interface AuthorCreateRequest {
    name: string
    avatar: string
}

export interface PostCreateRequest {
    title: string
    content: string
    authorId: number
    type: PostType
}