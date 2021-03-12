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
     * @example
     *  - 'test123'
     *  - ['t', 'e', 's', 't']
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
        return (value.constructor === Number && Number.isFinite(value));
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
        // check for Object type
        if (this.isObject(value) && Object.keys(value).length) {
            return true;
        }
        // check for Map type
        if (this.isMap(value) && value.size) {
            return true;
        }
        return false;
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
     * @description performs a simple regex on an email string
     * @param {String} email entered email
     * @returns {Boolean} true/false
     * @example
     *  - 'anystring@anystring.anystring'
     */
    static validateEmail(email: string) {
        return /^[^\s@]+@[^\s@]+$/.test(email);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.validatePhoneNumber
     * @description performs a regex on a phone number
     * @param {String} phoneNum entered phone number
     * @returns {Boolean} true/false
     * @example
     *  - '(123) 456-7890'
     *  - '(123)456-7890'
     *  - '123-456-7890'
     *  - '123.456.7890'
     *  - '1234567890'
     *  - '+01234567890'
     *  - '000-12345678'
     */
    static validatePhoneNumber(phoneNum: string) {
        return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(phoneNum);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.validateZipcode
     * @description validates an entered postal (zip) code
     * @param {String} zip entered zipcode
     * @returns {Boolean} true/false
     * @example
     *  - '12345'
     *  - '12345-6789'
     *  - '12345 1234'
     */
    static validateZipcode(zip: string) {
        return /^\d{5}(?:[-\s]\d{4})?$/.test(zip);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil.validatePassword
     * @description performs a regex on a password
     * @param {String} password entered password
     * @returns {Boolean} true/false
     * @example
     */
    static validatePassword(password: string) {
        return / /.test(password);
    }
}
