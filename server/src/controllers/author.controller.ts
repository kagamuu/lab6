import { Request, Response } from 'express'
import { readJsonFile, writeJsonFile } from '../services/fileService'
import type { Author, AuthorCreateRequest, Post } from '../types'

export function getAuthors(req: Request, res: Response) {
    try {
        const authors = readJsonFile<Author[]>('authors.json')
        res.json(authors)
    } catch (error) {
        res.status(500).json({ error: 'Failed to read authors' })
    }
}

export function createAuthor(req: Request, res: Response) {
    try {
        const { name, avatar } = req.body as AuthorCreateRequest

        if (!name || !avatar) {
            return res.status(400).json({ error: 'Name and avatar are required' })
        }

        const authors = readJsonFile<Author[]>('authors.json')

        const existingAuthor = authors.find(a => a.name === name)
        if (existingAuthor) {
            return res.status(400).json({ error: 'Author with that name already exists' })
        }

        const newAuthor: Author = {
            id: Date.now(),
            name,
            avatar
        }

        authors.push(newAuthor)
        writeJsonFile('authors.json', authors)

        res.status(201).json(newAuthor)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create author' })
    }
}

export function getAuthorPosts(req: Request, res: Response) {
    try {
        const authorId = parseInt(req.params.id)

        const authors = readJsonFile<Author[]>('authors.json')
        const author = authors.find(a => a.id === authorId)

        if (!author) {
            return res.status(404).json({ error: 'Author not found' })
        }

        const posts = readJsonFile<Post[]>('posts.json')
        const authorPosts = posts.filter(p => p.authorId === authorId)

        res.json(authorPosts)
    } catch (error) {
        res.status(500).json({ error: 'Failed to read author posts' })
    }
}