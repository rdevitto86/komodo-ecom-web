/**
 * Collection of zip (mailing) code validation functions
 */
 export const ZipcodeValidations = {
    isZipcode,
};

/**
 * Validates an entered postal (zip) code
 * @param {string} zip entered zipcode
 * @returns {boolean} true/false
 * @example
 *  - '12345'
 *  - '12345-6789'
 *  - '12345 1234'
 */
export function isZipcode(zip: string) {
    return /^\d{5}(?:[-\s]\d{4})?$/.test(zip);
}
