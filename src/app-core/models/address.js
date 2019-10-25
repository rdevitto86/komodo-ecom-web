import Helpers from '../common/util/helpers';

/**
 * @class
 * @description - defines a new Address object
 */
export class Address {
    /**
     * @constructor
     * @param {string} line1 - address line 1 [MANDATORY]
     * @param {string} line1 - address line 1 [MANDATORY]
     * @param {string} line2 - address line 2 [OPTIONAL]
     * @param {string} city - city/town [MANDATORY]
     * @param {string} state - state/region/province [MANDATORY]
     * @param {string} county - state county/district [OPTIONAL]
     * @param {string} zip - postal code [MANDATORY]
     * @param {string} country - country [MANDATORY]
     */
    constructor(type, line1, line2, city, state, county, zip, country) {
        //validate mandatory fields
        if(typeof line1 !== 'string' || line1 === '' || typeof city !== 'string' || city === '' 
        || typeof state !== 'string' || state === '' || typeof country !== 'string' || country === '' 
        || typeof zip !== 'string' || zip === '') {
            return null;
        }

        const STANDARD_TYPES = {
            'GENERIC': 0,
            'SHIPPING': 1,
            'BILLING': 2
        }

        //set address type (i.e shipping, billing, etc)
        this.type = (typeof type === 'string' && STANDARD_TYPES[type]) ? type : 0;

        //set address details
        this.line1 = line1;
        this.line2 = (typeof line2 === 'string') ? line2 : null;
        this.city = city;
        this.state = state;
        this.county = (typeof county === 'string') ? county : null;
        this.zip = zip;
        this.country = country;

        //build a formatted address string
        this.addressFormatted = (new Helpers).formatAddress(this);
    }
}