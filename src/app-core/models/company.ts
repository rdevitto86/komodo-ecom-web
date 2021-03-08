import { Address } from './address';

/**
 * @interface CompanyAbstract
 * @description defines an abstract Business object
 */
export interface CompanyAbstract {
    name: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    address?: Address;
}

/**
 * @class
 * @version 1.0.0
 * @extends {Address}
 * @description defines a new Company model
 */
export class Company extends Address {
    private _name: string = '';
    private _contactName: string = '';
    private _contactPhone: string = '';
    private _contactEmail: string = '';

    /**
     * @constructor
     * @param {CompanyAbstract?} [props] exsisting business details
     */
    constructor(props?: CompanyAbstract) {
        super((props || {}).address);

        if (props && typeof props === 'object') {
            const {
                name, contactName, contactPhone, contactEmail
            } = props;

            this.name = name || '';
            this.contactName = contactName || '';
            this.contactPhone = contactPhone || '';
            this.contactEmail = contactEmail || '';
        }
    }

    /**
     * @public
     * @property {String} name
     * @description company name
     */
    get name() {
        return this._name;
    }
    set name(name: string) {
        if (typeof name === 'string') {
            this._name = name;
        }
    }

    /**
     * @public
     * @property {String} contactName
     * @description company contact person
     */
    get contactName() {
        return this._contactName;
    }
    set contactName(contactName: string) {
        if (typeof contactName === 'string') {
            this._contactName = contactName;
        }
    }

    /**
     * @public
     * @property {String} contactPhone
     * @description company contact phone number
     */
    get contactPhone() {
        return this._contactPhone;
    }
    set contactPhone(contactPhone: string) {
        if (typeof contactPhone === 'string') {
            this._contactPhone = contactPhone;
        }
    }

    /**
     * @public
     * @property {String} contactEmail
     * @description company contact email
     */
    get contactEmail() {
        return this._contactEmail;
    }
    set contactEmail(contactEmail: string) {
        if (typeof contactEmail === 'string') {
            this._contactEmail = contactEmail;
        }
    }
}
