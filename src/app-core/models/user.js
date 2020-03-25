import Billing from './billing';
import Address from './address';

import ValidationUtil from '../../app-plugins/utility/validation-util';

/**
 * @class User
 * @description - defines a new User object
 */
export default class User {
    /**
     * @constructor
     * @param {Object} data - object containing user details
     * @param {Number} type - account type
     * @param {Account} address - object containing address information
     * @param {Billing} billing - object containing billing/financial information
     */
    constructor(data = {}, type = 1, address = null, billing = null) {
        if (!ValidationUtil.isObject(data)) {
            data = {};
        }
        if (!ValidationUtil.isNumber(type)) {
            type = 1;
        }

        const accountTypes = this.ACCOUNT_TYPES;
        this.type = accountTypes[type] || accountTypes[1];

        //set the user details
        this.details = {
            email: data.email || '',
            contactPrimary: data.contactPrimary || '',
            contactSecondary: data.contactSecondary || '',
            prefix: data.prefix || '', //Dr, Mr, Mrs, etc.
            firstName: data.firstName || '',
            middleInitial: data.middleInitial || '',
            lastName: data.lastName || '',
            suffix: data.suffix || '' //Sr, Jr, III, etc.
        };

        //business, office, factory, etc. name
        this.property = data.property;

        this.billing = billing; //set the financial/billing info (encrypted?)
        this.address = address; //set the address info (encrypted?)
    }

    /**
     * @public
     * @function User#formatName
     * @description - formats user details into a formatted name
     * @returns {String}
     */
    formatName() {
        const details = this.details || {};
        const prefix = details.prefix || '';
        const fName = details.firstName || '';
        const mInit = details.middleInitial || '';
        const lName = details.lastName || '';
        const suffix = details.suffix || '';

        return `${prefix} ${fName} ${mInit} ${lName} ${suffix}`;
    }

    /**
     * @public
     * @static
     * @readonly
     * @property ACCOUNT_TYPES
     * @description - returns a map of standard account types
     * @returns {Object}
     */
    static get ACCOUNT_TYPES() {
        return Object.freeze({
            1: {
                name: 'DEFAULT',
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
    }

    /**
     * @public
     * @property address
     * @description - fetches the user address info
     * @returns {Object}
     */
    get address() {
        return this._address;
    }

    /**
     * @public
     * @property address
     * @description - sets new user address
     * @param {Object} newAddress
     */
    set address(newAddress = undefined) {
        if (newAddress instanceof Address || newAddress === null) {
            this._address = newAddress;
        } else if (this._address === undefined) {
            this._address = null;
        } else {
            //LOGGER.info()
        }
    }

    /**
     * @public
     * @property billing
     * @description - fetches the user billing info
     * @returns {Object}
     */
    get billing() {
        return this._billing;
    }

    /**
     * @public
     * @property billing
     * @description - sets new user billing
     * @param {Object} newBilling
     */
    set billing(newBilling = undefined) {
        if (newBilling instanceof Billing || newBilling === null) {
            this._billing = newBilling;
        } else if (this._billing === undefined) {
            this._billing = null;
        } else {
            //LOGGER.info()
        }
    }

    /**
     * @public
     * @property details
     * @description - fetches the user details
     * @returns {Object}
     */
    get details() {
        return this._details;
    }

    /**
     * @public
     * @property userDetails
     * @description - sets new user details
     * @param {Object} newDetails
     */
    set details(newDetails = undefined) {
        if (newDetails && typeof newDetails === 'object') {
            const currentDetails = this.details;

            Object.keys(newDetails).forEach((key) => {
                if (currentDetails[key]) {
                    currentDetails[key] = newDetails[key];
                }
            });
        } else {
            //TODO LOGGER.warn
        }
    }

    /**
     * @public
     * @property type
     * @description - fetches the account type
     * @returns {Object}
     */
    get type() {
        return this._type;
    }

    /**
     * @public
     * @property type
     * @description - sets the account type
     * @param {Number} newType
     */
    set type(newType = undefined) {
        const accountTypes = this.ACCOUNT_TYPES;
        if (accountTypes[newType]) {
            this._type = accountTypes[newType];
        } else {
            //TODO LOGGER.warn
        }
    }

    /**
     * @public
     * @property email
     * @description - returns user email
     * @returns {String}
     */
    get email() {
        return this.details.email || '';
    }

    /**
     * @public
     * @property email
     * @description - sets the user email
     * @param {String} email
     */
    set email(newEmail = undefined) {
        if (ValidationUtil.validateEmail(newEmail)) {
            this.details.email = newEmail;
        } else {
            //TODO LOGGER.warn
        }
    }

    /**
     * @public
     * @property phonePrimary
     * @description - returns user's primary phone
     * @returns {String}
     */
    get contactPrimary() {
        return this.details.contactPrimary || '';
    }

    /**
     * @public
     * @property contactPrimary
     * @description - sets the user primary contact
     * @param {String} newPrimary
     */
    set contactPrimary(newPrimary = undefined) {
        //TODO - determine if phone, email, or social media
        if (ValidationUtil.isString(newPrimary)) {
            this.details.contactPrimary = newPrimary;
        } else {
            //TODO LOGGER.warn
        }
    }

    /**
     * @public
     * @property phonePrimary
     * @description - returns user's secondary phone
     * @returns {String}
     */
    get contactSecondary() {
        return this.details.contactSecondary || '';
    }

    /**
     * @public
     * @property contactSecondary
     * @description - sets the user secondary contact
     * @param {String} newSecondary
     */
    set contactSecondary(newSecondary = undefined) {
        //TODO - determine if phone, email, or social media
        if (ValidationUtil.isString(newSecondary)) {
            this.details.contactSecondary = newSecondary;
        } else {
            //TODO LOGGER.info
        }
    }

    /**
     * @public
     * @property prefix
     * @description - returns user's name prefix
     * @returns {String}
     */
    get prefix() {
        return this.details.prefix || '';
    }

    /**
     * @public
     * @property prefix
     * @description - sets the user's name prefix
     * @param {String} newPrefix
     */
    set prefix(newPrefix = undefined) {
        if (ValidationUtil.isString(newPrefix)) {
            this.details.prefix = newPrefix;
        } else {
            //TODO LOGGER.info
        }
    }

    /**
     * @public
     * @property firstName
     * @description - returns user's first name
     * @returns {String}
     */
    get firstName() {
        return this.details.firstName || '';
    }

    /**
     * @public
     * @property firstName
     * @description - sets the user's first name
     * @param {String} newFirstName
     */
    set firstName(newFirstName = undefined) {
        if (ValidationUtil.isString(newFirstName)) {
            this.details.firstName = newFirstName;
        } else {
            //TODO LOGGER.warn
        }
    }

    /**
     * @public
     * @property middleInitial
     * @description - returns user's middle initial
     * @returns {String}
     */
    get middleInitial() {
        return this.details.middleInitial || '';
    }

    /**
     * @public
     * @property middleInitial
     * @description - sets the user's middle initial
     * @param {String} newInitial
     */
    set middleInitial(newInitial = undefined) {
        if (ValidationUtil.isString(newInitial)) {
            this.details.middleInitial = newInitial;
        } else {
            //TODO LOGGER.info
        }
    }

    /**
     * @public
     * @property lastName
     * @description - returns user's last name
     * @returns {String}
     */
    get lastName() {
        return this.details.lastName || '';
    }

    /**
     * @public
     * @property firstName
     * @description - sets the user's first name
     * @param {String} newLastName
     */
    set lastName(newLastName = undefined) {
        if (ValidationUtil.isString(newLastName)) {
            this.details.firstName = newLastName;
        } else {
            //TODO LOGGER.warn
        }
    }

    /**
     * @public
     * @property suffix
     * @description - returns user's name suffix
     * @returns {String}
     */
    get suffix() {
        return this.details.suffix || '';
    }

    /**
     * @public
     * @property firstName
     * @description - sets the user's first name
     * @param {String} newSuffix
     */
    set suffix(newSuffix = undefined) {
        if (ValidationUtil.isString(newSuffix)) {
            this.details.firstName = newSuffix;
        } else {
            //TODO LOGGER.info
        }
    }

    /**
     * @public
     * @property property
     * @description - returns user's contracted property
     * @returns {Object}
     */
    get property() {
        return this._property || {
            name: ''
        };
    }

    /**
     * @public
     * @property property
     * @description - sets the user's contracted property
     * @param {Object} newProperty
     */
    set property(newProperty = undefined) {
        if (ValidationUtil.isObject(newProperty)) {
            this._property = newProperty;
        } else if (this._property === undefined) {
            this._property = null;
        } else {
            //TODO LOGGER.info
        }
    }
}
