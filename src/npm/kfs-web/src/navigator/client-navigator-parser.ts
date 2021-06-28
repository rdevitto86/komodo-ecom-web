import { PRIVACY_NOTICE_PART1, PRIVACY_NOTICE_PART2 } from './navigator-privacy-notice';

/**
 * Parses device details from browser's navigator object
 * @singleton
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Navigator
 */
class UserAgentParser {
    /**
     * Denotes if the current device is a desktop/laptop computer
     */
    isDesktop?: boolean;

    /**
     * Denotes if the current device is a mobile phone
     */
    isPhone?: boolean;

    /**
     * Denotes if the current device is a tablet
     */
    isTablet?: boolean;

    /**
     * Denotes if the current device runs a version of Android
     */
    isAndroid?: boolean;

    /**
     * Denotes if the current device runs a version of iOS
     */
    isIOS?: boolean;

    /**
     * Type of internet connection
     */
    connectionType?: string;

    constructor() {
        try {
            // check if navigator is unavailable for current browser
            if (!navigator) {
                return;
            }

            const {
                // @ts-ignore
                userAgent, connection, language, cookieEnabled, doNotTrack
            } = this;

            const agentLower = userAgent.toLowerCase();

            // parse platforms
            this.isDesktop = /windows|mac os|linux/i.test(agentLower);
            this.isPhone = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(agentLower);
            this.isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/
                .test(agentLower);

            // parse operating systems
            this.isAndroid = /android/i.test(agentLower);
            this.isIOS = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod']
                .includes(userAgent) || (userAgent.includes('Mac') && 'ontouchend' in document);

            // experimental feature on Android/Windows devices
            if (connection) {
                this.connectionType = connection.type;
                connection.onchange = (type: string) => {
                    this.connectionType = type;
                };
            }

            // print navigator privacy notice
            if (console && console.log) {
                console.log(
                    // eslint-disable-next-line prefer-template
                    `${PRIVACY_NOTICE_PART1}\n`
                    + 'Our anayltical data include things like:\n'
                    + `- User Agent Info => ${userAgent}\n`
                    + `- Language => ${language}\n`
                    + `- Cookie Availibility => ${cookieEnabled}\n`
                    + `- Connection Type => ${(connection || {}).type}\n`
                    + `- Do Not Track => ${doNotTrack}\n`
                    + `\n${PRIVACY_NOTICE_PART2}`
                );
            }
        } catch (err) {
            if (console && console.error) {
                console.error(`${err.message}`);
            }
        }
    }

    /**
     * The screen orientation for the current device
     */
    get orientation() {
        const { isDesktop } = this;

        if (isDesktop !== undefined) {
            if (isDesktop === false) {
                return (window.innerWidth > window.innerHeight)
                    ? 'Landscape' : 'Portrait';
            }
            return 'Desktop';
        }
        return undefined;
    }

    /**
     * Denotes if the current device has internet connectivity
     */
    get isOnline() {
        return (navigator) ? navigator.onLine : undefined;
    }
}

const singleton = new UserAgentParser();
export default singleton;
