/**
 * @class
 * @version 1.0
 * @description utility class that extends JavScript Array functions
 */
export default class ArrayExtended {
    /**
     * @public
     * @static
     * @function ArrayExtended.deepCopy
     * @description creates a unique (deep) object copy
     * @param {Any} arr object to clone
     * @returns {Any} deep copied object
     * TODO - add check for Map object and use Map.keys()
     * TODO - prevent deep copies of unsupported types
     */
     static deepCopy(arr: any[]) {
        if (!arr || typeof arr !== 'object') {
            return arr;
        }

        const cloned = arr.constructor();

        Object.keys(arr).forEach((key: any) => {
            cloned[key] = this.deepCopy(arr[key]);
        });
        return cloned;
    }

    /**
     * @public
     * @static
     * @function ArrayExtended.shallowCopy
     * @description creates a shallow object copy
     * @param {Any} arr array to clone
     * @returns {Any} shallow copied object
     * TODO - add check for Map object
     */
    static shallowCopy(arr: any[]) {
        if (!(arr instanceof Array)) {
            return arr;
        }
        return [...arr];
    }

    /**
     * TODO - implement using arr.map() to save on complexity
     * @public
     * @static
     * @function ObjectExtended.sortNumerically
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
     * @function ObjectExtended.sortAlphabetically
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
