export * from './clientside';
export * from './serverside';

type Priorities = {[key:string]: number};
type Titles = {[key:number]: string};

export type LogLevels = 
    'VERBOSE' | 'verbose' |
    'FATAL' | 'fatal' |
    'ERROR' | 'error' |
    'WARN' | 'warn' |
    'INFO' | 'info' |
    'DEBUG' | 'debug' |
    'OFF' | 'off'; 

/**
 * Maps log title to priorities
 * @readonly
 */
export const LogPriorities: Priorities = Object.freeze({
    VERBOSE: 6,
    FATAL: 5,
    ERROR: 4,
    WARN: 3,
    INFO: 2,
    DEBUG: 1,
    OFF: 0,
});

/**
 * Maps log priorities to title
 * @readonly
 */
export const LogTitles: Titles = Object.freeze({
    6: 'VERBOSE',
    5: 'FATAL',
    4: 'ERROR',
    3: 'WARN',
    2: 'INFO',
    1: 'DEBUG',
    0: 'OFF',
});

/**
 * Fetches log priority for a given level
 * @param {string} level log level title
 * @returns {number} priority
 */
export const getPriority = (level: string) => LogPriorities[level];

/**
 * Fetches log title for a given priority
 * @param {string} priority log priority
 * @returns {string} log level
 */
export const getTitle = (priority: number) => LogTitles[priority];
