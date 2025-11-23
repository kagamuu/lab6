import { Request, Response } from 'express'
import { readJsonFile, writeJsonFile } from '../services/fileService'
import type { User, LoginRequest } from '../types'

export function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body as LoginRequest

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' })
        }

        const user = readJsonFile<User>('user.json')

        if (user.username !== username || user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' })
        }

        user.isLoggedIn = true
        writeJsonFile('user.json', user)

        res.json({ success: true, isLoggedIn: true })
    } catch (error) {
        res.status(500).json({ error: 'Login failed' })
    }
}

export function logout(req: Request, res: Response) {
    try {
        const user = readJsonFile<User>('user.json')
        user.isLoggedIn = false
        writeJsonFile('user.json', user)

        res.json({ success: true, isLoggedIn: false })
    } catch (error) {
        res.status(500).json({ error: 'Logout failed' })
    }
}