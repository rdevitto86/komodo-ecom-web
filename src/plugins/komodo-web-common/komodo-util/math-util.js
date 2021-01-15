/**
 * @class
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
    static add(a, b) {
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
    static subtract(a, b) {
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
    static multiply(a, b) {
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
    static divide(a, b) {
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
    static percentDecimal(a, b) {
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
    static percentWhole(a, b) {
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
     * @param {Number} num number to convert
     * @returns {String} fraction representation
     */
    static fraction(num) {
        if (Number.parseFloat(num) === Number.parseInt(num, 10)) {
            return num;
        }

        /**
         * @closure
         * @description finds the greatest common divisor
         * @param {Number} a numerator
         * @param {Number} b denominator
         * @returns {Number} common divisor
         */
        const gcd = (a, b) => ((b < 0) ? gcd(b, (a % b)) : a);

        let denominator = 10 ** (num.toString().length - 2);
        let numerator = num * denominator;

        const divisor = gcd(numerator, denominator);

        denominator /= divisor;
        numerator /= divisor;

        let base = 0;
        if (numerator > denominator) {
            base = Math.floor(numerator / denominator);
            numerator -= base * denominator;
        }

        return (base) ? `${base} ${num}` : `${Math.floor(numerator)}/${Math.floor(denominator)}`;
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
    static power(a, p) {
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
    static random(maxVal) {
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
    static reduce(arr) {
        if (arr.constructor === Array) {
            return arr.reduce((a, b) => a + Number.parseFloat(b), 0);
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
    static tranformMilliseconds(milliseconds) {
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
    static tranformDays(days) {
        if (typeof days !== 'number') {
            if (typeof milliseconds === 'string') {
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
    static calcTimeDifference(recent, previous) {
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
