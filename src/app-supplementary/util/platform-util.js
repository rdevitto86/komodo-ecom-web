/**
 * @const {Object}
 * @alias PlatformUtil
 * @version 1.0.0
 * @description creates a mapping of available browser details
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Navigator
 *
 * @typedef PlatformUtil
 * @type {Object}
 * @property {Boolean | Undefined} isDesktop
 * @property {Boolean | Undefined} isPhone
 * @property {Boolean | Undefined} isTablet
 * @property {Boolean | Undefined} isAndroid
 * @property {Boolean | Undefined} isIOS
 * @property {String | Undefined} userAgent
 * @property {String | Undefined} platform
 * @property {String | Undefined} language
 * @property {Boolean | Undefined} cookieEnabled
 * @property {Function} isOnline
 * @property {Function} orientation
 */
export default (() => {
    // check if navigator is unavailable for current browser
    if (!navigator) {
        return {
            isDesktop: undefined,
            isPhone: undefined,
            isTablet: undefined,
            isAndroid: undefined,
            isIOS: undefined,
            userAgent: undefined,
            platform: undefined,
            language: undefined,
            cookieEnabled: undefined,
            isOnline: () => undefined,
            orientation: () => undefined
        };
    }

    const {
        userAgent, platform, language, cookieEnabled
    } = navigator;

    const isDesktop = /Windows|MacOS|Linux/i.test(userAgent);
    const isPhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isAndroid = /Android/i.test(userAgent);

    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
        userAgent.toLowerCase()
    );

    const isIOS = [
        'iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'
    ].includes(platform) || (userAgent.includes('Mac') && 'ontouchend' in document);

    let orientation = 'Unknown';

    if (!isDesktop) {
        window.onorientationchange = (event) => {
            orientation = event.target.screen.orientation.angle;
        };
    } else {
        orientation = 'Desktop';
    }

    return {
        isDesktop,
        isPhone,
        isTablet,
        isAndroid,
        isIOS,
        userAgent: userAgent || 'Unknown',
        platform: platform || 'Unknown',
        language: language || 'Unknown',
        cookieEnabled: cookieEnabled || 'Unknown',
        isOnline: () => navigator.onLine,
        orientation: () => orientation
    };
})();
