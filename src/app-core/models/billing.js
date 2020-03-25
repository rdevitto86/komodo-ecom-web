import Address from './address';
import PaymentAccount from './payment-account';

import ValidationUtil from '../../app-plugins/utility/validation-util';

/**
 * @class
 * @description - - defines a new Billing object
 */
export default class Billing extends Address {
    /**
     * @constructor
     * @param {Object} billing - object containing billing details
     */
    constructor(billing = undefined) {
        super(); //apply address properties

        //validate that the object has valid payment options
        if (!ValidationUtil.isObject(billing)) {
            return this;
        }

        const {
            cardNumber, cvv, cardZip
        } = billing;

        this.cardNumber = cardNumber || '';
        this.cvv = cvv || '';
        this.cardZip = cardZip || '';

        if (ValidationUtil.Object(billing.accounts)) {
            const {
                paypal, applePay, googlePay, square
            } = billing.accounts;

            this.paypal = paypal || null;
            this.applePay = applePay || null;
            this.googlePay = googlePay || null;
            this.square = square || null;
        }
    }

    /**
     * @public || null
     * @property cardNumber
     * @description - gets the card number (credit, debit, etc.)
     * @returns {String}
     */
    get cardNumber() {
        return this._cardNumber || '';
    }

    /**
     * @public
     * @property cardNumber
     * @description - sets the creedit card number
     * @param {String} cardNumber
     */
    set cardNumber(cardNumber = undefined) {
        if (ValidationUtil.isString(cardNumber)) {
            this._ccNum = cardNumber;
        }
    }

    /**
     * @public
     * @property cvv
     * @description - gets the credit card number
     * @returns {String}
     */
    get cvv() {
        return this._ccNum || '';
    }

    /**
     * @public
     * @property cvv
     * @description - sets the verification value
     * @param {String} cvv
     */
    set cvv(cvv = undefined) {
        if (ValidationUtil.isString(cvv)) {
            this._ccNum = cvv;
        }
    }

    /**
     * @public
     * @property
     * @description - gets the payment card number
     * @returns {String}
     */
    get cardZip() {
        return this._ccNum || '';
    }

    /**
     * @public
     * @property
     * @description - sets the payment card number
     * @param {String} cardZip
     */
    set cardZip(cardZip = undefined) {
        if (ValidationUtil.isString(cardZip)) {
            this._cardZip = cardZip;
        }
    }

    /**
     * @public
     * @property paypal
     * @description - gets the PayPal account information
     * @return {Address}
     */
    get paypal() {
        return this._paypal || null;
    }

    /**
     * @public
     * @property paypal
     * @description - sets the PayPal account information
     * @param {Object} details
     */
    set paypal(details = undefined) {
        if (ValidationUtil.isObject(details)) {
            this._paypal = new PaymentAccount(details);
        }
    }

    /**
     * @public
     * @property applePay
     * @description - gets the Apple Pay account information
     * @return {PaymentAccount}
     */
    get applePay() {
        return this._applePay || null;
    }

    /**
     * @public
     * @property applePay
     * @description - sets the Apple Pay account information
     * @param {Object} details
     */
    set applePay(details = undefined) {
        if (ValidationUtil.isObject(details)) {
            this._applePay = new PaymentAccount(details);
        }
    }

    /**
     * @public
     * @property googlePay
     * @description - gets the Google Pay account information
     * @return {PaymentAccount}
     */
    get googlePay() {
        return this._googlePay || null;
    }

    /**
     * @public
     * @property googlePay
     * @description - sets the Google Pay account information
     * @param {Object} details
     */
    set googlePay(details = undefined) {
        if (ValidationUtil.isObject(details)) {
            this._googlePay = new PaymentAccount(details);
        }
    }

    /**
     * @public
     * @property square
     * @description - gets the Square Pay account information
     * @return {PaymentAccount}
     */
    get square() {
        return this._square || null;
    }

    /**
     * @public
     * @property square
     * @description - sets the Square Pay account information
     * @param {Object} details
     */
    set square(details = undefined) {
        if (ValidationUtil.isObject(details)) {
            this._square = new PaymentAccount(details);
        }
    }
}
