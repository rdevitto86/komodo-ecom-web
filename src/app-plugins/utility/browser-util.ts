/**
 * @interface
 * @description - defines the data object used to access browser meta data
 */
export interface BrowserUtil {
    osName: string;
    osVer: number | string;
    browserName: string;
    browserVer: number | string;
    userAgent: string;
    appVersion: string;
    platform: string;
    region: string;
    vendor: string;
    language: string;
    cookieEnabled: boolean;
}

/**
 * @singleton
 * @constant BrowserUtil
 * @description - collection of utlity functions that assists with browser info
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator
 */
export const BrowserUtil = Object.freeze(() => {
    //check if navigator is unavailable in current browser
    if (!navigator) {
        return {
            osName: 'Unknown',
            osVer: -1,
            browserName: 'Unknown',
            browserVer: -1,
            userAgent: 'Unknown',
            appVersion: 'Unknown',
            platform: 'Unknown',
            vendor: 'Unknown',
            region: 'Unknown',
            language: 'Unknown',
            cookieEnabled: false
        };
    }

    /**
     * @private
     * @interface
     * @description - defines a browser data map object
     */
    interface BrowserDataMap {
        name: string;
        value?: string;
        version: number | string;
    }

    /**
     * @function matchData
     * @description - parser that extract known browser/os information
     * @param {Array} agent - browser agent information
     * @param {Array} dataMap - os/browser data mapping
     */
    const matchData = (agent: string, dataMap: BrowserDataMap[]): BrowserDataMap => {
        //default browser/os information
        for (let i = 0, dLen = dataMap.length; i < dLen; i++) {
            const map: BrowserDataMap = dataMap[i];

            if ((new RegExp(map.value || '', 'i')).test(agent)) {
                //matches the current device to the equivalent mapping
                let matches = agent.match(
                    new RegExp(`${map.version}[- /:;]([\\d._]+)`, 'i')
                );

                let ver = '0'; //os/browser version

                if (matches && matches[1]) {
                    matches = matches[1].split(/[._]+/);

                    for (let j = 0, mLen = matches.length; j < mLen; j++) {
                        ver += (j === 0) ? `${matches[j]}.` : matches[j];
                    }
                }

                return {
                    name: map.name,
                    version: parseFloat(ver)
                };
            }
        }
        //default browser/os information
        return {
            name: 'Unknown',
            version: -1
        };
    };

    const navAgent = navigator.userAgent || 'Unknown';
    const navVersion = navigator.appVersion || 'Unknown';
    const navPlatform = navigator.platform || 'Unknown';
    const navVendor = navigator.vendor || 'Unknown';

    //array of browser (navigator) info
    const agent = ([
        navPlatform,
        navAgent,
        navVersion,
        navVendor
    ]).join(' ');

    //map of known operating systems (desktop/mobile)
    const os = matchData(agent, [
        { name: 'Windows', value: 'Win', version: 'NT' },
        { name: 'MacOS', value: 'Mac', version: 'OS X' },
        { name: 'iPhone', value: 'iPhone', version: 'OS' },
        { name: 'Android', value: 'Android', version: 'Android' },
        { name: 'iPad', value: 'iPad', version: 'OS' },
        { name: 'Linux', value: 'Linux', version: 'rv' },
        { name: 'Kindle', value: 'Silk', version: 'Silk' },
        { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
        { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
        { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
        { name: 'Palm', value: 'Palm', version: 'PalmOS' }
    ]);

    //map of known browsers
    const browser = matchData(agent, [
        { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
        { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
        { name: 'Safari', value: 'Safari', version: 'Version' },
        { name: 'IE', value: 'MSIE', version: 'MSIE' },
        //TODO - Microsoft Edge
        { name: 'Opera', value: 'Opera', version: 'Opera' },
        { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' },
        { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' }
    ]);

    return {
        osName: os.name,
        osVer: os.version,
        os: `${os.name}, ver ${os.version}`,
        browserName: browser.name,
        browserVer: browser.version,
        browser: `${browser.name}, ver ${browser.version}`,
        userAgent: navAgent,
        appVersion: navVersion,
        platform: navPlatform,
        region: 'TODO',
        vendor: navVendor,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled
    };
})();
