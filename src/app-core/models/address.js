import Helpers from '../common/util';

export class Address {
    /**
     * @constructor
     * @param {string} line1 - address line 1 [MANDATORY]
     * @param {string} line2 - address line 2 [OPTIONAL]
     * @param {string} city - city/town [MANDATORY]
     * @param {string} state - state/region/province [MANDATORY]
     * @param {string} county - state county/district [OPTIONAL]
     * @param {string} zip - postal code [MANDATORY]
     * @param {string} country - country [MANDATORY]
     */
    constructor(line1, line2, city, state, county, zip, country) {
        //validate mandatory fields
        if(typeof line1 !== 'string' || line1 === '' 
        || typeof city !== 'string' || city === '' 
        || typeof state !== 'string' || state === ''
        || typeof country !== 'string' || country === '' 
        || typeof zip !== 'string' || zip === '') {
            return null;
        }
        //set address details
        this.line1 = line1;
        this.line2 = (typeof line2 === 'string') ? line2 : null;
        this.city = city;
        this.state = state;
        this.county = (typeof county === 'string') ? county : null;
        this.zip = zip;
        this.country = country;
        this.addressFormatted = Helpers.formatAddress(this);
    }
}