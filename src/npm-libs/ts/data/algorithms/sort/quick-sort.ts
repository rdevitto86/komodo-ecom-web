/**
 * Implements a quick sort algorithm
 * @version 1.0.0
 * @complexity
 *  - time: best => O(n log(n)), worst => O(n^2)
 *  - space: O(n)
 */
export default class QuickSort {
    /**
     * Executes a quicksort on a given iterable data structure
     * @param {number[]} data data structure to sort
     */
    static sort(unsorted: number[]) {
        // validate input data
        if (!(unsorted instanceof Array)) {
            return;
        }

        (function _sort(sData, sStart, sEnd) {
            // check if pivot is greater/equal to end
            if (sStart >= sEnd) {
                return;
            }

            // calculate new pivot
            const index = ((pData, pStart, pEnd) => {
                const pivotValue = pData[pEnd];
                let pivotIndex = pStart;

                // loop through remaining array elements and swap greater/lesser values
                for (let i = pStart; i < pEnd; i++) {
                    // swap element less than pivot
                    if (pData[i] < pivotValue) {
                        // swap memeory references of array elements
                        [pData[i], pData[pivotIndex]] = [pData[pivotIndex], pData[i]];
                        pivotIndex++;
                    }
                }

                // re-position pivot to middle of sub-array
                [pData[pivotIndex], pData[pEnd]] = [pData[pEnd], pData[pivotIndex]];
                return pivotIndex;
            })(sData, sStart, sEnd);

            // execute quicksort of left and right sub-arrays
            _sort(sData, sStart, index - 1); // left
            _sort(sData, index + 1, sEnd); // right
        }(unsorted, 0, unsorted.length - 1)); // sort entry
    }
}
