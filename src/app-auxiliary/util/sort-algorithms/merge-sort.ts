/**
 * @type
 * @description defines allowed data structures
 */
type DataStructure = number[]; // TODO - handle sorting of Maps and strings

/**
 * @class
 * @version 1.0
 * @description implements a merge sort algorithm
 * @complexity
 *  - time: O(n log(n))
 *  - space: O(n)
 */
export default class MergeSort {
    /**
     * @public
     * @static
     * @function MergeSort.sort
     * @description executes a mergesort on a given iterable data structure
     * @param {DataStructure} data data structure to sort
     * @returns {DataStructure | Null}
     * @example
     *  const arr = MergeSort.sort([3,2,5,1,4]);
     *  console.log(arr); // arr = [1,2,3,4,5]
     */
    static sort(data: DataStructure): DataStructure | null {
        // validate unsorted data
        if (!(data instanceof Array)) {
            return null;
        }

        /**
         * @private
         * @function _sort
         * @description helper function that recursively splits and sorts data
         * @param {DataStructure} unsorted data to be sorted
         * @returns {DataStructure} sorted data
         */
        return (function _sort(unsorted: DataStructure): DataStructure {
            // validate data for base case
            if (unsorted.length < 2) {
                return unsorted;
            }

            /**
             * @private
             * @function
             * @alias _merge
             * @description helper function that merges two arrays
             * @param {Any[]} left left sub-array
             * @param {Any[]} right right sub-array
             * @returns {Any[]} sorted sub-array
             */
            return ((left: any[], right: any[]) => {
                const arr = [];

                // loop through sub-arrays until one side is empty
                while (left.length && right.length) {
                    // pick the smaller element of the arrays and to sorted sub-array
                    arr.push((
                        (left[0] < right[0]) ? left : right
                    ).shift());
                }

                // concatenate remaining elements
                return [...arr, ...left, ...right];
            })(_sort(unsorted.splice(0, unsorted.length / 2)), _sort(unsorted)); // _merge entry
        }(data)); // _sort entry
    }
}
