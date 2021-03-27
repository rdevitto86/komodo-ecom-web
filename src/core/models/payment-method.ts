import { Address, AddressJSON, isAddress } from './address';

/**
 * @interface
 * @description defines an abstract Payment Method object
 */
export interface PaymentMethodJSON {
    name: string | null;
    cardNumber?: string | null;
    cardType?: string | null;
    cardNetwork?: string | null;
    billingAddress: AddressJSON | null;
    isDefault?: boolean;
}

/**
 * @class
 * @version 1.0
 * @description defines a new Payment Method model
 */
export class PaymentMethod {
    /**
     * @public
     * @property {String | Null} name
     * @description method name (ex. PayPal, Amex)
     */
    public name: string | null = null;

    /**
     * @public
     * @property {String | Null} cardNumber
     * @description primary street address info
     */
    public cardNumber: string | null = null;

    /**
     * @public
     * @property {String | Null} cardType
     * @description primary street address info
     */
    public cardType: string | null = null;

    /**
     * @public
     * @property {String | Null} cardNetwork
     * @description payment card network
     */
    public cardNetwork: string | null = null;

    /**
     * @public
     * @property {Boolean} isDefault
     * @description is current payment prefferred
     */
    public isDefault: boolean = false;

    /**
     * @public
     * @property {AddressJSON | Null} billingAddress
     * @description billing address
     */
    public billingAddress: AddressJSON | null = null;

    /**
     * @constructor
     * @param {PaymentMethodJSON} [props] payment prop object
     */
    constructor(props?: PaymentMethodJSON) {
        if (isPaymentMethod(props)) {
            const {
                name,
                cardNumber,
                cardType,
                cardNetwork,
                isDefault,
                billingAddress
            } = props;

            this.name = name;
            this.isDefault = (typeof isDefault === 'boolean') ? isDefault : false;

            if (cardNumber) {
                this.cardNumber = cardNumber;
            }
            if (cardType) {
                this.cardType = cardType;
            }
            if (cardNetwork) {
                this.cardNetwork = cardNetwork;
            }
            if (isAddress(billingAddress)) {
                this.billingAddress = new Address(billingAddress);
            }
        }
    }
}

/**
 * @constant
 * @function isPaymentMethod
 * @description checks if an item is an Promotion type object
 * @param {Any} obj object to reference
 * @returns {Boolean} true/false
 */
 export const isPaymentMethod = (obj: any): obj is PaymentMethodJSON => (
    'name' in obj && 'billingAddress' in obj && 'percentOff' in obj && 'hasFreeShipping' in obj
);
