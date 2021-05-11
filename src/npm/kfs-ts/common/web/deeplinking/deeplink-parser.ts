/**
 * Accepts a URL string and parses out deeplink parameters
 * @param {URL | string} url external url
 * @returns {Obkject | undefined} parsed URL
 */
export default function parseDeeplink(url: URL | string) {
    if (!(url instanceof URL)) {
        if (typeof url === 'string') {
            url = new URL(url);
        } else {
            return undefined;
        }
    }
    return undefined;
}
