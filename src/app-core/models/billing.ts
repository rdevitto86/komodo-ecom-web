import { Address } from './address';
import { PaymentAccountType as ExternalAccount } from './payment-account';

/**
 * @interface
 * @description - defines an abstract Billing object
 */
export interface Billing {
    isCardDefaultPayment?: boolean;
    cardNumber?: string;
    cardType?: string;
    cardNetwork?: string;
    address?: Address | null;
    paymentAccounts?: ExternalAccount[];
}

/**
 * @class
 * @description - defines a new Billing singleton
 */
export class Billing {
    private static instance: Billing;

    public paypal: ExternalAccount = null;
    public applePay: ExternalAccount = null;
    public googlePay: ExternalAccount = null;
    public square: ExternalAccount = null;

    /**
     * @private
     * @constructor
     * @description - creates a new Billing singleton
     */
    private constructor() {
        this.cardNumber = '';
        this.cardType = '';
        this.cardNetwork = '';
        this.address = null;
        this.isCardDefaultPayment = true;
    }

    /**
     * @public
     * @static
     * @function Billing#getInstance
     * @description - gets the singleton instance for billing
     * @returns {Billing}
     */
    static getInstance(): Billing {
        if (!Billing.instance) {
            Billing.instance = new Billing();
        }
        return Billing.instance;
    }

    /**
     * @public
     * @function Billing#setBilling
     * @description - builds the Billing singleton
     * @param {Object} details - user's billing data
     */
    setBilling(details: Billing): void {
        const {
            cardNumber,
            cardType,
            cardNetwork,
            address,
            isCardDefaultPayment,
            paymentAccounts
        } = details;

        //set card meta data
        this.cardNumber = cardNumber;
        this.cardType = cardType;
        this.cardNetwork = cardNetwork;

        //set billing address
        if (address && address.constructor === Object) {
            this.address = new Address(address);
        }

        //set default payment flag
        this.isCardDefaultPayment = isCardDefaultPayment;

        if (paymentAccounts instanceof Array) {
            const [
                paypal, applePay, googlePay, square
            ] = paymentAccounts;

            //set payment account(s) meta data
            this.paypal = paypal;
            this.applePay = applePay;
            this.googlePay = googlePay;
            this.square = square;
        }
    }

    /**
     * @public
     * @function Billing#clearData
     * @description - resets all local data to the default state
     */
    clearData(): void {
        Billing.instance = new Billing();
    }
}
