/**
 * @interface
 * @description defines a new abstract class for Address
 */
export interface Address {
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
 * @description defines a new Address model
 */
export class Address {
    public line1 = '';
    public line2 = '';
    public city = '';
    public region = '';
    public subRegion = '';
    public mailingCode = '';
    public country = '';

    /**
     * @constructor
     * @param {Address} details object containing address details
     */
    constructor(details?: Address) {
        if (!details || details.constructor !== Object) {
            return;
        }

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
     * @function Address#printAddress
     * @description converts an address to standardized format
     * @returns {String} Example: One Apple Park Way, Cupertino, CA 95014 US
     */
    printAddress(): string {
        let addressString = this.line1;
        addressString += (this.line2) ? ` ${this.line2}` : '';
        addressString += `, ${this.city}, ${this.region}`;
        addressString += ` ${this.mailingCode}`;
        addressString += ` ${this.country}`;

        return addressString;
    }
}
