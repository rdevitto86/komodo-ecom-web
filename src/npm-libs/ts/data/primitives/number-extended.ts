// TODO - augment global Number constructor and add these functions

/**
 * Collection of functions that extend JavaScript Numbers
 */
export const NumberExtended = {
    isInteger,
    isFloat,
    toInteger,
    toFloat,
    percentDecimal,
    percentWhole,
    revertPercentage,
    gcd,
    // TODO - least common devisor
    fraction,
    random,
    sum,
    average,
    // TODO - mean
};

/**
 * Checks if a number is a whole integer
 * @param {number | string} val value to check
 * @returns {boolean} true/false
 */
export function isInteger(val: number | string) {
    if (typeof val !== 'number') {
        if (typeof val === 'string') {
            val = Number(val);
        } else {
            return NaN;
        }
    }
    return val % 1 === 0;
}

/**
 * Checks if a number is floating point decimal
 * @param {number | string} val value to check
 * @returns {boolean} true/false
 */
export function isFloat(val: number | string) {
    if (typeof val !== 'number') {
        if (typeof val === 'string') {
            val = Number(val);
        } else {
            return NaN;
        }
    }
    return val % 1 !== 0;
}

/**
 * Converts a float decimal into a whole integer
 * @param {number} d decimal number (float)
 * @returns {number | NaN} whole number (int)
 */
export function toInteger(d: number) {
    if (typeof d !== 'number') {
        return NaN;
    }
    return Math.floor(d * 100);
}

/**
 * Converts a whole integer into a decimal
 * @param {number} w whole number (int)
 * @param {number} [d] number of decimal points. Defaults to 2.
 * @returns {string | number | NaN} demical value (float)
 * @example toFloat(12, 2) => 12.00;
 */
export function toFloat(w: number, d: number = 2) {
    if (typeof w !== 'number' || typeof d !== 'number') {
        return NaN;
    }
    // validate min digits
    if (d < 0) {
        d = 1;
    }
    // validate max digits
    if (d > 20) {
        d = 20;
    }

    return w.toFixed(d);
}

/**
 * Calculates a fractional percentage (as a decimal)
 * @param {number} a denominator
 * @param {number} b numerator
 * @returns {number | NaN} percentage
 * @example percentDecimal(12, 3) => 0.25;
 */
export function percentDecimal(a: number, b: number) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }
    return b / a;
}

/**
 * Calculates a fractional percentage as whole number
 * @param {number} a denominator
 * @param {number} b numerator
 * @returns {number | NaN} percentage
 * @example percentWhole(12, 3) => 25
 */
export function percentWhole(a: number, b: number) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }
    return (b / a) * 100;
}

/**
 * Calculates the original number from a percentage and it's fractional value
 * @param {number} fv fractional value (ex: original * percentage = fractional value)
 * @param {number} p percentage (in decimal notation)
 * @returns {number | NaN} original number
 * @example revertPercentage(5, 0.1) => 50
 */
export function revertPercentage(fv: number, p: number) {
    if (typeof fv !== 'number' || typeof p !== 'number') {
        return NaN;
    }
    return fv / p;
}

/**
 * Calculates the greatest common devisor (GCD)
 * @param {number} a numerator
 * @param {number} b denominator
 * @returns {number} greatest common divisor
 */
export function gcd(a: number, b: number): number {
    // mitigate float precision
    if (b < 0.0000001) {
        return a;
    }
    return gcd(b, Math.floor(a % b));
}

// TODO - add enhanced functionality for repeating decimals 1/3, 2/3, etc.
/**
 * Converts a number into a textual fraction
 * @param {number | string} value number to convert
 * @returns {string | undefined} fractional representation
 * @example fraction(0.25) => '1/4'
 */
export function fraction(value: number | string) {
    switch (typeof value) {
        case 'number':
            // check for whole number
            if (Number.isInteger(value)) {
                return `${value}`;
            }
            break;
        case 'string':
            // check for whole number
            if (Number.parseFloat(value) === Number.parseInt(value, 10)) {
                return value;
            }
            value = Number(Number.parseFloat(value));
            break;
        default:
            // invalid type
            return undefined;
    }

    let denominator = 10 ** (value.toString().length - 2);
    let numerator = value * denominator;

    const divisor = gcd(numerator, denominator);

    numerator /= divisor;
    denominator /= divisor;

    // leftover from mixed fraction
    let wholeRemainder = 0;

    // calculate remainder
    if (numerator > denominator) {
        wholeRemainder = Math.floor(numerator / denominator);
        numerator -= wholeRemainder * denominator;
    }

    // convert to fraction notation
    value = `${Math.floor(numerator)}/${Math.floor(denominator)}`;

    return (wholeRemainder) ? `${wholeRemainder} ${value}` : value;
}

/**
 * Generates a random number between zero and n
 * @param {number} [n] maximum random number. Default is 0 - 9.
 * @returns {number | NaN} random number
 */
export function random(n: number = 9) {
    if (typeof n !== 'number') {
        return NaN;
    }
    return Math.floor(Math.random() * n);
}

/**
 * Calculates the total sum for a given array
 * @param {number[]} arr array of numbers
 * @returns {number | NaN} sum of all array numbers
 * @example sum([2,4,6,8]) => 20
 */
export function sum(arr: number[]) {
    if (arr.constructor !== Array) {
        return NaN;
    }
    return arr.reduce((a, b) => a + b, 0);
}

/**
 * Calculates the average value for a given array
 * @param {number[]} arr array of numbers
 * @returns {number | NaN} sum of all array numbers
 * @example average([4,3,2,2,6,1]) => 3
 */
export function average(arr: number[]) {
    if (arr.constructor !== Array) {
        return NaN;
    }
    return (arr.reduce((a, b) => a + b, 0)) / arr.length;
}
