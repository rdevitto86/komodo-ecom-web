import { Billing } from './billing';
import { Company } from './company';
import { Address } from './address';
import { UserResponse, UserType } from './service-responses/user-response';

/**
 * @readonly
 * @constant ACCOUNT_TYPES
 * @description map of known account types
 */
const ACCOUNT_TYPES: { [key: number]: UserType } = Object.freeze({
    1: {
        name: 'GUEST',
        value: 1
    },
    2: {
        name: 'RES',
        value: 2
    },
    3: {
        name: 'COM',
        value: 3
    },
    4: {
        name: 'MFR',
        value: 5
    },
    5: {
        name: 'GOVT',
        value: 5
    }
});

/**
 * @interface
 * @description defines an abstract Billing object
 */
export interface User {
    //user account type
    type?: UserType;

    //user name information
    prefix?: string;
    firstName?: string;
    initial?: string;
    lastName?: string;
    suffix?: string;

    //contact information
    email?: string;
    cell?: string;
    contactPrimary?: string;
    contactSecondary?: string;

    //address and/or company details
    address?: Address | null;
    company?: Company | null;

    //billing details
    billing?: Billing | null;
}

/**
 * @singleton
 * @constant User
 * @class UserModel
 * @description defines a new User singleton
 */
export const User = new class UserModel {
    public type: UserType = {
        ...ACCOUNT_TYPES[1]
    };

    public prefix = '';
    public firstName = '';
    public initial = '';
    public lastName = '';
    public suffix = '';
    public email = '';
    public cell = '';
    public contactPrimary = '';
    public contactSecondary = '';

    public address: Address | null = null;
    public billing: Billing | null = null;
    public company: Company | null = null;

    /**
     * @public
     * @function User#setUserDetails
     * @description sets user details based
     * @param {Object} details object containing user details
     */
    setUserDetails(details: UserResponse): void {
        //user profile information
        const {
            type,
            nameInfo,
            contactInfo,
            companyInfo,
            addressInfo,
            billingInfo
        } = details;

        //set user account type
        if (type && typeof type === 'object') {
            this.type = ACCOUNT_TYPES[type.value];
        }

        //user name information
        const {
            prefix, firstName, initial, lastName, suffix
        } = nameInfo;

        //set user name information
        if (typeof prefix === 'string') {
            this.prefix = prefix;
        }
        if (typeof firstName === 'string') {
            this.firstName = firstName;
        }
        if (typeof initial === 'string') {
            this.initial = initial;
        }
        if (typeof lastName === 'string') {
            this.lastName = lastName;
        }
        if (typeof suffix === 'string') {
            this.suffix = suffix;
        }

        //user contact information
        const {
            email, cell, contactPrimary, contactSecondary
        } = contactInfo;

        //set user contact information
        if (typeof email === 'string') {
            this.email = email;
        }
        if (typeof cell === 'string') {
            this.cell = cell;
        }
        if (typeof contactPrimary === 'string') {
            this.contactPrimary = contactPrimary;
        }
        if (typeof contactSecondary === 'string') {
            this.contactSecondary = contactSecondary;
        }

        //set the address info
        if (addressInfo && typeof addressInfo === 'object') {
            this.address = addressInfo;
        }
        //set the financial/billing info
        if (billingInfo && typeof billingInfo === 'object') {
            this.billing = billingInfo;
        }
        //business, office, factory, etc. name
        if (companyInfo && typeof companyInfo === 'object') {
            this.company = companyInfo;
        }
    }

    /**
     * @public
     * @function User#formatDefaultName
     * @description formats the standard name for the current user
     * @returns {String}
     */
    formatDefaultName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    /**
     * @public
     * @function User#formatFullName
     * @description formats the full name for the current user
     * @returns {String}
     */
    formatFullName(): string {
        const prefix = (this.prefix) ? `${this.prefix} ` : '';
        const initial = (this.initial) ? `${this.initial} ` : '';
        const suffix = (this.suffix) ? this.suffix : '';

        return (prefix + this.firstName + initial + this.lastName + suffix);
    }

    /**
     * @public
     * @function User#reset
     * @description resets all local data to the default state
     */
    reset(): void {
        this.type = {
            ...ACCOUNT_TYPES[1]
        };

        this.prefix = '';
        this.firstName = '';
        this.initial = '';
        this.lastName = '';
        this.suffix = '';

        this.email = '';
        this.cell = '';
        this.contactPrimary = '';
        this.contactSecondary = '';

        this.address = null;
        this.billing = null;
        this.company = null;
    }
}();
