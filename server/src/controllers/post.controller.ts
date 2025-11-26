import { Request, Response } from 'express'
import { readJsonFile, writeJsonFile } from '../services/fileService'
import { getLogger } from '../logger/createLogger'
import type { Post, PostCreateRequest } from '../types'

const logger = getLogger()

export function getPosts(req: Request, res: Response) {
    try {
        const posts = readJsonFile<Post[]>('posts.json')
        logger.info('Fetched all posts')
        res.json(posts)
    } catch (error) {
        logger.error('Failed to read posts')
        res.status(500).json({ error: 'Failed to read posts' })
    }
}

export function createPost(req: Request, res: Response) {
    try {
        const { title, content, authorId, type } = req.body as PostCreateRequest

        if (!title || !content || !authorId || !type) {
            logger.error('Post creation failed: missing fields')
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

        logger.success(`Post created: ${title}`)
        res.status(201).json(newPost)
    } catch (error) {
        logger.error('Failed to create post')
        res.status(500).json({ error: 'Failed to create post' })
    }
}