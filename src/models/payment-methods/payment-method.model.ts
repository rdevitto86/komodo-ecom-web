import { isAddress } from '../../npm/kfs-api/user-api/schemas/address';
import { isPaymentMethod, PaymentMethodJSON } from '../../npm/kfs-api/finance-api/schemas/payment-method';
import Address from '../address/address.model';

/**
 * Defines a new Payment Method model
 * @version 1.0.0
 */
export default class PaymentMethod {
    /**
     * Payment method name (ex. PayPal, Amex Preferred Card)
     */
    name: string | null = null;

    /**
     * Card number
     */
    cardNumber: string | null = null;

    /**
     * Card Issuer (ex. Bank of America, Chase, etc.)
     */
    cardType: string | null = null;

    /**
     * Card payment network (ex. Visa, Mastercard, etc.)
     */
    cardNetwork: string | null = null;

    /**
     * Card security code
     */
    securityCode: string | null = null;

    /**
     * Denotes if the current payment method is user default
     */
    isDefault: boolean = false;

    /**
     * Denotes if payment method is through a payment processor (ex. PayPal, Apple, Square, etc.)
     */
    isPaymentProcessor: boolean = false;

    /**
     * Card's billing address
     */
    billingAddress: Address | null = null;

    /**
     * @param {PaymentMethodJSON | PaymentMethod} [props] payment prop object
     */
    constructor(props?: PaymentMethodJSON | PaymentMethod) {
        if (isPaymentMethod(props)) {
            const {
                name,
                cardNumber,
                cardType,
                cardNetwork,
                isDefault,
                billingAddress,
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
