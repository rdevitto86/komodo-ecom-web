import { BillingJSON, isBilling } from '../../npm/kfs-api/src/user-api/schemas/billing';
import { isPaymentMethod, PaymentMethodJSON } from '../../npm/kfs-api/src/finance-api/schemas/payment-method';
import PaymentMethod from '../payment-methods/payment-method.model';

/**
 * Defines a new Billing model
 */
export default class Billing {
    /**
     * Default payment method
     */
    defaultMethod: PaymentMethod | null = null;

    /**
     * User-added payment methods
     */
    paymentMethods: Map<string, PaymentMethod> = new Map();

    /**
     * @param {BillingJSON | Billing} [props] billing details object
     */
    constructor(props?: BillingJSON | Billing) {
        if (isBilling(props)) {
            const { defaultMethod, paymentMethods } = props;

            // validate default method (JSON response and exsisting Billing object)
            if (defaultMethod) {
                this.defaultMethod = (defaultMethod instanceof PaymentMethod)
                    ? defaultMethod : new PaymentMethod(defaultMethod);
            }
            // check for array type (JSON responses)
            if (paymentMethods instanceof Array) {
                const { addPaymentMethod } = this;

                for (let i = 0, len = paymentMethods.length; i < len; i++) {
                    addPaymentMethod(paymentMethods[i]);
                }
            }
        }
    }

    /**
     * Fetches a payment method from the map
     * @param {string} id payment identifier
     * @returns {PaymentMethod | undefined} payment method
     */
    getPaymentMethod(id: string) {
        return this.paymentMethods.get(id);
    }

    /**
     * Adds a new payment method to the model
     * @param {PaymentMethodJSON} method new payment method
     * @returns {boolean} success/failure
     */
    addPaymentMethod(method: PaymentMethodJSON) {
        if (isPaymentMethod(method)) {
            const existing = this.getPaymentMethod(method.name);

            // reject exsisting payment method
            if (!existing) {
                this.paymentMethods.set(method.name, new PaymentMethod(method));
                return true;
            }
        }
        return false;
    }

    /**
     * Removes a payment method from the model
     * @param {PaymentMethodJSON} name payment method name
     * @returns {boolean} success/failure
     */
    removePaymentMethod(name: string) {
        return this.paymentMethods.delete(name);
    }

    /**
     * Sets the default payment method
     * @param {PaymentMethodJSON | null} method new payment method
     * @param {PaymentMethodJSON} [id] exsisting payment method id
     * @returns {boolean} success/failure
     */
    setDefaultPayment(method: PaymentMethodJSON | null, id?: string) {
        // check for specified payment method
        if (typeof id === 'string') {
            const exsisting = this.getPaymentMethod(id);

            if (exsisting && exsisting !== this.defaultMethod) {
                this.defaultMethod = exsisting;
                return true;
            }
        // create and add new payment method
        } else if (method && method as PaymentMethodJSON) {
            return this.addPaymentMethod(method);
        }
        // invalid data
        return false;
    }

    /**
     * Removes the default payment option
     */
    clearDefaultPayment() {
        this.defaultMethod = null;
    }

    /**
     * Removes all payment options
     */
    clearPaymentMethods() {
        this.clearDefaultPayment();
        this.paymentMethods = new Map();
    }

    /**
     * Total available payment methods
     */
    get totalPaymentMethods() {
        return this.paymentMethods.size;
    }
}
