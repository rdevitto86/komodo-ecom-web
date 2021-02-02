/**
 * @interface AddressAbstract
 * @description defines an abstract Address object
 */
export interface AddressAbstract {
    line1: string;
    line2: string;
    city: string;
    region: string;
    subRegion: string;
    mailingCode: string;
    country: string;
}

/**
 * @class
 * @implements {AddressAbstract}
 * @description defines a new Address model
 */
export class Address implements AddressAbstract {
    private _line1: string = '';
    private _line2: string = '';
    private _city: string = '';
    private _region: string = '';
    private _subRegion: string = '';
    private _mailingCode: string = '';
    private _country: string = '';

    /**
     * @constructor
     * @param {Object<AddressAbstract>} [props] exsisting address details
     */
    constructor(props?: AddressAbstract) {
        if (props && typeof props === 'object') {
            const {
                line1,
                line2,
                city,
                region,
                subRegion,
                mailingCode,
                country
            } = props;

            this.line1 = line1 || '';
            this.line2 = line2 || '';
            this.city = city || '';
            this.region = region || '';
            this.subRegion = subRegion || '';
            this.mailingCode = mailingCode || '';
            this.country = country || '';
        }
    }

    /**
     * @public
     * @function Address#printAddress
     * @description converts an address to standardized format
     * @returns {String} Example: One Apple Park Way, Cupertino, CA 95014 US
     */
    printAddress(): string {
        let addressString = this.line1 + ((this.line2) ? ` ${this.line2}` : '');
        addressString += `, ${this.city}, ${this.region} ${this.mailingCode} ${this.country}`;
        return addressString;
    }

    /**
     * @public
     * @property {String} line1
     * @description primary street address info
     */
    get line1() {
        return this._line1;
    }
    set line1(line1: string) {
        if (typeof line1 === 'string') {
            this._line1 = line1;
        }
    }

    /**
     * @public
     * @property {String} line2
     * @description secondary street address info
     */
    get line2() {
        return this._line2;
    }
    set line2(line2: string) {
        if (typeof line2 === 'string') {
            this._line2 = line2;
        }
    }

    /**
     * @public
     * @property {String} city
     * @description city of address
     */
    get city() {
        return this._city;
    }
    set city(city: string) {
        if (typeof city === 'string') {
            this._city = city;
        }
    }

    /**
     * @public
     * @property {String} region
     * @description region of address (eg. state, etc.)
     */
    get region() {
        return this._region;
    }
    set region(region: string) {
        if (typeof region === 'string') {
            this._region = region;
        }
    }

    /**
     * @public
     * @property {String} subRegion
     * @description address sub-region (eg. county)
     */
    get subRegion() {
        return this._subRegion;
    }
    set subRegion(subRegion: string) {
        if (typeof subRegion === 'string') {
            this._subRegion = subRegion;
        }
    }

    /**
     * @public
     * @property {String} mailingCode
     * @description address mailing code (eg. zipcode)
     */
    get mailingCode() {
        return this._mailingCode;
    }
    set mailingCode(mailingCode: string) {
        if (typeof mailingCode === 'string') {
            this._mailingCode = mailingCode;
        }
    }

    /**
     * @public
     * @property {String} country
     * @description country of address
     */
    get country() {
        return this._country;
    }
    set country(country: string) {
        if (typeof country === 'string') {
            this._country = country;
        }
    }
}
