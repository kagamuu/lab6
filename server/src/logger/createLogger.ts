import { Logger } from './Logger'
import { LogMode } from './LogMode'
import { parseLogMode } from './parseLogMode'

let loggerInstance: Logger | null = null

export function createLogger(mode: LogMode): Logger {
    if (!loggerInstance) {
        loggerInstance = new Logger(mode)
    }
    return loggerInstance
}

export function getLogger(): Logger {
    if (!loggerInstance) {
        const mode = parseLogMode()
        loggerInstance = new Logger(mode)
    }
    return loggerInstance
}