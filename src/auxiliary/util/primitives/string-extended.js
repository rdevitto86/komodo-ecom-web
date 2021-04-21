/**
 * @class
 * @version 1.0
 * @description utility class that extends JavScript String functions
 */
export default class StringExtended {
    /**
     * @public
     * @static
     * @function StringExtended.elipses
     * @description adds elipses (...) to the current string
     * @param {String} s string to add elipses to
     * @returns {String} value with added ...
     */
    static elipses(s) {
        if (typeof s !== 'string') {
            return s;
        }
        return `${s.slice(0, s.length)}...`;
    }

    /**
     * @public
     * @static
     * @function StringExtended.trimAll
     * @description removes all whitespace from a string
     * @param {String} s string to trim
     * @returns {String}
     */
    static trimAll(s) {
        if (typeof s !== 'string') {
            return s;
        }
        return s.replaceAll(/\s/g, '');
    }

    /**
     * @public
     * @static
     * @function StringExtended.toPercent
     * @description converts a number into a dollar amount
     * @param {Number | String} s value to format
     * @returns {String} format value to x.xx%
     */
     static toPercent(s) {
        if (typeof s !== 'string' || typeof s !== 'number') {
            return '';
        }
        const conversion = Number(s);
        return (!Number.isNaN(conversion)) ? `${Number(conversion)}%` : '';
    }

    /**
     * @public
     * @static
     * @function StringExtended.toDollars
     * @description converts a number into a dollar amount
     * @param {Number | String} sum value to format
     * @returns {String} format value to $x.xx
     */
    static toDollars(s) {
        if (typeof s !== 'string' || typeof s !== 'number') {
            return '';
        }
        const conversion = Number(s).toFixed(2);
        return (!Number.isNaN(conversion)) ? `$${Number(conversion)}` : '';
    }
}
