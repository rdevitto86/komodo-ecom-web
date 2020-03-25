import ValidationUtil from '../../app-plugins/utility/validation-util';

/**
 * @class Address
 * @description - defines a new Address object
 */
export default class Address {
    /**
     * @constructor
     * @param {Object} details - object containing address details
     */
    constructor(details = undefined) {
        if (!ValidationUtil.isObject(details)) {
            return this;
        }

        const {
            line1, line2, city, region, subRegion, mailingCode, country
        } = details;

        this.line1 = line1 || '';
        this.line2 = line2 || '';
        this.city = city || '';
        this.region = region || '';
        this.subRegion = subRegion || '';
        this.mailingCode = mailingCode || '';
        this.country = country || '';
    }

    /**
     * @public
     * @property line1
     * @description - gets the primary street address
     * @returns {String}
     */
    get line1() {
        return this._line1 || '';
    }

    /**
     * @public
     * @property line1
     * @description - sets the primary street address
     * @param {String} line1
     */
    set line1(line1 = undefined) {
        if (ValidationUtil.isString(line1)) {
            this._line1 = line1;
        }
    }

    /**
     * @public
     * @property line2v
     * @description - gets the secondary street address (apartment, floor, etc.)
     * @returns {String}
     */
    get line2() {
        return this._line2 || '';
    }

    /**
     * @public
     * @property line2
     * @description - sets the secondary street address (apartment, floor, etc.)
     * @param {String} line2
     */
    set line2(line2 = undefined) {
        if (ValidationUtil.isString(line2)) {
            this._line1 = line2;
        }
    }

    /**
     * @public
     * @property city
     * @description - gets the city
     * @returns {String}
     */
    get city() {
        return this._city || '';
    }

    /**
     * @public
     * @property city
     * @description - sets the city
     * @param {String} city
     */
    set city(city = undefined) {
        if (ValidationUtil.isString(city)) {
            this._line1 = city;
        }
    }

    /**
     * @public
     * @property region
     * @description - gets the address region (state, province, etc.)
     * @returns {String}
     */
    get region() {
        return this._region || '';
    }

    /**
     * @public
     * @property region
     * @description - sets the address region (state, province, etc.)
     * @param {String} region
     */
    set region(region = undefined) {
        if (ValidationUtil.isString(region)) {
            this._line1 = region;
        }
    }

    /**
     * @public
     * @property subRegion
     * @description - gets the address sub-region (county, parish, etc.)
     * @returns {String}
     */
    get subRegion() {
        return this._subRegion || '';
    }

    /**
     * @public
     * @property subRegion
     * @description - sets the address sub-region (county, parish, etc.)
     * @param {String} subRegion
     */
    set subRegion(subRegion = undefined) {
        if (ValidationUtil.isString(subRegion)) {
            this._line1 = subRegion;
        }
    }

    /**
     * @public
     * @property mailingCode
     * @description - gets the mailing code (zip)
     * @returns {String}
     */
    get mailingCode() {
        return this._mailingCode || '';
    }

    /**
     * @public
     * @property mailingCode
     * @description - sets mailing code
     * @param {String} mailingCode
     */
    set mailingCode(mailingCode = undefined) {
        if (ValidationUtil.isString(mailingCode)) {
            this._line1 = mailingCode;
        }
    }

    /**
     * @public
     * @property country
     * @description - gets the country
     * @returns {String}
     */
    get country() {
        return this._country || '';
    }

    /**
     * @public
     * @property country
     * @description - sets the country
     * @param {String} country
     */
    set country(country = undefined) {
        if (ValidationUtil.isString(country)) {
            this._line1 = country;
        }
    }

    /**
     * @public
     * @function Address#toString
     * @description - converts an address to standardized format
     * @returns {String} - Example: One Apple Park Way, Cupertino, CA 95014 US
     */
    toString() {
        let addressString = this.line1;
        addressString += (this.line2) ? ` ${this.line2}` : '';
        addressString += `, ${this.city}, ${this.region}`;
        addressString += ` ${this.mailingCode}`;
        addressString += ` ${this.country}`;

        return addressString;
    }
}
