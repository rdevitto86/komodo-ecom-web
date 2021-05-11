// import URLStandard from './url-standards';

/**
 * Collection of URL validation functions
 */
 export const URLValidations = {
    isValidURL,
    hasParam,
    hasParams,
    hasHTTPS,
};

/**
 * Validates a URL string for correct syntax
 * @param {string | URL} url URL to validate
 * @return {boolean} true/false
 */
export function isValidURL(url: URL | string) {
    if (typeof url !== 'string') {
        if (url instanceof URL) {
            url = url.toString();
        } else {
            return false;
        }
    }
    return / /.test(url);
}

/**
 * Checks if a URL object contains a specific query param.
 * Recommended for longer URLs.
 * @param {URL} url URL to validate
 * @param {string} key query param to find
 * @return {boolean} true/false
 */
export function hasParam(url: URL, key: string) {
    if (url instanceof URL && typeof key === 'string') {
        return url.searchParams.get(key);
    }
    return false;
}

/**
 * Checks if a URL object contains specific params.
 * Recommended for longer URLs.
 * @param {URL} url URL to validate
 * @param {string[]} keys list of query params
 * @return {boolean} true/false
 */
export function hasParams(url: URL, keys: string[]) {
    if (url instanceof URL && keys instanceof Array) {
        const params = url.searchParams;
        for (let i = keys.length; i--;) {
            if (!params.get(keys[i])) {
                return false;
            }
        }
        return true;
    }
    return false;
}

/**
 * Checks if a URL object contains a the HTTPS protocol
 * @param {URL} url URL to validate
 * @param {string} key query param to find
 * @return {boolean} true/false
 */
export function hasHTTPS(url: URL | string) {
    if (typeof url !== 'string') {
        if (url instanceof URL) {
            url = url.protocol;
        } else {
            return false;
        }
    }
    return url.includes('https');
}
