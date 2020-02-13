/**
 * @class StringUtil
 * @description - utility class containing string functions
 */
export class StringUtil {
    

    /**
     * @function StringUtil#formatAddress
     * @description - builds a singe-line address string
     * @param {String} adressLine1 - primary address
     * @param {String} addressLine2 - secondary address (apt/suite/etc.)
     * @param {String} city - city name
     * @param {String} territory - state/province/etc.
     * @param {String} mailingCode - mailing code (zip)
     * @param {String} country - country of residence
     * @returns {String} -- Example: One Apple Park Way, Cupertino, CA 95014 United States
     */
    formatAddress(
        adressLine1 = undefined, 
        addressLine2 = undefined, 
        city = undefined, 
        territory = undefined, 
        mailingCode = undefined, 
        country = undefined
    ) {
        return (
            adressLine1 
                + ((addressLine2 !== undefined) ? (' ' + addressLine2) : '')
                + (', ' + city)
                + (', ' + territory)
                + (' ' + mailingCode)
                + ((country !== undefined) ? (' ' + country) : '')
        );
    }
}