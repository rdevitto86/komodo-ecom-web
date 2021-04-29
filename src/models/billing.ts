import { PaymentMethod, PaymentMethodJSON } from './payment-method';

/**
 * @interface
 * @description defines an abstract Billing object
 */
export interface BillingJSON {
    defaultMethod: PaymentMethodJSON | null
    paymentMethods: PaymentMethodJSON[];
}

/**
 * @class
 * @version 1.0
 * @description defines a new Billing model
 */
export class Billing {
    /**
     * @private
     * @property {PaymentMethod | null} _defaultMethod
     * @description preferred/default payment method
     */
    private _defaultMethod: PaymentMethod | null = null;

    /**
     * @private
     * @property {Map<string, PaymentProvider>} paymentMethods
     * @description user-added payment methods
     */
    private _paymentMethods: Map<string, PaymentMethod> = new Map();

    /**
     * @constructor
     * @param {BillingJSON>} [props] billing details object
     */
    constructor(props?: BillingJSON) {
        if (isBilling(props)) {
            const { defaultMethod, paymentMethods } = props;

            // validate default method (JSON response and exsisting Billing object)
            if (defaultMethod) {
                this._defaultMethod = (defaultMethod instanceof PaymentMethod)
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
     * @public
     * @function Billing.getPaymentMethod
     * @description fetches a payment method from the map
     * @param {String} id payment identifier
     * @returns {PaymentMethod | Undefined} payment method
     */
    getPaymentMethod(id: string) {
        return this._paymentMethods.get(id);
    }

    /**
     * @public
     * @function Billing.addPaymentMethod
     * @description adds a new payment method to the model
     * @param {PaymentMethodJSON} method new payment method
     * @returns {Boolean} success/failure
     */
    addPaymentMethod(method: PaymentMethodJSON) {
        if (method && method as PaymentMethodJSON && method.name) {
            const exsisting = this.getPaymentMethod(method.name);

            // reject exsisting payment method
            if (!exsisting) {
                this._paymentMethods.set(method.name, new PaymentMethod(method));
                return true;
            }
        }
        return false;
    }

    /**
     * @public
     * @function Billing.removePaymentMethod
     * @description removes a payment method from the model
     * @param {PaymentMethodJSON} name payment method name
     * @returns {Boolean} success/failure
     */
    removePaymentMethod(name: string) {
        return this._paymentMethods.delete(name);
    }

    /**
     * @public
     * @function Billing.setDefaultPayment
     * @description sets the default payment method
     * @param {PaymentMethodJSON | Null} method new payment method
     * @param {PaymentMethodJSON} [id] exsisting payment method id
     * @returns {Boolean} success/failure
     */
    setDefaultPayment(method: PaymentMethodJSON | null, id?: string) {
        // check for specified payment method
        if (typeof id === 'string') {
            const exsisting = this.getPaymentMethod(id);

            if (exsisting && exsisting !== this._defaultMethod) {
                this._defaultMethod = exsisting;
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
     * @public
     * @function Billing.clearDefaultPayment
     * @description removes the default payment option
     */
    clearDefaultPayment() {
        this._defaultMethod = null;
    }

    /**
     * @public
     * @function Billing.clearPaymentMethods
     * @description removes all payment options
     */
    clearPaymentMethods() {
        this.clearDefaultPayment();
        this._paymentMethods = new Map();
    }

    /**
     * @public
     * @readonly
     * @property {PaymentMethod | Null} defaultMethod
     * @description preferred/default payment method
     */
    get defaultMethod() {
        return this._defaultMethod;
    }

    /**
     * @public
     * @readonly
     * @property {Number} totalPaymentMethods
     * @description total available payment methods
     */
    get totalPaymentMethods() {
        return this._paymentMethods.size;
    }
}

/**
 * @constant
 * @function isBilling
 * @description checks if an item is a Billing type object
 * @param {Any} obj object to reference
 * @returns {Boolean} true/false
 */
 export const isBilling = (obj: any): obj is BillingJSON => (
    'defaultMethod' in obj && 'paymentMethods' in obj
);
