/**
 * @class
 * @description - a collection of validation functions used throughout the app
 */
export default class ValidationUtil {
    /**
     * @public
     * @static
     * @function Validators#validateEmail
     * @description - performs a regex on an email string
     * @param {String} email
     * @returns {Boolean}
     */
    public static validateEmail(email = ''): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * @public
     * @static
     * @function Validators#validatePhoneNumber
     * @description - performs a regex on a phone number
     * @param {String} phoneNum
     * @returns {Boolean}
     */
    public static validatePhoneNumber(phoneNum = ''): boolean {
        return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(phoneNum);
    }

    /**
     * @public
     * @static
     * @function Validators#validatePassword
     * @description - performs a regex on a password
     * VALID = 6 character minimum | contain at least one numeric digit | contain at least one uppercase
     * @param {String} phoneNum
     * @returns {Boolean}
     */
    public static validatePassword(password = ''): boolean {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
    }

    /**
     * @public
     * @static
     * @function Validators#isNullish
     * @description - determines if a value is null, undefined, or empty
     * @param {Any} value - value(s) to check
     * @returns {Boolean}
     */
    public static isNullish(value): boolean {
        return !value;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isString
     * @param {String} value - value to validate
     * @returns {Boolean}
     */
    public static isString(value): boolean {
        return typeof value === 'string' || value instanceof String;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isNumber
     * @param {Number} value - value to validate
     * @returns {Boolean}
     */
    public static isNumber(value): boolean {
        return typeof value === 'number' && Number.isFinite(value);
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isArray
     * @param {Array} value - value to validate
     * @returns {Boolean}
     */
    public static isArray(value): boolean {
        return value && typeof value === 'object' && value.constructor === Array;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isObject
     * @param {Object} value - value to validate
     * @returns {Boolean}
     */
    public static isObject(value): boolean {
        return value && typeof value === 'object' && value.constructor === Object;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isFunction
     * @param {Function} value - value to validate
     * @returns {Boolean}
     */
    public static isFunction(value): boolean {
        return typeof value === 'function';
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isDate
     * @param {Date} value - value to validate
     * @returns {Boolean}
     */
    public static isDate(value): boolean {
        return value instanceof Date;
    }

    /**
     * @public
     * @static
     * @function ValidationUtil#isError
     * @param {Error} value - value to validate
     * @returns {Boolean}
     */
    public static isError(value): boolean {
        return value instanceof Error;
    }
}
