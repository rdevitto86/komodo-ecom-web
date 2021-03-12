import { PaymentMethod, PaymentMethodAbstract } from './payment-method';

/**
 * @interface
 * @description defines an abstract Billing object
 */
export interface BillingAbstract {
    isCashUser?: boolean;
    defaultMethod?: PaymentMethod | PaymentMethodAbstract
    paymentMethods?: PaymentMethodAbstract[] | Map<string, PaymentMethod>;
}

/**
 * @class
 * @version 1.0
 * @implements {BillingAbstract}
 * @description defines a new Billing model
 */
export class Billing implements BillingAbstract {
    private _isCashUser: boolean = false;
    private _defaultMethod?: PaymentMethod;
    private _paymentMethods: Map<string, PaymentMethod> = new Map();

    /**
     * @constructor
     * @param {Object<BillingAbstract>} [props] billing details object
     */
    constructor(props?: BillingAbstract) {
        if (props && props as BillingAbstract) {
            const {
                isCashUser, defaultMethod, paymentMethods
            } = props;

            if (typeof isCashUser === 'boolean') {
                this.isCashUser = isCashUser;
            }
            if (defaultMethod) {
                this._defaultMethod = new PaymentMethod(defaultMethod);
            }
            if (paymentMethods) {
                // for (const method of paymentMethods) {

                // }
            }
        }
    }

    /**
     * @public
     * @property {Boolean} isCashUser
     * @description flag for cash only users
     */
    get isCashUser() {
        return this._isCashUser;
    }
    set isCashUser(isCashUser: boolean) {
        if (typeof isCashUser === 'boolean') {
            this._isCashUser = isCashUser;
        }
    }

    /**
     * @public
     * @property {PaymentProvider | Undefined} defaultMethod
     * @description preferred/default payment method
     */
    get defaultMethod() {
        return this._defaultMethod;
    }
    set defaultMethod(method: PaymentMethod | undefined) {
        if (method instanceof PaymentMethod) {
            this._defaultMethod = method;
        }
    }

    /**
     * @public
     * @readonly
     * @property {Map<string, PaymentProvider>} paymentMethods
     * @description available payment methods
     */
    get paymentMethods() {
        return this._paymentMethods;
    }
}
