/**
 * Collection of String validation functions
 */
export const StringValidations = {
    isString,
    isEmptyString,
};

/**
 * Determines if a value is a String or String[]
 * @param {any} str value to validate
 * @returns {boolean} true/false
 */
export function isString(str: any) {
    return str.constructor === String || str instanceof String;
}

/**
 * Determines if a value is a empty String
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isEmptyString(value: any) {
    return value === '';
}
