/**
 * @type {AddressItem}
 * @description defines an address item
 */
type AddressItem = string | null;

/**
 * @interface AddressAbstract
 * @description defines an abstract Address object
 */
export interface AddressJSON {
    line1: AddressItem;
    line2?: AddressItem;
    city: AddressItem;
    region: AddressItem;
    subRegion: AddressItem;
    mailingCode: AddressItem;
    countryCode: AddressItem;
}

/**
 * @class
 * @version 1.0
 * @implements {AddressJSON}
 * @description defines a new Address model
 */
export class Address implements AddressJSON {
    /**
     * @public
     * @property {AddressItem} line1
     * @description primary street address info
     */
    public line1: AddressItem = null;

    /**
     * @public
     * @property {AddressItem} line2
     * @description secondary street address info
     */
    public line2: AddressItem = null;

    /**
     * @public
     * @property {AddressItem} city
     * @description city of address
     */
    public city: AddressItem = null;

    /**
     * @public
     * @property {AddressItem} region
     * @description region of address (eg. state, etc.)
     */
    public region: AddressItem = null;

    /**
     * @public
     * @property {AddressItem} subRegion
     * @description address sub-region (eg. county)
     */
    public subRegion: AddressItem = null;

    /**
     * @public
     * @property {AddressItem} mailingCode
     * @description address mailing code (eg. zipcode)
     */
    public mailingCode: AddressItem = null;

    /**
     * @public
     * @property {AddressItem} countryCode
     * @description country of address
     */
    public countryCode: AddressItem = null;

    /**
     * @constructor
     * @param {AddressJSON} [props] exsisting address details
     */
    constructor(props?: AddressJSON) {
        if (isAddress(props)) {
            const {
                line1,
                line2,
                city,
                region,
                subRegion,
                mailingCode,
                countryCode
            } = props;

            this.line1 = line1;
            this.city = city;
            this.region = region;
            this.subRegion = subRegion;
            this.mailingCode = mailingCode;
            this.countryCode = countryCode;

            if (line2) {
                this.line2 = line2;
            }
        }
    }

    /**
     * @public
     * @function Address.format
     * @description converts an address to standardized format
     * @returns {String} Example: One Apple Park Way, Cupertino, CA 95014 US
     */
    format(): string {
        const {
            line1, line2, city, region, subRegion, mailingCode, countryCode
        } = this;

        const fullAddress = `${line1 || ''}${((line2) ? ` ${line2}` : '')}`;
        const fullRegion = `, ${region || ''}${(subRegion) ? `, ${subRegion}` : ''}`;
        return `${fullAddress}, ${city || ''}, ${fullRegion} ${mailingCode || ''} ${countryCode || ''}`;
    }
}

/**
 * @constant
 * @function isAddress
 * @description checks if an item is an Address type object
 * @param {Any} obj object to reference
 * @returns {Boolean} true/false
 */
 export const isAddress = (obj: any): obj is AddressJSON => (
    'line1' in obj && 'city' in obj && 'region' in obj && 'mailingCode' in obj
);
