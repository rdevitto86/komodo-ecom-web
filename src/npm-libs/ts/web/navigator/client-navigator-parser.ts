import { PRIVACY_NOTICE_PART1, PRIVACY_NOTICE_PART2 } from './navigator-privacy-notice';

/**
 * @singleton
 * @version 1.0.0
 * @extends Navigator
 * @description parses device details from browser's navigator object
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Navigator
 */
class ClientNavigatorParser extends Navigator {
    /**
     * @description device is a desktop/laptop/full browser
     */
    isDesktop?: boolean;

    /**
     * @description device is a mobile phone
     */
    isPhone?: boolean;

    /**
     * @description device is a tablet
     */
    isTablet?: boolean;

    /**
     * @description device is running Android
     */
    isAndroid?: boolean;

    /**
     * @description device is running iOS
     */
    isIOS?: boolean;

    /**
     * @description device is running iOS
     */
    connectionType?: string;

    /**
     * @description populates browser information on creation
     */
    // eslint-disable-next-line constructor-super
    constructor() {
        try {
            super();

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
     * @description dynamically calculates the screen orientation for the current device
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
     * @description dynamically checks the network connectivity status
     */
    // eslint-disable-next-line class-methods-use-this
    get isOnline() {
        return (navigator) ? navigator.onLine : undefined;
    }
}

const singleton = new ClientNavigatorParser();
export default singleton;
