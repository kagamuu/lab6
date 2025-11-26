import { Request, Response } from 'express'
import { readJsonFile, writeJsonFile } from '../services/fileService'
import { getLogger } from '../logger/createLogger'
import type { User, LoginRequest } from '../types'

const logger = getLogger()

export function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body as LoginRequest

        if (!username || !password) {
            logger.error('Login failed: missing credentials')
            return res.status(400).json({ error: 'Username and password are required' })
        }

        const user = readJsonFile<User>('user.json')

        if (user.username !== username || user.password !== password) {
            logger.error(`Login failed: invalid credentials for ${username}`)
            return res.status(401).json({ error: 'Invalid username or password' })
        }

        user.isLoggedIn = true
        writeJsonFile('user.json', user)

        logger.success(`User logged in: ${username}`)
        res.json({ success: true, isLoggedIn: true })
    } catch (error) {
        logger.error('Login failed')
        res.status(500).json({ error: 'Login failed' })
    }
}

export function logout(req: Request, res: Response) {
    try {
        const user = readJsonFile<User>('user.json')
        const username = user.username

        user.isLoggedIn = false
        writeJsonFile('user.json', user)

        logger.info(`User logged out: ${username}`)
        res.json({ success: true, isLoggedIn: false })
    } catch (error) {
        logger.error('Logout failed')
        res.status(500).json({ error: 'Logout failed' })
    }
}