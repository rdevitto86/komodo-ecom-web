/**
 * @class
 * @version 1.0
 * @description a collection of validation functions used throughout the app
 */
export default class ValidationUtil {
    /**
     * @public
     * @static
     * @function ValidationUtil.isNull
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isNull(value: any) {
        return !value && typeof value === 'object';
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isUndefined
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isUndefined(value: any) {
        return value === undefined;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isNullish
     * @description determines if a value is null, undefined, or empty
     * @param {Any} value value(s) to check
     * @returns {Boolean} true/false
     */
    static isNullish(value: any) {
        return !value;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isString
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isString(value: any) {
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
     * @function ValidationUtil.isEmptyString
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isEmptyString(value: any) {
        return value === '';
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isNumber
     * @param {any} value value to validate
     * @returns {Boolean} true/false
     */
    static isNumber(value: any) {
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
     * @function ValidationUtil.isInt
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isInt(value: any) {
        return this.isNumber(value) && Number.isInteger(value);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isFloat
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isFloat(value: any) {
        return this.isNumber(value) && !Number.isInteger(value);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isBigInt
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isBigInt(value: any) {
        return value.constructor === BigInt;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isBoolean
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isBoolean(value: any) {
        return value.constructor === Boolean;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isFunction
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isFunction(value: any) {
        return value.constructor === Function;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isObject
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isObject(value: any) {
        return value.constructor === Object;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isEmptyObject
     * @param {Object} value value to validate
     * @returns {Boolean} true/false
     */
    static isEmptyObject(value: any) {
        // TODO handle Map scenario
        return this.isObject(value) && Object.keys(value).length;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.hasProperties
     * @description checks if an object has properties
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static hasProperties(value: any) {
        // TODO handle Map scenario
        return this.isObject(value) && Object.keys(value).length > 0;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isArray
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isArray(value: any) {
        return value.constructor === Array;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isEmptyArray
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isEmptyArray(value: any) {
        return this.isArray(value) && value.length === 0;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.hasElements
     * @description checks if an array has elements
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static hasElements(value: any) {
        return this.isArray(value) && value.length > 0;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isDate
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isDate(value: any) {
        return value.constructor === Date;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isError
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isError(value: any) {
        return value.constructor === Error;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isSymbol
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isSymbol(value: any) {
        return value.constructor === Symbol;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isMap
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isMap(value: any) {
        return value.constructor === Map;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.isWeakMap
     * @param {Any} value value to validate
     * @returns {Boolean} true/false
     */
    static isWeakMap(value: any) {
        return value.constructor === WeakMap;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.validateEmail
     * @description performs a regex on an email string
     * @param {String} email entered email
     * @returns {Boolean} true/false
     */
    static validateEmail(email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.validatePhoneNumber
     * @description performs a regex on a phone number
     * @param {String} phoneNum entered phone number
     * @returns {Boolean} true/false
     */
    static validatePhoneNumber(phoneNum: string) {
        return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(phoneNum);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.validatePassword
     * @description performs a regex on a password
     * VALID = 6 char minimum | contain at least one numeric digit | contain at least one uppercase
     * @param {String} password entered password
     * @returns {Boolean} true/false
     */
    static validatePassword(password: string) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.validateAddress
     * @description validates an entered street address
     * @param {String} address entered address
     * @returns {Boolean} true/false
     */
    static validateAddress(address: string) {
        // TODO
        return / /.test(address);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.validateZipcode
     * @description validates an entered postal (zip) code
     * @param {String} zip entered zipcode
     * @returns {Boolean} true/false
     */
    static validateZipcode(zip: string) {
        // TODO
        return / /.test(zip);
    }
}
