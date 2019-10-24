/**
 * @class
 * @description - defines a new User model object
 */
export class User {
    constructor(accountType = -1, userDetails = {}, billing = null, address = null) { 
        if(typeof userDetails !== 'object') {
            userDetails = {};
        }
        if(!(billing instanceof Billing)) {
            billing = null;
        }
        if(!(address instanceof Address)) {
            address = null;
        }
        if((typeof accountType === 'string' && !isNaN(parseInt(accountType))) || typeof accountType !== 'number') {
            accountType = -1;
        }

        //set the user account type
        this.acctType = (typeof accountType !== 'string') 
            ? accountType : parseInt(accountType);

        //set the user details
        this.details = {
            email: (userDetails.email) ? userDetails.email : '',
            phonePrimary: (userDetails.phonePrimary) ? userDetails.phonePrimary : '',
            phoneSecondary : (userDetails.phoneSecondary) ? userDetails.phoneSecondary : '',
            businessName: (userDetails.businessName) ? userDetails.businessName : '',
            firstName: (userDetails.firstName) ? userDetails.firstName : '',
            lastName: (userDetails.lastName) ? userDetails.lastName : ''
        }

        this.billing = billing; //set the financial/billing info (encrypted)
        this.address = address; //set the address info (encrypted)
    }
}