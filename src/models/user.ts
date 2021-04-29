import PriorityQueue from '../npm-libs/typescript/util/data-structures/priority-queue';
import { Address, AddressJSON, isAddress } from './address';
import { Billing, BillingJSON, isBilling } from './billing';
import { Company, CompanyJSON, isCompany } from './company';
import { isOrder, Order, OrderJSON } from './order';

/**
 * @public
 * @readonly
 * @constant {Object<Number, String>} ACCT_TYPES
 * @description mapping of account type priorities
 */
export const ACCT_TYPES: {[key:number]: string} = Object.freeze({
    1: 'GUEST',
    2: 'PERSONAL',
    3: 'BUSINESS',
});

// TODO - consider getter/setters for address, billing, etc.
// consider whether that will prevent corruption of critical user data

/**
 * @interface UserJSON
 * @description defines an abstract Billing object
 */
export interface UserJSON {
    // database information
    id: string;
    type?: number;

    // user name information
    firstName: string;
    lastName: string;
    suffix?: string;

    // contact information
    email: string;
    phone?: string;

    // address details
    address?: AddressJSON;

    // business details
    company?: CompanyJSON;

    // billing details
    billing?: BillingJSON;

    // current/previous invoice(s)
    invoices?: {
        priority: number;
        lineItem: OrderJSON;
    }[];
}

/**
 * @class
 * @version 1.0
 * @description defines a new User model
 */
export class User {
    // /**
    //  * @public
    //  * @property {Boolean} hasEdits
    //  * @description determines if the user model has user changes
    //  */
    // public hasEdits: boolean = false;

    /**
     * @public
     * @property {String} id
     * @description user identifier
     */
    public id: string = '*';

    /**
     * @private
     * @property {Number} type
     * @description account type
     */
    public type: number = 1;

    /**
     * @public
     * @property {String} firstName
     * @description user's first name
     */
    public firstName: string = '';

    /**
     * @public
     * @property {String} lastName
     * @description user's last name
     */
    public lastName: string = '';

    /**
     * @public
     * @property {String | Null} suffix
     * @description user's name suffix (ex. Sr, Jr)
     */
    public suffix: string | null = null;

    /**
     * @public
     * @property {String | Null} email
     * @description user's email address
     */
    public email: string | null = null;

    /**
     * @public
     * @property {String | Null} phone
     * @description user's phone number
     */
    public phone: string | null = null;

    /**
     * @public
     * @property {PriorityQueue<Order>} invoices
     * @description user invoice history
     */
    public invoices = new PriorityQueue<Order>();

    /**
     * @public
     * @property {Address | Null} address
     * @description address information
     */
    public address: Address | null = null;

    /**
     * @public
     * @property {Company | Null} company
     * @description company information
     */
    public company: Company | null = null;

    /**
     * @public
     * @property {Billing | Null} billing
     * @description billing information
     */
    public billing: Billing | null = null;

    /**
     * @constructor
     * @param {UserJSON} [props] exsisting user details
     */
    constructor(props?: UserJSON) {
        if (isUser(props)) {
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

            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;

            if (typeof type === 'number' && ACCT_TYPES[type]) {
                this.type = type;
            }
            if (typeof suffix === 'string') {
                this.suffix = suffix;
            }
            if (typeof phone === 'string') {
                this.phone = phone;
            }
            if (isAddress(address)) {
                this.address = new Address(address);
            }
            if (isBilling(billing)) {
                this.billing = new Billing(billing);
            }
            if (isCompany(company)) {
                this.company = new Company(company);
            }
            if (invoices instanceof Array) {
                // loop through invoices and prioritze invoices
                for (const invoice of invoices) {
                    if (invoice && typeof invoice === 'object') {
                        this.addInvoice(invoice.lineItem, invoice.priority);
                    }
                }
            }
        }
    }

    /**
     * @public
     * @function User.addInvoice
     * @description adds an invoice to the user's history
     * @param {OrderJSON | Order} invoice order invoice
     * @param {Number} [priority] invoice priority. Default is undefined.
     * @see Order
     */
    addInvoice(invoice: OrderJSON | Order, priority?: number) {
        if (isOrder(invoice)) {
            this.invoices.enqueue(
                (invoice instanceof Order) ? invoice : new Order(invoice),
                priority
            );
        }
    }

    /**
     * @public
     * @function User.clearInvoices
     * @description clears the invoice list
     * @see PriorityQueue.clear
     */
    clearInvoices() {
        this.invoices.clear();
    }

    /**
     * @public
     * @readonly
     * @property {String} fullName
     * @description the user's full name (ex. John Smith Sr.)
     */
     get fullName() {
        const { firstName, lastName, suffix } = this;
        return `${firstName} ${lastName}${(suffix) ? ` ${suffix}` : ''}`;
    }
}

/**
 * @constant
 * @function isUser
 * @description checks if an item is a User type object
 * @param {Any} obj object to reference
 * @returns {Boolean} true/false
 */
export const isUser = (obj: any): obj is UserJSON => (
    'id' in obj && 'type' in obj && 'email' in obj
);
