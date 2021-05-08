/**
 * Collection of email validation functions
 */
export const EmailValidations = {
    isEmail,
};

/**
 * Performs a simple regex on an email string
 * @param {string} email entered email
 * @returns {boolean} true/false
 * @example
 *  'anystring@anystring.anystring'
 */
export function isEmail(email: string) {
    return /^[^\s@]+@[^\s@]+$/.test(email);
}
