/**
 * Collection of phone number validation functions
 */
export const PhoneValidations = {
    isPhoneNumber,
};

/**
 * Performs a regex on a phone number
 * @param {string} phoneNum entered phone number
 * @returns {boolean} true/false
 * @example
 *  - '(123) 456-7890'
 *  - '(123)456-7890'
 *  - '123-456-7890'
 *  - '123.456.7890'
 *  - '1234567890'
 *  - '+01234567890'
 *  - '000-12345678'
 */
export function isPhoneNumber(phoneNum: string) {
    return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(phoneNum);
}
