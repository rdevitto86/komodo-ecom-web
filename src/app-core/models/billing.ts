import { Address } from './address';
import { PaymentAccount, PaymentAccountType } from './payment-account';

/**
 * @interface
 * @description defines an abstract Billing object
 */
export interface Billing {
    isCardDefaultPayment?: boolean;
    cardNumber?: string;
    cardType?: string;
    cardNetwork?: string;
    address?: Address | null;
    paymentAccounts?: PaymentAccountType[];
}

/**
 * @singleton
 * @constant Billing
 * @class BillingModel
 * @description defines a new Billing singleton
 */
export const Billing = new class BillingModel {
    public cardNumber = '';
    public cardType = '';
    public cardNetwork = '';

    public address: Address | null = null;;
    public isCardDefaultPayment = true;

    public paypal: PaymentAccountType = null;
    public applePay: PaymentAccountType = null;
    public googlePay: PaymentAccountType = null;
    public square: PaymentAccountType = null;

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
        if (typeof cardNumber === 'string') {
            this.cardNumber = cardNumber;
        }
        if (typeof cardType === 'string') {
            this.cardType = cardType;
        }
        if (typeof cardNetwork === 'string') {
            this.cardNetwork = cardNetwork;
        }

        //set billing address
        if (address && address.constructor === Object) {
            this.address = new Address(address);
        }

        //set default payment flag
        if (typeof isCardDefaultPayment === 'boolean') {
            this.isCardDefaultPayment = isCardDefaultPayment;
        }

        //set external payment accounts
        if (paymentAccounts instanceof Array && paymentAccounts.length > 0) {
            const [paypal, applePay, googlePay, square] = paymentAccounts;

            //set payment account(s) meta data
            if (paypal instanceof PaymentAccount) {
                this.paypal = paypal;
            }
            if (applePay instanceof PaymentAccount) {
                this.applePay = applePay;
            }
            if (googlePay instanceof PaymentAccount) {
                this.googlePay = googlePay;
            }
            if (square instanceof PaymentAccount) {
                this.square = square;
            }
        }
    }

    /**
     * @public
     * @function Billing#reset
     * @description - resets all local data to the default state
     */
    reset(): void {
        this.cardNumber = '';
        this.cardType = '';
        this.cardNetwork = '';
        this.address = null;
        this.isCardDefaultPayment = true;
        this.paypal = null;
        this.applePay = null;
        this.googlePay = null;
        this.square = null;
    }
}();
