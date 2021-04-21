/**
 * @class
 * @version 1.0
 * @description utility class that extends JavScript Array functions
 */
export default class ArrayExtended {
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
    static sortNumerically(arr) {
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
    static sortAlphabetically(arr) {
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
