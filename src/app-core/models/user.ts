import { Singleton as Billing, BillingAbstract } from './billing';
import Company from './company';
import Address from './address';

const ACCOUNT_TYPES = Object.freeze({
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
 * @class User
 * @description - defines a new User singleton
 */
class User {
    private _type = 1;

    private _prefix = '';
    private _firstName = '';
    private _middleInitial= '';
    private _lastName = '';
    private _suffix = '';

    private _email = '';
    private _contactPrimary = '';
    private _contactSecondary = '';

    private _address: Address = null;
    private _company: Company = null;

    /**
     * @public
     * @function User#setUserDetails
     * @description - sets user details based
     * @param {Object} details - object containing user details
     */
    public setUserDetails(details = undefined): void {
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
        this.type = ACCOUNT_TYPES[type] || ACCOUNT_TYPES[1];

        //user name information
        const {
            prefix, firstName, middleInitial, lastName, suffix
        } = nameInfo;

        this.prefix = prefix;
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.suffix = suffix;

        //user contact information
        const {
            email, contactPrimary, contactSecondary
        } = contactInfo;

        this.email = email;
        this.contactPrimary = contactPrimary;
        this.contactSecondary = contactSecondary;

        this.address = addressInfo; //set the address info
        this.billing = billingInfo; //set the financial/billing info

        //business, office, factory, etc. name
        this.company = companyInfo;
    }

    /**
     * @public
     * @function User#formatName
     * @description - formats user details into a formatted name
     * @returns {String}
     */
    public formatName(): string {
        return `${this.prefix} ${this.firstName} ${this.middleInitial} ${this.lastName} ${this.suffix}`;
    }

    /**
     * @public
     * @property type
     * @description - gets the account type
     * @returns {Object}
     */
    get type(): number {
        return this._type;
    }

    /**
     * @public
     * @property type
     * @description - sets the account type
     * @param {Number} type
     */
    set type(type) {
        if (type && ACCOUNT_TYPES[type]) {
            this._type = ACCOUNT_TYPES[type];
        }
    }

    /**
     * @public
     * @property email
     * @description - returns user email
     * @returns {String}
     */
    get email(): string {
        return this._email;
    }

    /**
     * @public
     * @property email
     * @description - sets the user email
     * @param {String} email
     */
    set email(email) {
        if (typeof email === 'string') {
            this._email = email;
        }
    }

    /**
     * @public
     * @property contactPrimary
     * @description - gets user's primary contact method
     * @returns {String}
     */
    get contactPrimary(): string {
        return this._contactPrimary;
    }

    /**
     * @public
     * @property contactPrimary
     * @description - sets the user primary contact details
     * @param {String} primary
     */
    set contactPrimary(primary) {
        //TODO - determine if phone, email, or social media
        if (typeof primary === 'string') {
            this._contactPrimary = primary;
        }
    }

    /**
     * @public
     * @property contactSecondary
     * @description - gets user's secondary contact method
     * @returns {String}
     */
    get contactSecondary(): string {
        return this._contactSecondary;
    }

    /**
     * @public
     * @property contactSecondary
     * @description - sets the user's secondary contact method
     * @param {String} secondary
     */
    set contactSecondary(secondary) {
        //TODO - determine if phone, email, or social media
        if (typeof secondary === 'string') {
            this._contactSecondary = secondary;
        }
    }

    /**
     * @public
     * @property prefix
     * @description - gets user's name prefix
     * @returns {String}
     */
    get prefix(): string {
        return this._prefix;
    }

    /**
     * @public
     * @property prefix
     * @description - sets the user's name prefix
     * @param {String} prefix
     */
    set prefix(prefix) {
        if (typeof prefix === 'string') {
            this._prefix = prefix;
        }
    }

    /**
     * @public
     * @property firstName
     * @description - gets user's first name
     * @returns {String}
     */
    get firstName(): string {
        return this._firstName;
    }

    /**
     * @public
     * @property firstName
     * @description - sets the user's first name
     * @param {String} firstName
     */
    set firstName(firstName) {
        if (typeof firstName === 'string') {
            this._firstName = firstName;
        }
    }

    /**
     * @public
     * @property middleInitial
     * @description - gets user's middle initial
     * @returns {String}
     */
    get middleInitial(): string {
        return this._middleInitial;
    }

    /**
     * @public
     * @property middleInitial
     * @description - sets the user's middle initial
     * @param {String} initital
     */
    set middleInitial(initital) {
        if (typeof initital === 'string') {
            this._middleInitial = initital;
        }
    }

    /**
     * @public
     * @property lastName
     * @description - gets user's last name
     * @returns {String}
     */
    get lastName(): string {
        return this._lastName;
    }

    /**
     * @public
     * @property firstName
     * @description - sets the user's last name
     * @param {String} lastName
     */
    set lastName(lastName) {
        if (typeof lastName === 'string') {
            this._lastName = lastName;
        }
    }

    /**
     * @public
     * @property suffix
     * @description - gets user's name suffix (title)
     * @returns {String}
     */
    get suffix(): string {
        return this._suffix;
    }

    /**
     * @public
     * @property suffix
     * @description - sets the user's suffix (title)
     * @param {String} suffix
     */
    set suffix(suffix) {
        if (typeof suffix === 'string') {
            this._suffix = suffix;
        }
    }

    /**
     * @public
     * @property address
     * @description - gets user's address info
     * @returns {Object}
     */
    get address(): Address | null {
        return this._address;
    }

    /**
     * @public
     * @property address
     * @description - sets user address info
     * @param {Object} newAddress
     */
    set address(newAddress) {
        if (typeof newAddress === 'object') {
            this._address = (newAddress) ? new Address(newAddress) : null;
        }
    }

    /**
     * @public
     * @property billing
     * @description - gets the user's billing info
     * @returns {Object}
     */
    get billing(): BillingAbstract {
        return Billing;
    }

    /**
     * @public
     * @property billing
     * @description - sets user's billing info
     * @param {Object} newBilling
     */
    set billing(newBilling) {
        if (newBilling && typeof newBilling === 'object') {
            Billing.setBilling(newBilling);
        }
    }

    /**
     * @public
     * @property company
     * @description - returns user's contracted property/company
     * @returns {Object}
     */
    get company(): Company {
        return this._company;
    }

    /**
     * @public
     * @property company
     * @description - sets the user's contracted property/company
     * @param {Object} newCompany
     */
    set company(newCompany) {
        if (typeof newCompany === 'object') {
            this._company = (newCompany) ? new Company(newCompany) : null;
        }
    }

    /**
     * @public
     * @readonly
     * @property ACCOUNT_TYPES
     * @description - returns a map of standard account types
     * @returns {Object}
     */
    get ACCOUNT_TYPES(): object {
        return ACCOUNT_TYPES;
    }
}

/**
 * @interface
 * @description - defines abstract properties of a User model
 */
export interface UserAbstract {
    setUser(details: object): void;
    formatName(): string;
    //TODO - see if get/set properties are needed here
}

export const Singleton = Object.freeze(new User());
