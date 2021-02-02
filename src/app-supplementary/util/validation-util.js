/**
 * @class
 * @version 1.0.0
 * @description a collection of validation functions used throughout the app
 */
export default class ValidationUtil {
    /**
     * @public
     * @static
     * @function ValidationUtil#isNull
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isNull(value) {
        return !value && typeof value === 'object';
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isUndefined
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isUndefined(value) {
        return value === undefined;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isNullish
     * @description determines if a value is null, undefined, or empty
     * @param {Any} value value(s) to check
     * @returns {Boolean} true/false
     */
    static isNullish(value) {
        return !value;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isString
     * @param {any | Array<any>} value value to validate
     * @returns {Boolean} true/false
     */
    static isString(value) {
        // checks individual strings
        if (value.constructor === String || value instanceof String) {
            return true;
        }
        // checks arrays of strings
        if (this.isArray(value)) {
            for (const str of value) {
                if (!this.isString(str)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isEmptyString
     * @param {String} value value to validate
     * @returns {Boolean} true/false
     */
    static isEmptyString(value) {
        return value === '';
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isNumber
     * @param {any | Array<any>} value value to validate
     * @returns {Boolean} true/false
     */
    static isNumber(value) {
        // checks individual numbers
        if (value.constructor === Number && Number.isFinite(value)) {
            return true;
        }
        // checks arrays of numbers
        if (this.isArray(value)) {
            for (const num of value) {
                if (!this.isNumber(num)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isInt
     * @param {Number} value value to validate
     * @returns {Boolean} true/false
     */
    static isInt(value) {
        return this.isNumber(value) && Number.isInteger(value);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isFloat
     * @param {Number} value value to validate
     * @returns {Boolean} true/false
     */
    static isFloat(value) {
        return this.isNumber(value) && !Number.isInteger(value);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isBigInt
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isBigInt(value) {
        return value.constructor === BigInt;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isBoolean
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isBoolean(value) {
        return value.constructor === Boolean;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isFunction
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isFunction(value) {
        return value.constructor === Function;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isObject
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isObject(value) {
        return value.constructor === Object;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isEmptyObject
     * @param {Object} value value to validate
     * @returns {Boolean} true/false
     */
    static isEmptyObject(value) {
        return this.isObject(value) && Object.keys(value).length;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#hasObjectProperties
     * @description checks if an object has properties
     * @param {Object} value value to validate
     * @returns {Boolean} true/false
     */
    static hasObjectProperties(value) {
        return this.isObject(value) && Object.keys(value).length > 0;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isArray
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isArray(value) {
        return value.constructor === Array;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isEmptyArray
     * @param {Array<any>} value value to validate
     * @returns {Boolean} true/false
     */
    static isEmptyArray(value) {
        return this.isArray(value) && value.length === 0;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#hasArrayElements
     * @description checks if an array has elements
     * @param {Array<any>} value value to validate
     * @returns {Boolean} true/false
     */
    static hasArrayElements(value) {
        return this.isArray(value) && value.length > 0;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isDate
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isDate(value) {
        return value.constructor === Date;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isError
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isError(value) {
        return value.constructor === Error;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isSymbol
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isSymbol(value) {
        return value.constructor === Symbol;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isMap
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isMap(value) {
        return value.constructor === Map;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isWeakMap
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isWeakMap(value) {
        return value.constructor === WeakMap;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#validateEmail
     * @description performs a regex on an email string
     * @param {String} email entered email
     * @returns {Boolean} true/false
     */
    static validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#validatePhoneNumber
     * @description performs a regex on a phone number
     * @param {String} phoneNum entered phone number
     * @returns {Boolean} true/false
     */
    static validatePhoneNumber(phoneNum) {
        return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(phoneNum);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#validatePassword
     * @description performs a regex on a password
     * VALID = 6 char minimum | contain at least one numeric digit | contain at least one uppercase
     * @param {String} password entered password
     * @returns {Boolean} true/false
     */
    static validatePassword(password) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#validateAddress
     * @description validates an entered street address
     * @param {String} address entered address
     * @returns {Boolean} true/false
     */
    static validateAddress(address) {
        // TODO
        return / /.test(address);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#validateZipcode
     * @description validates an entered postal (zip) code
     * @param {String} zip entered zipcode
     * @returns {Boolean} true/false
     */
    static validateZipcode(zip) {
        // TODO
        return / /.test(zip);
    }
}
