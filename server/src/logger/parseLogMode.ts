import { LogMode } from './LogMode'

export function parseLogMode(): LogMode {
    const args = process.argv

    const logToArg = args.find(arg => arg.startsWith('--log-to='))

    if (!logToArg) {
        return LogMode.Console
    }

    const value = logToArg.split('=')[1]

    if (value === LogMode.Console || value === LogMode.File || value === LogMode.Both) {
        return value as LogMode
    }

    return LogMode.Console
}