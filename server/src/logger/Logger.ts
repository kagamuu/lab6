import fs from 'fs'
import path from 'path'
import { LogMode } from './LogMode'

const Colors = {
    Reset: '\x1b[0m',
    Green: '\x1b[32m',
    Yellow: '\x1b[33m',
    Red: '\x1b[31m'
}

export class Logger {
    private mode: LogMode
    private logFilePath: string

    constructor(mode: LogMode) {
        this.mode = mode
        this.logFilePath = path.join(__dirname, '../logs/app.log')
    }

    private getTimestamp(): string {
        return new Date().toLocaleString()
    }

    private formatMessage(type: string, message: string): string {
        return `[${type}]: ${this.getTimestamp()} - ${message}`
    }

    private writeToFile(message: string): void {
        const logDir = path.dirname(this.logFilePath)
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true })
        }
        fs.appendFileSync(this.logFilePath, message + '\n')
    }

    private writeToConsole(message: string, color: string): void {
        console.log(color + message + Colors.Reset)
    }

    private log(type: string, message: string, color: string): void {
        const formattedMessage = this.formatMessage(type, message)

        if (this.mode === LogMode.Console) {
            this.writeToConsole(formattedMessage, color)
        } else if (this.mode === LogMode.File) {
            this.writeToFile(formattedMessage)
        } else if (this.mode === LogMode.Both) {
            this.writeToConsole(formattedMessage, color)
            this.writeToFile(formattedMessage)
        }
    }

    info(message: string): void {
        this.log('INFO', message, Colors.Yellow)
    }

    error(message: string): void {
        this.log('ERROR', message, Colors.Red)
    }

    success(message: string): void {
        this.log('SUCCESS', message, Colors.Green)
    }
}