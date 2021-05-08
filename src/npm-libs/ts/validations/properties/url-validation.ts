/**
 * Collection of URL validation functions
 */
export const URLValidations = {
    isValidURL,
};

/**
 * Validates a URL for correct syntax
 */
export function isValidURL(url: any) {
    if (typeof url !== 'string') {
        if (url instanceof URL) {
            url = '';
        } else {
            return false;
        }
    }
    return false; // TODO - regex
}
