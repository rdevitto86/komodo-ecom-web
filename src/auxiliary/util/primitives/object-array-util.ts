/**
 * @class
 * @version 1.0
 * @description utility class containing object and array functions
 */
export default class ObjectArrayUtil {
    /**
     * @public
     * @static
     * @function ObjectArrayUtil.deepCopy
     * @description creates a unique (deep) object copy
     * @param {Any} obj object to clone
     * @returns {Any} deep copied object
     * TODO - add check for Map object and use Map.keys()
     * TODO - prevent deep copies of unsupported types
     */
    static deepCopy(obj: any) {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }

        const cloned = obj.constructor();

        Object.keys(obj).forEach((key) => {
            cloned[key] = this.deepCopy(obj[key]);
        });

        return cloned;
    }

    /**
     * @public
     * @static
     * @function ObjectArrayUtil.shallowCopy
     * @description creates a shallow object copy
     * @param {Any} obj object to clone
     * @returns {Any} shallow copied object
     * TODO - add check for Map object
     */
    static shallowCopy(obj: any) {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }
        return (obj instanceof Array) ? [...obj] : { ...obj };
    }

    /**
     * @public
     * @static
     * @function ObjectArrayUtil.countProperties
     * @description counts the number of properties on an object
     * @param {Object | Any[]} obj object to parse
     * @returns {Number} number of object properties
     * TODO - add check for Map object and use Map.keys()
     * TODO - prevent deep copies of unsupported types
     */
    static countProperties(obj: Object | any[]) {
        return (obj.constructor === Object || obj.constructor === Array)
            ? Object.keys(obj).length : 0;
    }

    /**
     * TODO - implement using arr.map() to save on complexity
     * @public
     * @static
     * @function ObjectArrayUtil.sortNumerically
     * @description sorts an array of numbers from smallest to largest
     * @param {Number[]} arr array to sort
     * @returns {Number[]} array sorted by number
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
     */
    static sortNumerically(arr: number[]) {
        if (arr instanceof Array) {
            arr.sort((a, b) => a - b);
        }
    }

    /**
     * TODO - implement using arr.map() to save on complexity
     * @public
     * @static
     * @function ObjectArrayUtil.sortAlphabetically
     * @description sorts an array of strings to alphabetical order
     * @param {String[]} arr array to sort
     * @returns {String[]} alphabetical array
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
     */
    static sortAlphabetically(arr: string[]) {
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
}
