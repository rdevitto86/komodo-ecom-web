/**
 * @class
 * @version 1.0
 * @description collection of utlity functions that assists with mathmatical operations
 */
export default class MathUtil {
    /**
     * @public
     * @static
     * @function MathUtil#add
     * @description adds two numbers
     * @param {Number} a value 1
     * @param {Number} b value 2
     * @returns {Number} result
     */
    static add(a: number, b: number) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            return undefined;
        }
        return a + b;
    }

    /**
     * @public
     * @static
     * @function MathUtil#subtract
     * @description subtracts two numbers
     * @param {Number} a value 1
     * @param {Number} b value 2
     * @returns {Number} result
     */
    static subtract(a: number, b: number) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            return undefined;
        }
        return a - b;
    }

    /**
     * @public
     * @static
     * @function MathUtil#multiply
     * @description multiplies two numbers
     * @param {Number} a value 1
     * @param {Number} b value 2
     * @returns {Number} result
     */
    static multiply(a: number, b: number) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            return undefined;
        }
        return a * b;
    }

    /**
     * @public
     * @static
     * @function MathUtil#divide
     * @description divides two numbers
     * @param {Number} a numerator
     * @param {Number} b denominator
     * @returns {Number} result
     */
    static divide(a: number, b: number) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            return undefined;
        }
        return a / b;
    }

    /**
     * @public
     * @static
     * @function MathUtil#percentDecimal
     * @description calculates a fractional percentage as decimal (ex. 0.2%)
     * @param {Number} a denominator
     * @param {Number} b numerator
     * @returns {Number} percentage
     */
    static percentDecimal(a: number, b: number) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            return undefined;
        }
        return b / a;
    }

    /**
     * @public
     * @static
     * @function MathUtil#percentWhole
     * @description calculates a fractional percentage as whole number (ex. 20%)
     * @param {Number} a denominator
     * @param {Number} b numerator
     * @returns {Number} percentage
     */
    static percentWhole(a: number, b: number) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            return undefined;
        }
        return (b / a) * 100;
    }

    /**
     * @public
     * @static
     * @function MathUtil#fraction
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

        /**
         * @private
         * @function gcd
         * @description calculates the greatest common devisor
         * @param {Number} a numerator
         * @param {Number} b denominator
         * @returns {Number} greatest common divisor
         */
        const gcd = (a: number, b: number): any => (
            // handle float precision and calculate gcd
            (b < 0.0000001) ? a : gcd(b, Math.floor(a % b))
        );

        // bottom of fraction
        let denominator = 10 ** (value.toString().length - 2);

        // top of fraction
        let numerator = value * denominator;

        const divisor = gcd(numerator, denominator);

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
     * @function MathUtil#power
     * @description calculates an eponential power for a given number
     * @param {Number} a value to eponentiate
     * @param {Number} p power of value
     * @returns {Number} eponentiated number
     */
    static power(a: number, p: number) {
        if (typeof a !== 'number' || typeof p !== 'number') {
            return a;
        }
        return a ** p;
    }

    /**
     * @public
     * @static
     * @function MathUtil#random
     * @description generates a random number
     * @param {Number} maxVal maximum random number. Default is 0 - 9.
     * @returns {Number} random number
     */
    static random(maxVal: number) {
        if (typeof maxVal !== 'number' || maxVal < 1) {
            maxVal = 9;
        }
        return Math.floor(Math.random() * maxVal);
    }

    /**
     * @public
     * @static
     * @function MathUtil#reduce
     * @description reduces an array of numbers into a total sum
     * @param {Array<Number>} arr array of numbers
     * @returns {Number | undefined} sum of all array numbers
     */
    static reduce(arr: Array<number>) {
        if (arr.constructor === Array) {
            return arr.reduce((a, b) => a + b, 0);
        }
        return undefined;
    }

    /**
     * @public
     * @static
     * @function MathUtil#nformMilliseconds
     * @description converts milliseconds into various higher time measurements
     * such as: seconds, hours, minutes, hours, days, and weeks.
     * @param {Number | String} milliseconds number of milliseconds
     * @returns {Object} calculated time units
     */
    static tranformMilliseconds(milliseconds: number | string) {
        if (typeof milliseconds !== 'number') {
            if (typeof milliseconds === 'string') {
                milliseconds = Number.parseFloat(milliseconds);
            } else {
                return {};
            }
        }

        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        // TODO - years

        return {
            milliseconds,
            seconds,
            minutes,
            hours,
            days,
            weeks,
            // years
        };
    }

    /**
     * @public
     * @static
     * @function MathUtil#tranformDays
     * @description converts days into various time measurements
     * such as: milliseconds, seconds, hours, minutes, hours, and weeks.
     * @param {Number | String} days number of days
     * @returns {Object} calculated time units
     */
    static tranformDays(days: number | string) {
        if (typeof days !== 'number') {
            if (typeof days === 'string') {
                days = Number.parseFloat(days);
            } else {
                return {};
            }
        }

        const milliseconds = Math.floor(days * this.DAY_IN_MS);
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const weeks = Math.floor(days / 7);
        // TODO - years

        return {
            milliseconds,
            seconds,
            minutes,
            hours,
            days,
            weeks,
            // years
        };
    }

    /**
     * @public
     * @static
     * @function MathUtil#calcTimeDifference
     * @description calculates the time difference between two dates
     * @param {Date} recent most recent date
     * @param {Date} previous past date
     * @returns {Object} difference between dates
     */
    static calcTimeDifference(recent: Date, previous: Date) {
        if (!(recent instanceof Date) || !(previous instanceof Date)) {
            return {};
        }

        const milliseconds = recent.getTime() - previous.getTime();
        const years = recent.getFullYear() - previous.getFullYear();

        // TODO - check this math
        const months = Math.floor(
            (years * 12) + (recent.getMonth() - previous.getMonth())
        );

        // ms, sec, min, hr, day, week, month,
        return {
            ...this.tranformMilliseconds(milliseconds),
            months: (months > 0) ? months : 0,
            years: (years > 0) ? years : 0
        };
    }

    /**
     * @public
     * @static
     * @property MINUTE_IN_MS
     * @description gets the number of milliseconds in 1min
     * @returns {Number}
     */
    static get MINUTE_IN_MS() {
        return 60000;
    }

    /**
     * @public
     * @static
     * @property MINUTE_IN_MS
     * @description gets the number of milliseconds in 1hr
     * @returns {Number}
     */
    static get HOUR_IN_MS() {
        return 3600000;
    }

    /**
     * @public
     * @static
     * @property DAY_IN_MS
     * @description gets the number of milliseconds in a day
     * @returns {Number}
     */
    static get DAY_IN_MS() {
        return 86400000;
    }

    /**
     * @public
     * @static
     * @property MINUTE_IN_MS
     * @description gets the number of milliseconds in 1 week
     * @returns {Number}
     */
    static get WEEK_IN_MS() {
        return 604800000;
    }

    /**
     * @public
     * @static
     * @property MINUTE_IN_MS
     * @description gets the number of milliseconds in 1 month
     * @returns {Number}
     */
    static get MONTH_IN_MS() {
        return 2419200000;
    }
}
