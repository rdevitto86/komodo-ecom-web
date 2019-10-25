/**
 * @class
 * @description - defines a new User object
 */
export class User {
    /**
     * @constructor
     * @param {number} userRole - user role ID
     * @param {Object} userDetails - object containing user details
     * @param {Billing} billing - object containing billing/financial information
     * @param {Account} address - object containing address information
     */
    constructor(userRole = -1, userDetails = {}, billing = null, address = null) { 
        if(typeof userDetails !== 'object') {
            userDetails = {};
        }
        if(!(billing instanceof Billing)) {
            billing = null;
        }
        if(!(address instanceof Address)) {
            address = null;
        }
        if(typeof userRole !== 'number') {
            userRole = (typeof userRole === 'string' && !isNaN(parseInt(userRole)))
                ? parseInt(userRole) : -1;
        }

        //set the user account type
        this.accountType = userRole;

        //set the user details
        this.details = {
            email: (userDetails.email) ? userDetails.email : '',
            phonePrimary: (userDetails.phonePrimary) ? userDetails.phonePrimary : '',
            phoneSecondary : (userDetails.phoneSecondary) ? userDetails.phoneSecondary : '',
            businessName: (userDetails.businessName) ? userDetails.businessName : '',
            prefix: (userDetails.prefix) ? userDetails.prefix : '',
            firstName: (userDetails.firstName) ? userDetails.firstName : '',
            lastName: (userDetails.lastName) ? userDetails.lastName : '',
            suffix: (userDetails.suffix) ? userDetails.suffix : ''
        }

        this.billing = billing; //set the financial/billing info (encrypted)
        this.address = address; //set the address info (encrypted)
    }
}