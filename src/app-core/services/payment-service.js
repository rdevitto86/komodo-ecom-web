import HTTPClient from './http-client';
import appConfig from '../resources/config/app-config.json';

/**
 * @class
 * @description - 
 */
class PaymentService extends HTTPClient {
    /**
     * 
     */
    submitPayment(billing = undefined, success = undefined, error = undefined) {
        super.POST(appConfig.URL_PAYMENT_SERVICE, {
            ...billing
        }).then((response) => {

            if (typeof success === 'function') {
                success();
            }
        }).catch((response) => {
            //TODO - LOGGER.error()

            if (typeof error === 'function') {
                error();
            }
        });
    }
}

const paymentService = new PaymentService();
Object.freeze(paymentService);

export default paymentService;
