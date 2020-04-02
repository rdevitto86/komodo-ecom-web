import Address from './address';

/**
 * @class Company
 * @description - defines a new Company model
 */
export default class Company extends Address {
    private _companyName = '';
    private _contactName = '';
    private _contactPhone = '';
    private _contactEmail = '';

    /**
     * @constructor
     * @param {Object} details - company details object
     */
    constructor(details = undefined) {
        super(details.address);

        const {
            name, contactName, contactPhone, contactEmail
        } = details;

        this.name = name;
        this.contactName = contactName;
        this.contactPhone = contactPhone;
        this.contactEmail = contactEmail;
    }

    /**
     * @public
     * @property name
     * @description - gets the company name
     * @returns {String}
     */
    get name(): string {
        return this._companyName;
    }

    /**
     * @public
     * @property name
     * @description - sets the company name
     * @param {String} name
     */
    set name(name) {
        if (typeof name === 'string') {
            this._companyName = name;
        }
    }

    /**
     * @public
     * @property contactName
     * @description - gets the company's contact name
     * @returns {String}
     */
    get contactName(): string {
        return this._contactName;
    }

    /**
     * @public
     * @property name
     * @description - sets the company name
     * @param {String} contactName
     */
    set contactName(contactName) {
        if (typeof contactName === 'string') {
            this._contactName = contactName;
        }
    }

    /**
     * @public
     * @property contactPhone
     * @description - gets the company's contact phone number
     * @returns {String}
     */
    get contactPhone(): string {
        return this._contactPhone;
    }

    /**
     * @public
     * @property contactPhone
     * @description - sets the company's contact phone number
     * @param {String} contactPhone
     */
    set contactPhone(contactPhone) {
        if (typeof contactPhone === 'string') {
            this._contactPhone = contactPhone;
        }
    }

    /**
     * @public
     * @property contactEmail
     * @description - gets the company's contact email address
     * @returns {String}
     */
    get contactEmail(): string {
        return this._contactEmail;
    }

    /**
     * @public
     * @property contactEmail
     * @description - sets the company's contact email address
     * @param {String} contactEmail
     */
    set contactEmail(contactEmail) {
        if (typeof contactEmail === 'string') {
            this._contactEmail = contactEmail;
        }
    }
}
