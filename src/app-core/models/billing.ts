import Address from './address';
import PaymentAccount from './payment-account';

/**
 * @class
 * @description - defines a new Billing singleton
 */
class Billing {
    private _isCardDefaultPayment = true;

    private _cardNumber = '';
    private _cardType = '';
    private _cardNetwork = '';
    private _address: Address = null;

    private _paypal: PaymentAccount = null;
    private _applePay: PaymentAccount = null;
    private _googlePay: PaymentAccount = null;
    private _square: PaymentAccount = null;

    /**
     * @public
     * @function Billing#setBilling
     * @description - builds the Billing singleton
     * @param {Object} details - user's billing data
     */
    public setBilling(details): void {
        const {
            cardNumber,
            cardType,
            cardNetwork,
            address,
            isCardDefaultPayment
        } = details;

        //set card meta data
        this.cardNumber = cardNumber;
        this.cardType = cardType;
        this.cardNetwork = cardNetwork;
        this.address = address;

        this.isCardDefaultPayment = isCardDefaultPayment;

        const {
            paypal, applePay, googlePay, square
        } = details.paymentAccounts;

        //set payment account(s) meta data
        this.paypal = paypal;
        this.applePay = applePay;
        this.googlePay = googlePay;
        this.square = square;
    }

    /**
     * @public
     * @property isCardDefaultPayment
     * @description - gets the card default payment flag
     * @returns {Boolean}
     */
    get isCardDefaultPayment(): boolean {
        return this._isCardDefaultPayment;
    }

    /**
     * @public
     * @property isCardDefaultPayment
     * @description - sets the card default payment flag
     * @param {Boolean} isDefault
     */
    set isCardDefaultPayment(isDefault) {
        if (typeof isDefault === 'boolean') {
            this._isCardDefaultPayment = isDefault;
        }
    }

    /**
     * @public
     * @property cardNumber
     * @description - gets the card number
     * @returns {String}
     */
    get cardNumber(): string {
        return this._cardNumber;
    }

    /**
     * @public
     * @property cardNumber
     * @description - sets the card number
     * @param {String} cardNumber
     */
    set cardNumber(cardNumber) {
        if (typeof cardNumber === 'string') {
            this._cardNumber = cardNumber;
        }
    }

    /**
     * @public
     * @property cardType
     * @description - gets the card type (credit, debit, etc.)
     * @returns {String}
     */
    get cardType(): string {
        return this._cardType;
    }

    /**
     * @public
     * @property cardType
     * @description - sets the card type (credit, debit, etc.)
     * @param {String} cardType
     */
    set cardType(cardType) {
        if (typeof cardType === 'string') {
            this._cardType = cardType;
        }
    }

    /**
     * @public
     * @property cardNetwork
     * @description - gets the card network (Visa, Mastercard, etc.)
     * @returns {String}
     */
    get cardNetwork(): string {
        return this._cardNetwork;
    }

    /**
     * @public
     * @property cardNetwork
     * @description - sets the card network (Visa, Mastercard, etc.)
     * @param {String} cardNetwork
     */
    set cardNetwork(cardNetwork) {
        if (typeof cardNetwork === 'string') {
            this._cardNetwork = cardNetwork;
        }
    }

    /**
     * @public
     * @property address
     * @description - gets the card's billing address
     * @returns {Address}
     */
    get address(): Address {
        return this._address;
    }

    /**
     * @public
     * @property address
     * @description - sets the card's billing address
     * @param {Object} address
     */
    set address(address) {
        if (typeof address === 'object') {
            this._address = (address) ? new Address(address) : null;
        }
    }

    /**
     * @public
     * @property paypal
     * @description - gets the user's PayPal account meta data
     * @returns {PaymentAccount}
     */
    get paypal(): PaymentAccount {
        return this._paypal;
    }

    /**
     * @public
     * @property paypal
     * @description - sets the user's PayPal account meta data
     * @param {Object} details - account details
     */
    set paypal(details) {
        if (typeof details === 'object') {
            this._paypal = (details) ? new PaymentAccount(details) : null;
        }
    }

    /**
     * @public
     * @property applePay
     * @description - gets the user's Apple Pay account meta data
     * @returns {PaymentAccount}
     */
    get applePay(): PaymentAccount {
        return this._applePay;
    }

    /**
     * @public
     * @property applePay
     * @description - sets the user's Apple Pay account meta data
     * @param {Object} details - account details
     */
    set applePay(details) {
        if (typeof details === 'object') {
            this._applePay = (details) ? new PaymentAccount(details) : null;
        }
    }

    /**
     * @public
     * @property googlePay
     * @description - gets the user's Google Pay account meta data
     * @returns {PaymentAccount}
     */
    get googlePay(): PaymentAccount {
        return this._googlePay;
    }

    /**
     * @public
     * @property googlePay
     * @description - sets the user's Google Pay account meta data
     * @param {Object} details - account details
     */
    set googlePay(details) {
        if (typeof details === 'object') {
            this._googlePay = (details) ? new PaymentAccount(details) : null;
        }
    }

    /**
      * @public
      * @property square
      * @description - gets the user's Square account meta data
      * @returns {PaymentAccount}
      */
    get square(): PaymentAccount {
        return this._square;
    }

    /**
     * @public
     * @property square
     * @description - sets the user's Square account meta data
     * @param {Object} details - account details
     */
    set square(details) {
        if (typeof details === 'object') {
            this._square = (details) ? new PaymentAccount(details) : null;
        }
    }
}

/**
 * @interface
 * @description - defines abstract properties of a Billing model
 */
export interface BillingAbstract {
    setBilling(details: object): void;
    //TODO - see if get/set properties are needed here
}

export const Singleton = Object.freeze(new Billing());
