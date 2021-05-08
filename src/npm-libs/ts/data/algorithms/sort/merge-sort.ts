/**
 * Implements a merge sort algorithm
 * @version 1.0.0
 * @complexity
 *  - time: O(n log(n))
 *  - space: O(n)
 */
export default class MergeSort {
    /**
     * Executes a mergesort on a given iterable data structure
     * @param {number[]} data data structure to sort
     * @returns {number[] | null}
     */
    static sort(data: number[]) {
        if (!(data instanceof Array)) {
            return null;
        }

        return (function _sort(unsorted: number[]): number[] {
            // validate data for base case
            if (unsorted.length < 2) {
                return unsorted;
            }

            return ((left, right): any[] => {
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
                // merge entry
                _sort(unsorted.splice(0, unsorted.length / 2)),
                _sort(unsorted)
            );
        }(data)); // sort entry
    }
}
