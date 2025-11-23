import fs from 'fs'
import path from 'path'

export function readJsonFile<T>(filename: string): T {
    const filePath = path.join(__dirname, '../db', filename)
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
}

export function writeJsonFile<T>(filename: string, data: T): void {
    const filePath = path.join(__dirname, '../db', filename)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}