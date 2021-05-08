/**
 * Collection of password validation functions
 */
export const PasswordValidations = {
    isPassword,
};

/**
 * Performs a regex on a password
 * @param {string} password entered password
 * @returns {boolean} true/false
 * @example
 */
export function isPassword(password: string) {
    return / /.test(password);
}
