/**
 * Collection of Function validations
 */
 export const FunctionValidations = {
    isFunction,
    isAnonymous,
    hasArgs,
};

/**
 * Determines if a value is a Function
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isFunction(value: any) {
    return value.constructor === Function;
}

/**
 * Determines if a function is anonymous or named
 * @param {Function} func function to validate
 * @returns {boolean} true/false
 */
export function isAnonymous(func: Function) {
    if (typeof func !== 'function') {
        return false;
    }
    return func.name !== '';
}

/**
 * Determines if a function has parameters
 * @param {Function} func function to validate
 * @returns {boolean} true/false
 */
export function hasArgs(func: Function) {
    if (typeof func !== 'function') {
        return false;
    }
    return !!func.length;
}
