/**
 * Collection of email validation functions
 */
 export const EmailValidations = {
    isEmail,
    isGmail,
    isOutlook,
    isICloud,
    isYahoo,
    isAOL,
    isZoho,
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

/**
 * Checks if an email is registered with Google Mail
 * @param {string} email email string
 * @returns {boolean} true/false
 */
export function isGmail(email: string) {
    if (typeof email === 'string') {
        return email.includes('@gmail.com');
    }
    return false;
}

/**
 * Checks if an email is registered with Microsoft Outlook
 * @param {string} email email string
 * @returns {boolean} true/false
 */
export function isOutlook(email: string) {
    if (typeof email === 'string') {
        return email.includes('@outlook.com');
    }
    return false;
}

/**
 * Checks if an email is registered with Apple iCloud
 * @param {string} email email string
 * @returns {boolean} true/false
 */
export function isICloud(email: string) {
    if (typeof email === 'string') {
        return email.includes('@icloud.com');
    }
    return false;
}

/**
 * Checks if an email is registered with Yahoo Mail
 * @param {string} email email string
 * @returns {boolean} true/false
 */
export function isYahoo(email: string) {
    if (typeof email === 'string') {
        return email.includes('@yahoo.com');
    }
    return false;
}

/**
 * Checks if an email is registered with Zoho Mail
 * @param {string} email email string
 * @returns {boolean} true/false
 */
export function isZoho(email: string) {
    if (typeof email === 'string') {
        return email.includes('@zohomail.com');
    }
    return false;
}

/**
 * Checks if an email is registered with AOL Mail
 * @param {string} email email string
 * @returns {boolean} true/false
 */
export function isAOL(email: string) {
    if (typeof email === 'string') {
        return email.includes('@aol.com');
    }
    return false;
}
