/**
 * @class
 * @description implements a quick sort algorithm
 * @complexity
 *  - time: best => O(n log(n)), worst => O(n^2)
 *  - space: O(n)
 */
export default class QuickSort {
    /**
     * @public
     * @static
     * @function QuickSort.sort
     * @description executes a quicksort on a given iterable data structure
     * @param {Number[]} data data structure to sort
     * @example
     *  const arr = [3,4,1,2];
     *  QuickSort.sort(arr);
     *  console.log(arr); // arr = [1,2,3,4];
     */
    static sort(unsorted: Number[]) {
        // validate input data
        if (!(unsorted instanceof Array)) {
            return;
        }

        /**
         * @private
         * @function _sort
         * @description helper function that handles recurssion
         * @param {Number[]} sData data to sort
         * @param {Number} sStart starting index
         * @param {Number} sEnd ending index
         */
        (function _sort(sData, sStart, sEnd) {
            // check if pivot is greater/equal to end
            if (sStart >= sEnd) {
                return;
            }

            /**
             * @private
             * @function
             * @alias _partition
             * @description helper function that handles pivot calculation
             * @param {Number[]} pData data to sort
             * @param {Number} pStart starting index
             * @param {Number} pEnd ending index
             */
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

                // re-possition pivot to middle of sub-array
                [pData[pivotIndex], pData[pEnd]] = [pData[pEnd], pData[pivotIndex]];

                return pivotIndex;
            })(sData, sStart, sEnd);

            // execute quickssort of left and right sub-arrays
            _sort(sData, sStart, index - 1); // left
            _sort(sData, index + 1, sEnd); // right
        }(unsorted, 0, unsorted.length - 1)); // _sort entry
    }
}
