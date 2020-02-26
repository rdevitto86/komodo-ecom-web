/**
 * @class StringUtil
 * @description - utility class containing string functions
 */
export class StringUtil {
    /**
     * @public
     * @function StringUtil#truncateString
     * @description - truncates a string to a given length
     * @param {String} string - string to truncate
     * @param {Number} maxLength - maximum number of characters
     * @param {Boolean} addElipses - adds optional '...' to end of string
     * @returns {String}
     */
    truncateString(string = undefined, maxLength = -1, addElipses = false) {
        //ABC 3
        if(typeof string !== 'string' || typeof maxLength !== 'number' || string.length <= maxLength) {
            return string;
        }
        if(typeof addElipses !== 'boolean') {
            addElipses = false;
        }
        return (addElipses === true)
            ? (string.substring(0, maxLength - 3) + '...') //with elipses
            : string.substring(0, maxLength); //without elipses
    };
}