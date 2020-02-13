/**
 * @class
 * @description - a collection of validation functions used throughout the app
 */
export class ValidationUtil {
    /**
     * @public
     * @function Validators#validateEmail
     * @description - performs a regex on an email string
     * @param {String} email
     * @returns {Boolean}
     */
    validateEmail(email = '') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * @public
     * @function Validators#validatePhoneNumber
     * @description - performs a regex on a phone number
     * @param {String} phoneNum
     * @returns {Boolean}
     */
    validatePhoneNumber(phoneNum = '') {
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phoneNum);
    }

    /**
     * @public
     * @function Validators#validatePassword
     * @description - performs a regex on a password
     * VALID = 6 character minimum | contain at least one numeric digit | contain at least one uppercase
     * @param {String} phoneNum
     * @returns {Boolean}
     */
    validatePassword(password = '') {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
    }

    /**
     * @public
     * @function Validators#validateUsername
     * @description - performs a regex on a user name
     * VALID = 3 to 22 characters | no . OR _ at start/end | no __ _. .. inside
     * @param {String} username
     * @returns {Boolean}
     */
    validateUsername(username = '') {
        return /^(?=.{3,22}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username);
    }

    /**
     * @public
     * @function Validators#validateVarType
     * @description - validates a variable type matches the targeted one
     * @param {Any} typeTarget - variable type to verify 
     * @param {String} value - variable to validate
     * @returns {Boolean}
     */
    validateTypeSingle(typeTarget, value = undefined) {
        switch(typeTarget) {
            case 'array':
                return value instanceof Array;
            case 'null':
            case null:
                return (value === 'null' || value === null);
            case 'undefined':
            case undefined:
                return (value === 'undefined' || value === undefined);
            case 'object':
                return (value !== null && typeof value === 'object');
            default:
                return typeof value === typeTarget;
        }
    }

    /**
     * @public
     * @function Validators#validateTypeMulti
     * @description - validates multiple variable types against the targeted one
     * @param {Any} typeTarget - variable type to verify 
     * @param {Array || Object} values - map of values to validate
     * @returns {Boolean}
     */
    validateTypeMulti(typeTarget, values = undefined) {
        if(!values) {
            return false;
        } else if(values !== null && typeof values === 'object') {
            values = Object.keys(values).map(key => values[key]);
        } else if(!(values instanceof Array)) {
            return false
        } else {
            //validate properties
            values.forEach(element => {
                if(!this.validateTypeSingle(typeTarget, element)) {
                    return false;
                }
            });
            return true;
        }
    }   
}