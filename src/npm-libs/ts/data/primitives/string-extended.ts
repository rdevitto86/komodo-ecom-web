// TODO - augment global String constructor and add these functions

/**
 * Collection of functions that extend JavaScript Strings
 */
export const StringExtended = {
    elipses,
    truncate,
    trimAll,
    toPercent,
    toDollars,
};

/**
 * Adds elipses to the a string
 * @param {string} s string to add elipses to
 * @returns {string} string with added elipses
 * @example
 *  elipses('some string') => 'some string...'
 */
export function elipses(s: string) {
    if (typeof s !== 'string') {
        return s;
    }
    return `${s.slice(0, s.length)}...`;
}

/**
 * Truncates a string to a desired length
 * @param {string} s string to add elipses to
 * @param {number} len truncated string length
 * @returns {string} string with added elipses
 * @example
 *  truncate('test string', 4) => 'test'
 */
export function truncate(s: string, len: number) {
    if (typeof s !== 'string') {
        return s;
    }
    if (typeof len !== 'number') {
        len = s.length;
    }
    return s.slice(0, len);
}

/**
 * Removes all whitespace from a string
 * @param {string} s string to trim
 * @returns {string}
 */
export function trimAll(s: string) {
    if (typeof s !== 'string') {
        return s;
    }
    return s.replaceAll(/\s/g, '');
}

/**
 * Converts a number into a dollar amount
 * @param {number | string} s value to format
 * @returns {string} format value to x.xx%
 */
export function toPercent(s: string | number) {
    if (typeof s !== 'string' || typeof s !== 'number') {
        return '';
    }
    const conversion = Number(s);
    return (!Number.isNaN(conversion)) ? `${Number(conversion)}%` : '';
}

/**
 * Converts a number into a dollar format
 * @param {number | string} sum value to format
 * @returns {string} format value to $x.xx
 */
export function toDollars(s: string | number) {
    if (typeof s !== 'string' || typeof s !== 'number') {
        return '';
    }
    const conversion = Number(s).toFixed(2);
    return (!Number.isNaN(conversion)) ? `$${Number(conversion)}` : '';
}
