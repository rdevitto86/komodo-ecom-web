/**
 * Implements an insertion sort algorithm
 * @version 1.0.0
 * @complexity
 *  - time: best => O(n), worst => O(n^2)
 *  - space: best => O(1), worst => O(n)
 */
 export default function InsertionSort(data: number[]) {
    // validate input data
    if (!(data instanceof Array)) {
        return;
    }

    // loop through all elements and sort in-place
    for (let i = 1, len = data.length; i < len; i++) {
        const current = data[i];

        // last element of sorted sub-array
        let j = i - 1;

        // loop through sorted side until all values are adjusted
        while ((j > -1) && (current < data[j])) {
            // swap next with current
            data[j + 1] = data[j];
            j--;
        }

        // swap unsorted element with sorted one
        data[j + 1] = current;
    }
}
