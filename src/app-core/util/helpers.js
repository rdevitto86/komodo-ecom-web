/**
 * @class
 * @description - a collection of helper functions used throughout the app
 */
export class Helpers {
    /**
     * @constructor
     */
    constructor() {

    }

    /**
     * @function Util#getCurrentTimeInMS
     * @description - returns the current date in milliseconds
     * @returns {number}
     */
    getCurrentTimeInMS() {
        return Date.now();
    }

    /**
     * @function Util#getCurrentTimeUTC
     * @description - returns the current UTC date 
     * @returns {string}
     */
    getCurrentTimeUTC() {
        return (new Date).toUTCString();
    }

    /**
     * @function Helpers#formatAddress
     * @description - builds a singe-line address string
     * @param {Address} address - address details
     * @param {boolean} international - flag that determines if the country string is added
     * @returns {string} -- Example: One Apple Park Way, Cupertino, CA 95014
     */
    formatAddress(address = null, international = false) {
        try {
            return (address instanceof Address) 
                ? (address.line1).concat((address.line2) ? (' ' + address.line2) : '') //add second address line (if available)
                    .concat(', ' + address.city) //add city
                    .concat(', ' + address.state) //add state
                    .concat(' ' + address.zip) //add zip
                    .concat((international) ? (' ' + address.country) : '') //add country (if applicable)
                : null;
        } catch(error) {
            return null;
        }
    }
}