/**
 * Collection of String validation functions
 */
 export const ObjectValidations = {
    isObject,
    isEmptyObject,
    isDate,
    isError,
    isSymbol,
    isMap,
    isWeakMap,
};

/**
 * Determines if a value is an Object
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isObject(value: any) {
    return value.constructor === Object;
}

/**
 * Determines if a value is an empty Object
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isEmptyObject(value: any) {
    return value.constructor === Object && Object.keys(value).length;
}

/**
 * Determines if a value is a Date
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isDate(value: any) {
    return value.constructor === Date;
}

/**
 * Determines if a value is an Error
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isError(value: any) {
    return value.constructor === Error;
}

/**
 * Determines if a value is a Symbol
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isSymbol(value: any) {
    return value.constructor === Symbol;
}

/**
 * Determines if a value is a Map
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isMap(value: any) {
    return value.constructor === Map;
}

/**
 * Determines if a value is a WeakMap
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isWeakMap(value: any) {
    return value.constructor === WeakMap;
}
