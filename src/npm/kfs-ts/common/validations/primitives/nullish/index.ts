/**
 * Collection of null and undefined validation functions
 */
 export const NullishValidations = {
    isNull,
    isUndefined,
    isNullish,
    isFalsy,
};

/**
 * Determines if a value is null
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isNull(value: any) {
    return value === null;
}

/**
 * Determines if a value is undefined
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isUndefined(value: any) {
    return value === undefined;
}

/**
 * Determines if a value is null or undefined
 * @param {any} value value(s) to check
 * @returns {boolean} true/false
 */
export function isNullish(value: any) {
    return value === null || value === undefined;
}

/**
 * Determines if a value is null, undefined, false, or empty
 * @param {any} value value(s) to check
 * @returns {boolean} true/false
 */
export function isFalsy(value: any) {
    return !value;
}
