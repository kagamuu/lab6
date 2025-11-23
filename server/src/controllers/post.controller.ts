import { Request, Response } from 'express'
import { readJsonFile, writeJsonFile } from '../services/fileService'
import type { Post, PostCreateRequest } from '../types'

export function getPosts(req: Request, res: Response) {
    try {
        const posts = readJsonFile<Post[]>('posts.json')
        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: 'Failed to read posts' })
    }
}

export function createPost(req: Request, res: Response) {
    try {
        const { title, content, authorId, type } = req.body as PostCreateRequest

        if (!title || !content || !authorId || !type) {
            return res.status(400).json({ error: 'All fields are required' })
        }

        const posts = readJsonFile<Post[]>('posts.json')

        const newPost: Post = {
            id: Date.now(),
            title,
            content,
            authorId,
            type,
            date: new Date().toLocaleDateString()
        }

        posts.unshift(newPost)
        writeJsonFile('posts.json', posts)

        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' })
    }
}