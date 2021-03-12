/**
 * @class
 * @version 1.0
 * @description utility class containing string functions
 */
export default class StringUtil {
    /**
     * @public
     * @static
     * @function StringUtil#truncate
     * @description truncates a string to a given length
     * @param {String} value string to truncate
     * @param {Number} maxLength maximum number of characters
     * @param {Boolean} [addElipses] adds optional '...' to end of string
     * @returns {String} shortened value with/without added ...
     */
    static truncate(value: string, maxLength: number, addElipses: boolean = false) {
        // return current param if not string
        if (typeof value !== 'string' || typeof maxLength !== 'number' || value.length <= maxLength) {
            return value;
        }
        return (addElipses === true)
            ? `${value.slice(0, maxLength - 3)}...` // with elipses
            : value.slice(0, maxLength); // without elipses
    }

    /**
     * @public
     * @static
     * @function StringUtil#addElipses
     * @description adds elipses (...) to the current string
     * @param {String} value string to add elipses to
     * @returns {String} value with added ...
     */
    static addElipses(value: string) {
        return (typeof value === 'string') ? `${value.slice(0, value.length)}...` : value;
    }

    /**
     * @public
     * @static
     * @function StringUtil#stringify
     * @description converts any value to a string
     * @param {Any} value value to convert to String
     * @returns {String} string of passed value
     */
    static stringify(value: string) {
        return JSON.stringify(value);
    }

    /**
     * @public
     * @static
     * @function StringUtil#trimAllWhitespace
     * @description removes leading and trailing whitespace
     * @param {String} value string to trim
     * @returns {String}
     */
    static trimWhitespace(value: string) {
        return value.trim();
    }

    /**
     * @public
     * @static
     * @function StringUtil#trimAllWhitespace
     * @description removes all whitespace from a string
     * @param {String} value string to trim
     * @returns {String}
     */
    static removeWhitespace(value: string) {
        return value.replaceAll(/\s/g, '');
    }

    /**
     * @public
     * @static
     * @function StringUtil#formatToDollars
     * @description converts a number into a dollar amount
     * @param {Number | String} sum value to format
     * @returns {String} format value to $xx.xx
     */
    static toDollars(sum: number | string) {
        const paramType = typeof sum;
        return (paramType === 'number' || paramType === 'string')
            ? `$${Number(sum).toFixed(2)}` : '$0.00';
    }
}
