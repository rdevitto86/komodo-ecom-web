import HTTPClient from './http-client';

import { Billing } from '../models/billing';
import { PaymentSubmission } from '../models/service-responses/payment-response';
import { ErrorResponse } from '../models/service-responses/error-response';

import appConfig from '../resources/config/app-config.json';
import LOGGER from '../../app-plugins/loggers/runtime-logger';

/**
 * @class
 * @description - defines a new Payment Service singleton
 */
export default class PaymentService extends HTTPClient {
    /**
     * @public
     * @function PaymentService#submitPayment
     * @description - accepts user billing data and submits a payment
     * @see HTTPClient#POST
     */
    submitPayment(billing: Billing, success: Function, error: Function): void {
        super.POST(appConfig.URL_PAYMENT_SERVICE, {
            ...billing
        }).then((response?: PaymentSubmission) => {
            if (response && response.successful === true) {
                if (typeof success === 'function') {
                    success();
                }
            } else {
                //TODO - handle failed payment
            }
        }).catch((response: ErrorResponse) => {
            LOGGER.error(response);

            if (typeof error === 'function') {
                error();
            }
        });
    }
}
