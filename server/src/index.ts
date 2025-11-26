import { parseLogMode } from './logger/parseLogMode'
import { createLogger } from './logger/createLogger'

const logMode = parseLogMode()
const logger = createLogger(logMode)

logger.info(`Logger initialized in ${logMode} mode`)

import app from './server'

const PORT = 3000

app.listen(PORT, () => {
    logger.success(`Server running on http://localhost:${PORT}`)
})