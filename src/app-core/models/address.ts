/**
 * @class Address
 * @description - defines a new Address object
 */
export default class Address {
    private _line1 = '';
    private _line2 = '';
    private _city = '';
    private _region = '';
    private _subRegion = '';
    private _mailingCode = '';
    private _country = '';

    /**
     * @constructor
     * @param {Object} details - object containing address details
     */
    constructor(details = undefined) {
        const {
            line1,
            line2,
            city,
            region,
            subRegion,
            mailingCode,
            country
        } = details;

        this.line1 = line1;
        this.line2 = line2;
        this.city = city;
        this.region = region;
        this.subRegion = subRegion;
        this.mailingCode = mailingCode;
        this.country = country;
    }

    /**
     * @public
     * @property line1
     * @description - gets the primary address
     * @returns {String}
     */
    get line1(): string {
        return this._line1;
    }

    /**
     * @public
     * @property line1
     * @description - gets the primary address
     * @param {String} line1
     */
    set line1(line1) {
        if (typeof line1 === 'string') {
            this._line1 = line1;
        }
    }

    /**
     * @public
     * @property line2
     * @description - gets the secondary address
     * @returns {String}
     */
    get line2(): string {
        return this._line2;
    }

    /**
     * @public
     * @property line2
     * @description - gets the secondary address
     * @param {String} line2
     */
    set line2(line2) {
        if (typeof line2 === 'string') {
            this._line2 = line2;
        }
    }

    /**
     * @public
     * @property city
     * @description - gets the city
     * @returns {String}
     */
    get city(): string {
        return this._city;
    }

    /**
     * @public
     * @property city
     * @description - gets the city
     * @param {String} city
     */
    set city(city) {
        if (typeof city === 'string') {
            this._city = city;
        }
    }

    /**
     * @public
     * @property region
     * @description - gets the address region (ex. state, province, etc.)
     * @returns {String}
     */
    get region(): string {
        return this._region;
    }

    /**
     * @public
     * @property region
     * @description - sets the address region (ex. state, province, etc.)
     * @param {String} region
     */
    set region(region) {
        if (typeof region === 'string') {
            this._region = region;
        }
    }

    /**
     * @public
     * @property subRegion
     * @description - gets the address sub-region (ex. county, burough, etc.)
     * @returns {String}
     */
    get subRegion(): string {
        return this._subRegion;
    }

    /**
     * @public
     * @property subRegion
     * @description - sets the address sub-region (ex. county, burough, etc.)
     * @param {String} subRegion
     */
    set subRegion(subRegion) {
        if (typeof subRegion === 'string') {
            this._subRegion = subRegion;
        }
    }

    /**
     * @public
     * @property mailingCode
     * @description - gets the address mailing code (zip)
     * @returns {String}
     */
    get mailingCode(): string {
        return this._mailingCode;
    }

    /**
     * @public
     * @property mailingCode
     * @description - gets the address mailing code (zip)
     * @param {String} mailingCode
     */
    set mailingCode(mailingCode) {
        if (typeof mailingCode === 'string') {
            this._mailingCode = mailingCode;
        }
    }

    /**
     * @public
     * @property country
     * @description - gets the address country
     * @returns {String}
     */
    get country(): string {
        return this._country;
    }

    /**
     * @public
     * @property country
     * @description - gets the address country
     * @param {String} country
     */
    set country(country) {
        if (typeof country === 'string') {
            this._country = country;
        }
    }

    /**
     * @public
     * @function Address#printAddress
     * @description - converts an address to standardized format
     * @returns {String} - Example: One Apple Park Way, Cupertino, CA 95014 US
     */
    public printAddress(): string {
        let addressString = this.line1;
        addressString += (this.line2) ? ` ${this.line2}` : '';
        addressString += `, ${this.city}, ${this.region}`;
        addressString += ` ${this.mailingCode}`;
        addressString += ` ${this.country}`;

        return addressString;
    }
}
