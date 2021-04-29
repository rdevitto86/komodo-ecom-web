/**
 * @class
 * @version 1.0
 * @description utility class that extends JavScript Number functions
 */
export default class NumberExtended {
    /**
     * @public
     * @static
     * @function NumberExtended.toWholeNumber
     * @description converts a decimal into a whole number
     * @param {Number} d decimal number (float)
     * @returns {Number | NaN} whole number (int)
     */
    static toWholeNumber(d: number) {
        if (typeof d !== 'number') {
            return NaN;
        }
        return Math.floor(d * 100);
    }

    /**
     * @public
     * @static
     * @function NumberExtended.toDecimal
     * @description converts a decimal into a decimal
     * @param {Number} w whole number (int)
     * @returns {Number | NaN} demical value (float)
     */
    static toDecimal(w: number) {
        if (typeof w !== 'number') {
            return NaN;
        }
        return w.toFixed(2);
    }

    /**
     * @public
     * @static
     * @function NumberExtended.percentDecimal
     * @description calculates a fractional percentage as decimal (ex. 0.2%)
     * @param {Number} a denominator
     * @param {Number} b numerator
     * @returns {Number | NaN} percentage
     */
    static percentDecimal(a: number, b: number) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            return NaN;
        }
        return b / a;
    }

    /**
     * @public
     * @static
     * @function NumberExtended.percentWhole
     * @description calculates a fractional percentage as whole number (ex. 20%)
     * @param {Number} a denominator
     * @param {Number} b numerator
     * @returns {Number | NaN} percentage
     */
    static percentWhole(a: number, b: number) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            return NaN;
        }
        return (b / a) * 100;
    }

    /**
     * @public
     * @static
     * @function NumberExtended.revertPercentage
     * @description calculates the original number from a percentage and it's fractional value
     * @param {Number} fv fractional value (ex: original * percentage = fractional value)
     * @param {Number} p percentage (in decimal notation)
     * @returns {Number | NaN} original number
     * @example
     * let og = 145.56, fv = 4.36, p = 0.03
     * revertPercentage(fv, p) => 145.56
     */
    static revertPercentage(fv: number, p: number) {
        if (typeof fv !== 'number' || typeof p !== 'number') {
            return NaN;
        }
        return fv / p;
    }

    /**
     * @public
     * @function NumberExtended.gcd
     * @description calculates the greatest common devisor
     * @param {Number} a numerator
     * @param {Number} b denominator
     * @returns {Number} greatest common divisor
     */
    static gcd(a: number, b: number): number {
        // mitigate float precision
        if (b < 0.0000001) {
            return a;
        }
        return this.gcd(b, Math.floor(a % b));
    }

    /**
     * @public
     * @static
     * @function NumberExtended.fraction
     * @description converts a number into a fraction
     * @param {Number | String} value number to convert
     * @returns {String | Undefined} fractional representation
     * TODO - add enhanced functionality for repeating decimals 1/3, 2/3, etc.
     */
    static fraction(value: number | string) {
        // validate input for type and whole numbers
        switch (typeof value) {
            case 'number':
                if (Number.isInteger(value)) {
                    return `${value}`;
                }
                break;
            case 'string':
                if (Number.parseFloat(value) === Number.parseInt(value, 10)) {
                    return value;
                }
                value = Number.parseFloat(value);
                break;
            default:
                // invalid type
                return undefined;
        }

        // bottom of fraction
        let denominator = 10 ** (value.toString().length - 2);

        // top of fraction
        let numerator = value * denominator;

        const divisor = this.gcd(numerator, denominator);

        numerator /= divisor;
        denominator /= divisor;

        // leftover from mixed fraction
        let wholeRemainder = 0;

        // check for mixed fraction and calculate remainder
        if (numerator > denominator) {
            wholeRemainder = Math.floor(numerator / denominator);
            numerator -= wholeRemainder * denominator;
        }

        // convert to fraction notation
        value = `${Math.floor(numerator)}/${Math.floor(denominator)}`;

        return (wholeRemainder) ? `${wholeRemainder} ${value}` : value;
    }

    /**
     * @public
     * @static
     * @function NumberExtended.random
     * @description generates a random number
     * @param {Number} [maxVal] maximum random number. Default is 0 - 9.
     * @returns {Number | NaN} random number
     */
    static random(maxVal: number = 9) {
        if (typeof maxVal !== 'number') {
            return NaN;
        }
        return Math.floor(Math.random() * maxVal);
    }

    /**
     * @public
     * @static
     * @function NumberExtended.sum
     * @description calculates the total sum for a given array
     * @param {Number[]} arr array of numbers
     * @returns {Number | NaN} sum of all array numbers
     */
    static sum(arr: number[]) {
        if (arr.constructor !== Array) {
            return NaN;
        }
        return arr.reduce((a, b) => a + b, 0);
    }

    /**
     * @public
     * @static
     * @function NumberExtended.average
     * @description calculates the average value for a given array
     * @param {Number[]} arr array of numbers
     * @returns {Number | NaN} sum of all array numbers
     */
    static average(arr: number[]) {
        if (arr.constructor !== Array) {
            return NaN;
        }
        return (arr.reduce((a, b) => a + b, 0)) / arr.length;
    }
}
