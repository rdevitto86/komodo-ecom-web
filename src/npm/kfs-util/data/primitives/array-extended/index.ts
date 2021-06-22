// TODO - augment global Array constructor and add these functions

/**
 * Collection of functions that extend JavaScript Arrays
 */
 export const ArrayExtended = {
    deepCopy,
    shallowCopy,
    sortNumerically,
    sortAlphabetically,
};

// TODO - add check for Map object and use Map.keys()
// TODO - prevent deep copies of unsupported types
/**
 * Creates a unique array clone
 * @param {any} arr object to clone
 * @returns {any} deep copied object
 */
export function deepCopy(arr: any[]) {
    if (!(arr instanceof Array)) {
        return arr;
    }

    const cloned = arr.constructor();

    for (let i = arr.length; i--;) {
        const key = arr[i];
        cloned[key] = deepCopy(arr[key]);
    }
    return cloned;
}

// TODO - add check for Map object
/**
 * Creates a shallow, non-unique array clone
 * @param {any} arr array to clone
 * @returns {any} shallow copied object
 */
export function shallowCopy(arr: any[]) {
    if (!(arr instanceof Array)) {
        return arr;
    }
    return [...arr];
}

/**
 * Sorts an array of numbers from smallest to largest
 * @param {number[]} arr array to sort
 * @returns {number[]} array sorted by number
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 */
export function sortNumerically(arr: number[]) {
    if (arr instanceof Array) {
        arr.sort((a, b) => a - b);
    }
}

/**
 * Sorts an array of strings to alphabetical order
 * @param {string[]} arr array to sort
 * @returns {string[]} alphabetical array
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 */
export function sortAlphabetically(arr: string[]) {
    if (arr instanceof Array) {
        arr.sort((a, b) => {
            const stringA = a.toUpperCase();
            const stringB = b.toUpperCase();

            if (stringA < stringB) {
                return -1;
            }
            if (stringA > stringB) {
                return 1;
            }
            return 0;
        });
    }
}
