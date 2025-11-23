import express from 'express'
import cors from 'cors'
import { getAuthors, createAuthor, getAuthorPosts } from './controllers/author.controller'
import { getPosts, createPost } from './controllers/post.controller'
import { login, logout } from './controllers/user.controller'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/authors', getAuthors)
app.post('/api/authors', createAuthor)
app.get('/api/authors/:id/posts', getAuthorPosts)

app.get('/api/posts', getPosts)
app.post('/api/posts', createPost)

app.post('/api/auth/login', login)
app.post('/api/auth/logout', logout)

export default app