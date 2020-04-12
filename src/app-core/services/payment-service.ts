import HTTPClient from './http-client';

import { Billing } from '../models/billing';
import { PaymentSubmission } from '../models/service-responses/payment-response';
import { ServiceError } from '../models/service-responses/service-error';

import LOGGER from '../../app-plugins/loggers/runtime-logger';

/**
 * @class
 * @extends HTTPClient
 * @description collection of operations used in the Payment service
 */
export default class PaymentService extends HTTPClient {
    /**
     * @public
     * @function PaymentService#submitPayment
     * @description accepts user billing data and submits a payment
     * @see HTTPClient#POST
     */
    submitPayment(billing: Billing, success?: Function, error?: Function): void {
        super.POST(process.env.URL_PAYMENT_SERVICE, {
            ...billing
        }).then((response?: PaymentSubmission) => {
            if (response && response.successful === true) {
                if (typeof success === 'function') {
                    success();
                }
            } else {
                //TODO - handle failed payment
            }
        }).catch((response: ServiceError) => {
            LOGGER.error(response);

            if (typeof error === 'function') {
                error();
            }
        });
    }
}
