/**
 * @class
 * @description - a collection of validation functions used throughout the app
 */
export class Validators {
    /**
     * @constructor
     */
    constructor() {

    }

    /**
     * @function Validators#validateEmail
     * @description - performs a regex on an email string
     * @param {string} email
     * @returns {boolean}
     */
    validateEmail(email = '') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * @function Validators#validatePhoneNumber
     * @description - performs a regex on a phone number
     * @param {string} phoneNum
     * @returns {boolean}
     */
    validatePhoneNumber(phoneNum = '') {
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phoneNum);
    }

    /**
     * @function Validators#validatePassword
     * @description - performs a regex on a password
     * VALID = 6 character minimum | contain at least one numeric digit | contain at least one uppercase
     * @param {string} phoneNum
     * @returns {boolean}
     */
    validatePassword(password = '') {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
    }

    /**
     * @function Validators#validateUsername
     * @description - performs a regex on a user name
     * VALID = 3 to 22 characters | no . OR _ at start/end | no __ _. .. inside
     * @param {string} username
     * @returns {boolean}
     */
    validateUsername(username = '') {
        return /^(?=.{3,22}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username);
    }
}