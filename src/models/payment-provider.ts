import { Address, AddressAbstract } from './address';

/**
 * @interface
 * @description defines an abstract Payment Provider object
 */
export interface PaymentProviderAbstract {
    cardNumber?: string;
    cardType?: string;
    cardNetwork?: string;
    isPreferred?: boolean;
    address?: AddressAbstract;
}

/**
 * @class
 * @implements {PaymentProviderAbstract}
 * @description defines a new Payment Provider model
 */
export class PaymentProvider implements PaymentProviderAbstract {
    private _cardNumber: string = '';
    private _cardType: string = '';
    private _cardNetwork: string = '';
    private _isPreferred: boolean = false;
    private _address: Address;

    /**
     * @constructor
     * @param {Object<PaymentProviderAbstract>} [props] payment prop object
     */
    constructor(props?: PaymentProviderAbstract) {
        if (props && typeof props === 'object') {
            const {
                cardNumber, cardType, cardNetwork, isPreferred: isDefault, address
            } = props;

            this.cardNumber = cardNumber || '';
            this.cardType = cardType || '';
            this.cardNetwork = cardNetwork || '';
            this.isPreferred = isDefault || false;

            this._address = new Address(address);
        } else {
            this._address = new Address();
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
     * @property {Boolean} preferredPayment
     * @description is current payment prefferred
     */
    get isPreferred() {
        return this._isPreferred;
    }
    set isPreferred(isPreferred: boolean) {
        if (typeof isPreferred === 'boolean') {
            this._isPreferred = isPreferred;
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
