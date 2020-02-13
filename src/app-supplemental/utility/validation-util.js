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
     * @function Validators#validateType
     * @description - validates a variable type matches the targeted one
     * @param {Any} target - variable type to verify 
     * @param {Any} data - variable to validate
     * @returns {Boolean}
     */
    validateType(target, data = undefined) {
        if(data instanceof Array) {
            let i = data.length;
            while(i--) {
                if(!this.validateType(data[i])) {
                    return false; //array item(s) has invalid type
                }
            }
            return true; //item(s) type valid
        } else {
            //matches target type to value type
            switch(target) {
                case 'array':
                    return data instanceof Array;
                case 'null':
                case null:
                    return (data === 'null' || data === null);
                case 'undefined':
                case undefined:
                    return (data === 'undefined' || data === undefined);
                case 'object':
                    return (data !== null && typeof data === 'object');
                default:
                    return typeof data === target;
            }
        }
    } 
    
    /**
     * @public
     * @function Validators#areValuesEqual
     * @description - checks if multiple variables are equal to the targeted one
     * @param {Any} target - variable type to verify 
     * @param {Any} values - value(s) to compare
     * @returns {Boolean}
     */
    areValuesEqual(target, values = undefined) {
        if(!(values instanceof Array)) {
            return values === target;
        }
        
        let i = values.length;
        while(i--) {
            if(values[i] !== target) {
                return false;
            }
        }
        return true;
    }
}