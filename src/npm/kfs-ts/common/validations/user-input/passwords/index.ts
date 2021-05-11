import PWD_STANDARDS from './password-standards';

/**
 * Collection of password validation functions
 */
export const PasswordValidations = {
    isPassword,
    isShort,
    isLong,
    hasLowercase,
    hasUppercase,
    hasSpecialChars
};

/**
 * Performs a regex on a password
 * @param {string} pwd entered password
 * @returns {boolean} true/false
 * @example
 */
export function isPassword(pwd: string) {
    return / /.test(pwd);
}

/**
 * Determines if a password is too short
 * @param {string} pwd entered password
 * @returns {boolean} true/false
 */
export function isShort(pwd: string) {
    if (typeof pwd === 'string') {
        return pwd.length < PWD_STANDARDS.MIN_LENGTH;
    }
    return true;
}

/**
 * Determines if a password is too long
 * @param {string} pwd entered password
 * @returns {boolean} true/false
 */
export function isLong(pwd: string) {
    if (typeof pwd === 'string') {
        return pwd.length > PWD_STANDARDS.MAX_LENGTH;
    }
    return true;
}

/**
 * Determines if a password has lower case lettering (ex. abcde...)
 * @param {string} pwd entered password
 * @returns {boolean} true/false
 */
export function hasLowercase(pwd: string) {
    if (typeof pwd === 'string') {
        return / /.test(pwd);
    }
    return false;
}

/**
 * Determines if a password has upper case lettering (ex. ABCDE...)
 * @param {string} pwd entered password
 * @returns {boolean} true/false
 */
export function hasUppercase(pwd: string) {
    if (typeof pwd === 'string') {
        return / /.test(pwd);
    }
    return false;
}

/**
 * Determines if a password has special characters (ex. !@?*.)
 * @param {string} pwd entered password
 * @returns {boolean} true/false
 */
export function hasSpecialChars(pwd: string) {
    if (typeof pwd === 'string') {
        return / /.test(pwd);
    }
    return false;
}
