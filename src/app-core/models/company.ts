import { Address } from './address';

/**
 * @interface
 * @description - defines a new Company abstract object
 */
export interface Company {
    name: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    address?: Address;
}

/**
 * @class Company
 * @description - defines a new Company model
 */
export class Company extends Address {
    public name = '';
    public contactName = '';
    public contactPhone = '';
    public contactEmail = '';

    /**
     * @constructor
     * @param {Object} details - company details object
     */
    constructor(details?: Company) {
        super((details || {}).address);

        if (!details || details.constructor !== Object) {
            return;
        }

        const {
            name, contactName, contactPhone, contactEmail
        } = details;

        this.name = name;
        this.contactName = contactName;
        this.contactPhone = contactPhone;
        this.contactEmail = contactEmail;
    }
}
