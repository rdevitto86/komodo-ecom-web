import { Address, AddressAbstract } from './address';

/**
 * @interface
 * @description defines an abstract Payment Method object
 */
export interface PaymentMethodAbstract {
    name: string;
    cardNumber?: string;
    cardType?: string;
    cardNetwork?: string;
    isDefault?: boolean;
    address?: AddressAbstract;
}

/**
 * @class
 * @implements {PaymentMethodAbstract}
 * @description defines a new Payment Method model
 */
export class PaymentMethod implements PaymentMethodAbstract {
    private _name: string = 'New Method';
    private _cardNumber: string = '';
    private _cardType: string = '';
    private _cardNetwork: string = '';
    private _isDefault: boolean = false;
    private _address: Address;

    /**
     * @constructor
     * @param {Object<PaymentMethodAbstract>} [props] payment prop object
     */
    constructor(props?: PaymentMethodAbstract) {
        if (props && typeof props === 'object') {
            const {
                name,
                cardNumber,
                cardType,
                cardNetwork,
                isDefault,
                address
            } = props;

            this.name = name;
            this.cardNumber = cardNumber || '';
            this.cardType = cardType || '';
            this.cardNetwork = cardNetwork || '';
            this.isDefault = isDefault || false;

            this._address = new Address(address);
        } else {
            this._address = new Address();
        }
    }

    /**
     * @public
     * @property {String} name
     * @description method name (ex. PayPal, Amex)
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
     * @property {String} cardNumber
     * @description primary street address info
     */
    get cardNumber() {
        return this._cardNumber;
    }
    set cardNumber(cardNumber: string) {
        if (typeof cardNumber === 'string') {
            this._cardNumber = cardNumber;
        }
    }

    /**
     * @public
     * @property {String} cardType
     * @description primary street address info
     */
    get cardType() {
        return this._cardType;
    }
    set cardType(cardType: string) {
        if (typeof cardType === 'string') {
            this._cardType = cardType;
        }
    }

    /**
     * @public
     * @property {String} cardNetwork
     * @description payment card network
     */
    get cardNetwork() {
        return this._cardNetwork;
    }
    set cardNetwork(cardNetwork: string) {
        if (typeof cardNetwork === 'string') {
            this._cardNetwork = cardNetwork;
        }
    }

    /**
     * @public
     * @property {Boolean} isDefault
     * @description is current payment prefferred
     */
    get isDefault() {
        return this._isDefault;
    }
    set isDefault(isDefault: boolean) {
        if (typeof isDefault === 'boolean') {
            this._isDefault = isDefault;
        }
    }

    /**
     * @public
     * @property {Address} address
     * @description billing address
     */
    get address() {
        return this._address;
    }
    set address(address: Address) {
        if (address instanceof Address) {
            this._address = address;
        }
    }
}
