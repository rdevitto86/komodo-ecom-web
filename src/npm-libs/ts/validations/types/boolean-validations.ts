/**
 * Collection of Boolean validation functions
 */
export const BooleanValidations = {
    isBoolean,
};

/**
 * Determines if a value is a Boolean
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isBoolean(value: any) {
    return value.constructor === Boolean;
}
