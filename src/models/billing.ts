/**
 * @interface
 * @description defines an abstract Billing object
 */
export interface BillingAbstract {

}

/**
 * @class
 * @implements {BillingAbstract}
 * @description defines a new Billing model
 */
export class Billing implements BillingAbstract {
    /**
     * @constructor
     * @param {Object<BillingAbstract>} [props] billing details object
     */
    constructor(props?: BillingAbstract) {
        if (props && typeof props === 'object') {
            // TODO
        }
    }
}
