/**
 * @class PaymentAccount
 * @description - defines a new Payment Account model
 */
export default class PaymentAccount {
    private provider = -1;

    /**
     * @constructor
     * @param {Object} details - payment account details
     */
    constructor(details = undefined) {
        const { provider } = details;

        if (typeof provider === 'number' && provider > 0) {
            this.provider = provider;
        }
    }

    /**
     * @public
     * @funtion PaymentAccount#getProvider
     * @description - returns the account provider number
     * @returns {Number}
     */
    public getProvider(): number {
        return this.provider;
    }

    //TODO - fill out getters/setters
}
