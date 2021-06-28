// TODO - augment global Object constructor and add these functions

/**
 * Collection of functions that extend JavaScript Objects
 */
 export const ObjectExtended = {
    deepCopy,
    shallowCopy,
    merge,
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

/**
 * Merges two object into a single, unified object
 * @param {Object} target object to merge into
 * @param {Object} source object to append
 * @returns {Object | undefined} merged object
 */
export function merge(target: Object, source: Object) {
    if (!target || target.constructor !== Object) {
        return undefined;
    }
    return Object.assign(target, source);
}
