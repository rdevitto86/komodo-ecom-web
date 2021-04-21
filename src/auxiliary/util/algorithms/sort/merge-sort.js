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
     * @param {Number[]} data data structure to sort
     * @returns {Number[] | Null}
     * @example
     *  const arr = MergeSort.sort([3,2,5,1,4]);
     *  console.log(arr); // arr = [1,2,3,4,5]
     */
    static sort(data) {
        // validate unsorted data
        if (!(data instanceof Array)) {
            return null;
        }

        /**
         * @private
         * @function _sort
         * @description helper function that recursively splits and sorts data
         * @param {Number[]} unsorted data to be sorted
         * @returns {Number[]} sorted data
         */
        return (function _sort(unsorted) {
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
            return ((left, right) => {
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
            })(
                // _merge entry
                _sort(unsorted.splice(0, unsorted.length / 2)),
                _sort(unsorted)
            );
        }(data)); // _sort entry
    }
}
