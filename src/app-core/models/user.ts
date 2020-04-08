import { Billing } from './billing';
import { Company } from './company';
import { Address } from './address';
import { UserResponse, UserType } from './service-responses/user-response';

/**
 * @interface
 * @description - defines the structure of the ACCOUNT_TYPES map
 */
interface AccountTypes {
    [key: number]: UserType;
}

/**
 * @readonly
 * @constant ACCOUNT_TYPES
 * @description - map of known account types
 */
const ACCOUNT_TYPES: AccountTypes = Object.freeze({
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
 * @description - defines an abstract Billing object
 */
export interface User {
    //user account type
    type: UserType;

    //user name information
    prefix?: string;
    firstName: string;
    initial?: string;
    lastName: string;
    suffix?: string;

    //contact information
    email: string;
    cell: string;
    contactPrimary: string;
    contactSecondary?: string;

    //address and/or company details
    address?: Address | null;
    company?: Company | null;

    //billing details
    billing?: Billing | null;
}

/**
 * @class User
 * @description - defines a new User singleton
 */
export class User {
    private static instance: User;

    /**
     * @private
     * @constructor
     * @description - creates a new User singleton
     */
    private constructor() {
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

    /**
     * @public
     * @static
     * @function Billing#getInstance
     * @description - gets the singleton instance for billing
     * @returns {User}
     */
    static getInstance(): User {
        if (!User.instance) {
            User.instance = new User();
        }
        return User.instance;
    }

    /**
     * @public
     * @function User#setUserDetails
     * @description - sets user details based
     * @param {Object} details - object containing user details
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

        //user account type
        if (type && typeof type === 'object') {
            this.type = ACCOUNT_TYPES[type.value];
        }

        //user name information
        const {
            prefix, firstName, initial, lastName, suffix
        } = nameInfo;

        this.prefix = prefix;
        this.firstName = firstName;
        this.initial = initial;
        this.lastName = lastName;
        this.suffix = suffix;

        //user contact information
        const {
            email, cell, contactPrimary, contactSecondary
        } = contactInfo;

        this.email = email;
        this.cell = cell;
        this.contactPrimary = contactPrimary;
        this.contactSecondary = contactSecondary;

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
     * @function User#clearData
     * @description - resets all local data to the default state
     */
    clearData(): void {
        User.instance = new User();
    }
}
