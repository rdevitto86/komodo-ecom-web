// TODO - augment global Object constructor and add these functions

/**
 * Collection of functions that extend JavaScript Objects
 */
export const ObjectExtended = {
    deepCopy,
    shallowCopy,
};

// TODO - prevent deep copies of unsupported types
// TODO - add check for Map object and use Map.keys()
/**
 * Creates a unique object clone
 * @param {any} obj object to clone
 * @returns {any} deep copied object
 */
export function deepCopy(obj: any) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }

    const cloned = obj.constructor();
    const keys = Object.keys(obj);

    for (let i = keys.length; i--;) {
        const key = keys[i];
        cloned[key] = deepCopy(obj[key]);
    }
    return cloned;
}

// TODO - add check for Map object
/**
 * Creates a shallow, non-unique object clone
 * @param {any} obj object to clone
 * @returns {any} shallow copied object
 */
export function shallowCopy(obj: any) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    return { ...obj };
}
