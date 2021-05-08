import { LogLevels } from '..';

/**
 * Schema that defines accepted error objects
 */
export interface RuntimeException {
    message: string,
    code?: string,
    httpStatus?: number,
    trace?: string
}

/**
 * Schema for log data objects
 * @extends RuntimeException
 */
export interface LogData extends RuntimeException {
    level: LogLevels
}
