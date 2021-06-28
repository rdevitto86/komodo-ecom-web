/**
 * Implements a merge sort algorithm on a number array
 * @complexity
 *  - time: O(n log(n))
 *  - space: O(n)
 */
 export default function MergeSort(data: number[]) {
    if (!(data instanceof Array)) {
        return null;
    }

    // recursively split input into smaller sub-arrays, sort, and merge
    return (function _sort(unsorted: number[]): number[] {
        // BASE CASE: sub-array has no more splittable elements
        if (unsorted.length < 2) {
            return unsorted;
        }

        // sort and merge sub-arrays
        return ((left, right): any[] => {
            const arr = [];

            // loop through sub-arrays until one side is empty
            while (left.length && right.length) {
                // pick the smaller element of the arrays and to sorted sub-array
                arr.push(
                    ((left[0] < right[0]) ? left : right).shift()
                );
            }

            // concatenate remaining elements
            return [...arr, ...left, ...right];
        })(
            _sort(unsorted.splice(0, unsorted.length / 2)),
            _sort(unsorted)
        );
    }(data)); // _sort entry
}
