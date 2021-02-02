// models
import { Address, AddressAbstract } from './address';
import { Billing, BillingAbstract } from './billing';
import { Company, CompanyAbstract } from './company';
import { Invoice, InvoiceAbstract } from './invoice';

/**
 * @public
 * @readonly
 * @constant {Object<Number, String>} ACCT_TYPES
 * @description mapping of account type priorities
 */
export const ACCT_TYPES = Object.freeze({
    1: 'GUEST',
    2: 'PERSONAL',
    3: 'BUSINESS',
});

/**
 * @interface UserAbstract
 * @description defines an abstract Billing object
 */
export interface UserAbstract {
    // database information
    id?: string;
    type?: number;

    // user name information
    firstName?: string;
    lastName?: string;
    suffix?: string;

    // contact information
    email?: string;
    phone?: string;

    // address details
    address?: AddressAbstract;

    // business details
    company?: CompanyAbstract;

    // billing details
    billing?: BillingAbstract;

    // current/previous invoices
    invoices?: InvoiceAbstract[] | Map<string, Invoice>;
}

/**
 * @class
 * @implements {UserAbstract}
 * @description defines a new User model
 */
export class User implements UserAbstract {
    // database indentifiers
    private _id: string = 'Unknown';
    private _type: number = 1;

    // user information
    private _firstName: string = '';
    private _lastName: string = '';
    private _suffix: string = '';
    private _email: string = '';
    private _phone: string = '';
    private _address?: Address;
    private _company?: Company;
    private _billing?: Billing;

    // invoice data
    private _invoices: Map<string, Invoice> = new Map();

    /**
     * @constructor
     * @param {Object<UserAbstract>} [props] exsisting user details
     */
    constructor(props?: UserAbstract) {
        if (props && typeof props === 'object') {
            const {
                id,
                type,
                firstName,
                lastName,
                suffix,
                email,
                phone,
                address,
                company,
                billing,
                invoices,
            } = props;

            this._id = id || '-1';
            this._type = type || 1;

            this.firstName = firstName || '';
            this.lastName = lastName || '';
            this.suffix = suffix || '';
            this.email = email || '';
            this.phone = phone || '';

            this._address = new Address(address);

            if (billing) {
                this._billing = new Billing(billing);
            }
            if (company) {
                this._company = new Company(company);
            }
            if (invoices) {
                // TODO
            }
        }
    }

    /**
     * @public
     * @property {String} id
     * @description user's account id
     */
    get id() {
        return this._id;
    }
    set id(id: string) {
        if (typeof id === 'string' || typeof id === 'number') {
            this._id = id;
        }
    }

    /**
     * @public
     * @property {Number} type
     * @description user's account type
     */
    get type() {
        return this._type;
    }
    set type(type: number) {
        if (typeof type === 'number' && type > 0) {
            this._type = type;
        }
    }

    /**
     * @public
     * @property {String} firstName
     * @description user's first name
     */
    get firstName() {
        return this._firstName;
    }
    set firstName(firstName: string) {
        if (typeof firstName === 'string') {
            this._firstName = firstName;
        }
    }

    /**
     * @public
     * @property {String} lastName
     * @description user's last name
     */
    get lastName() {
        return this._lastName;
    }
    set lastName(lastName: string) {
        if (typeof lastName === 'string') {
            this._lastName = lastName;
        }
    }

    /**
     * @public
     * @property {String} suffix
     * @description user's name suffix (ex. Sr, Jr)
     */
    get suffix() {
        return this._suffix;
    }
    set suffix(suffix: string) {
        if (typeof suffix === 'string') {
            this._suffix = suffix;
        }
    }

    /**
     * @public
     * @readonly
     * @property {String} fullName
     * @description the user's full name (ex. John Smith Sr.)
     */
    get fullName() {
        const { suffix } = this;
        return `${this.firstName} ${this.lastName}${(suffix) ? ` ${suffix}` : ''}`;
    }

    /**
     * @public
     * @property {String} email
     * @description user's email address
     */
    get email() {
        return this._email;
    }
    set email(email: string) {
        if (typeof email === 'string') {
            this._email = email;
        }
    }

    /**
     * @public
     * @property {String} phone
     * @description user's phone number
     */
    get phone() {
        return this._phone;
    }
    set phone(phone: string) {
        if (typeof phone === 'string') {
            this._phone = phone;
        }
    }

    /**
     * @public
     * @property {Address} address
     * @description address information
     */
    get address() {
        return this._address;
    }
    set address(address: Address | undefined) {
        if (address instanceof Address || address === undefined) {
            this._address = address;
        }
    }

    /**
     * @public
     * @property {Company | Undefined} company
     * @description company information
     */
    get company() {
        return this._company;
    }
    set company(company: Company | undefined) {
        if (company instanceof Company || company === undefined) {
            this._company = company;
        }
    }

    /**
     * @public
     * @readonly
     * @property {Billing} billing
     * @description billing information
     */
    get billing() {
        return this._billing;
    }
    set billing(billing: Billing | undefined) {
        if (billing instanceof Billing || billing === undefined) {
            this._billing = billing;
        }
    }

    /**
     * @public
     * @readonly
     * @property {Map<string, Invoice>} invoices
     * @description invoice history
     */
    get invoices() {
        return this._invoices;
    }
}
