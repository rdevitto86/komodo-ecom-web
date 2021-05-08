/**
 * Collection of String validation functions
 */
export const NumberValidations = {
    isNumber,
    isInt,
    isFloat,
    isBigInt,
    isInfinity,
};

/**
 * Determines if a value is a Number
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isNumber(value: any) {
    return Number.isFinite(value);
}

/**
 * Determines if a value is an Integer
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isInt(value: any) {
    return Number.isInteger(value);
}

/**
 * Determines if a value is a Float (decimal)
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isFloat(value: any) {
    return !Number.isInteger(value);
}

/**
 * Determines if a value is a BigInt
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isBigInt(value: any) {
    return value.constructor === BigInt;
}

/**
 * Determines if a value is infinite
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isInfinity(value: any) {
    return value === Infinity;
}
