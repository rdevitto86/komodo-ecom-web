/**
 * Collection of Boolean validation functions
 */
 export const ArrayValidations = {
    isArray,
    isEmptyArray,
    isCharArray,
    isNumberArray,
    is2D,
    is3D,
};

/**
 * Determines if a value is an Array
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isArray(value: any) {
    return value.constructor === Array;
}

/**
 * Determines if a value is an empty Array
 * @param {any} value value to validate
 * @returns {boolean} true/false
 */
export function isEmptyArray(value: any) {
    return value.constructor === Array && value.length === 0;
}

/**
 * Determines if a value is a character array
 * @param {any} arr value to validate
 * @returns {boolean} true/false
 * @example
 *  TypeValidations.isCharArray(['t', 'e', 's', 't']) => true
 */
export function isCharArray(arr: any) {
    if (arr.constructor === Array) {
        for (let i = arr.length; i--;) {
            const val = arr[i];
            if (val.constructor !== String || !(val instanceof String)) {
                return false;
            }
        }
        return true;
    }
    return false;
}

/**
 * Determines if a value is a number array
 * @param {any} arr value to validate
 * @returns {boolean} true/false
 * @example
 *  TypeValidations.isNumberArray([1, 2, 3]) => true
 */
export function isNumberArray(arr: any) {
    if (arr.constructor === Array) {
        for (let i = arr.length; i--;) {
            const val = arr[i];
            if (val.constructor !== Number || Number.isNaN(val)) {
                return false;
            }
        }
        return true;
    }
    return false;
}

/**
 * Determines if an array is two-dimensional (2D)
 * @param {Array<any>} arr array to validate
 * @returns {boolean} true/false
 * @example
 *  TypeValidations.is2D([[1,2], [3,4]]) => true
 */
export function is2D(arr: Array<any>) {
    if (arr.constructor === Array) {
        for (let i = arr.length; i--;) {
            if (arr[i].constructor !== Array) {
                return false;
            }
        }
        return true;
    }
    return false;
}

/**
 * Determines if an array is three-dimensional (3D)
 * @param {Array<any>} arr array to validate
 * @returns {boolean} true/false
 * @example
 *  TypeValidations.is3D([
 *      [[1,2], [3,4]],
 *      [[5,6], [7,8]]
 *  ]) => true
 */
export function is3D(arr: Array<any>) {
    if (arr.constructor === Array) {
        // iterate through 1st level array(s)
        for (let i = arr.length; i--;) {
            const inner = arr[i];

            // verify 2nd level array(s)
            if (inner.constructor !== Array) {
                return false;
            }

            // iterate through 2nd level array(s)
            for (let j = inner.length; j--;) {
                // verify each 3rd level array
                if (inner[j].constructor !== Array) {
                    return false;
                }
            }
        }
        return true;
    }
    return false;
}
