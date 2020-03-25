import ValidationUtil from '../../app-plugins/utility/validation-util';

/**
 * @class PaymentAccount
 * @description - defines a new payment account model object
 */
export default class PaymentAccount {
    /**
     * @constructor
     * @param {Object} details - payment account details
     */
    constructor(details = undefined) {
        if (!ValidationUtil.isObject(details)) {
            return this;
        }

        //TODO - fill in payment details
    }

    //TODO - fill out getters/setters
}
