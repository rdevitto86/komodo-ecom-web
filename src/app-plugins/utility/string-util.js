/**
 * @class StringUtil
 * @description - utility class containing string functions
 */
export default class StringUtil {
    /**
     * @public
     * @static
     * @function StringUtil#truncate
     * @description - truncates a string to a given length
     * @param {String} string - string to truncate
     * @param {Number} maxLength - maximum number of characters
     * @param {Boolean} addElipses - adds optional '...' to end of string
     * @returns {String}
     */
    static truncate(string = undefined, maxLength = -1, addElipses = false) {
        //return current string if processing not needed
        if (typeof string !== 'string' || typeof maxLength !== 'number' || string.length <= maxLength) {
            return string;
        }
        if (typeof addElipses !== 'boolean') {
            addElipses = false;
        }
        return (addElipses === true)
            ? (`${string.slice(0, maxLength - 3)}...`) //with elipses
            : string.slice(0, maxLength); //without elipses
    }

    /**
     * @public
     * @static
     * @function StringUtil#stringify
     * @description - converts any value to a string
     * @param {Any} val - vakue to convert to
     * @returns {String}
     */
    static stringify(val) {
        return String(val);
    }
}
