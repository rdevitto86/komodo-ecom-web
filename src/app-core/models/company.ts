import { Address, AddressJSON } from './address';

/**
 * @interface CompanyJSON
 * @description defines an abstract Business object
 */
export interface CompanyJSON {
    name: string | null;
    contactName: string | null;
    contactEmail: string | null;
    contactPhone?: string | null;
    address?: AddressJSON;
}

/**
 * @class
 * @version 1.0
 * @extends {Address}
 * @description defines a new Company model
 * @see Address
 */
export class Company extends Address {
    /**
     * @public
     * @property {String | Null} name
     * @description company name
     */
    public name: string | null = null;

    /**
     * @public
     * @property {String | Null} contactName
     * @description company contact person
     */
    public contactName: string | null = null;

    /**
     * @public
     * @property {String | Null} contactPhone
     * @description company contact phone number
     */
    public contactPhone: string | null = null;

    /**
     * @public
     * @property {String | Null} contactEmail
     * @description company contact email
     */
    public contactEmail: string | null = null;

    /**
     * @constructor
     * @param {CompanyJSON} [props] exsisting business details
     */
    constructor(props?: CompanyJSON) {
        super((props || {}).address);

        if (isCompany(props)) {
            const {
                name, contactName, contactPhone, contactEmail
            } = props;

            this.name = name;
            this.contactName = contactName;
            this.contactEmail = contactEmail;

            if (typeof contactPhone === 'string') {
                this.contactPhone = contactPhone;
            }
        }
    }
}

/**
 * @constant
 * @function isCompany
 * @description checks if an item is a Company type object
 * @param {Any} obj object to reference
 * @returns {Boolean} true/false
 */
 export const isCompany = (obj: any): obj is CompanyJSON => (
    'name' in obj && 'contactName' in obj && 'contactEmail' in obj
);
