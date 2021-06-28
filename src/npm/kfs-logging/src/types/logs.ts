/**
 * Defines all possible log levels
 */
export type LogLevel =
 'VERBOSE' | 'verbose' |
 'FATAL' | 'fatal' |
 'ERROR' | 'error' |
 'WARN' | 'warn' |
 'INFO' | 'info' |
 'DEBUG' | 'debug' |
 'OFF' | 'off'

/**
 * Schema that defines accepted error objects
 */
export interface Exception {
    message: string,
    code?: string,
    httpStatus?: number,
    trace?: string
}

/**
 * Schema for log data objects
 * @extends Exception
 */
export interface Message extends Exception {
    level: LogLevel
}
