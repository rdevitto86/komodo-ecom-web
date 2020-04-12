/**
 * @interface
 * @description defines a new abstract class for Payment Accounts
 */
export interface PaymentAccount {
    provider: string;
}

/**
 * @class PaymentAccount
 * @description defines a new Payment Account model
 */
export class PaymentAccount {
    public provider = '';

    /**
     * @constructor
     * @param {Object} details - payment account details
     */
    constructor(details: PaymentAccount) {
        const { provider } = details;

        this.provider = provider;
    }
}

export type PaymentAccountType = PaymentAccount | null;
