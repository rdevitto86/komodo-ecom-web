/**
 * @class
 * @description - - defines a new Billing object
 */
export class Billing {
    /**
     * @constructor
     * @param {string} ccNum 
     * @param {string} ccv 
     * @param {string} zip 
     * @param {Address} billingAddress 
     * @param {PayPal} paypal 
     */
    constructor(ccNum, ccv, zip, billingAddress, paypal) {
        //validate that the object has valid payment options
        if((!ccNum || !billingAddress) || !paypal) {
            return null;
        }

        //set billing info (if applicable)
        this.ccNum = (typeof ccNum === 'string') ? ccNum : null;
        this.ccv = (typeof ccv === 'string') ? ccv : null;
        this.zip = (typeof zip === 'string') ? zip : null;

        //set the billing address
        this.billingAddress = (billingAddress instanceof Address) ? billingAddress : null;

        //set PayPal details (if applicable)
        this.paypal = (paypal instanceof PayPal) ? paypal : null;
    }
}