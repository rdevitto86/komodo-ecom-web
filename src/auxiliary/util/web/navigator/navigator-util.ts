/**
 * @class
 * @singleton
 * @version 1.0
 * @description creates a mapping of available browser details
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Navigator
 */
class NavigatorUtil {
    /**
     * @public
     * @property {Boolean} [isDesktop]
     * @description device is a desktop/laptop/full browser
     */
    public isDesktop?: boolean;

    /**
     * @public
     * @property {Boolean} [isPhone]
     * @description device is a mobile phone
     */
    public isPhone?: boolean;

    /**
     * @public
     * @property {Boolean} [isTablet]
     * @description device is a tablet
     */
    public isTablet?: boolean;

    /**
     * @public
     * @property {Boolean} [isAndroid]
     * @description device is running Android
     */
    public isAndroid?: boolean;

    /**
     * @public
     * @property {Boolean} [isIOS]
     * @description device is running iOS
     */
    public isIOS?: boolean;

    /**
     * @public
     * @property {String} [userAgent]
     * @description device and browser information
     */
    public userAgent?: string;

    /**
     * @public
     * @property {String} [language]
     * @description device language
     */
    public language?: string;

    /**
     * @public
     * @property {Boolean} [cookiesEnabled]
     * @description browser cookies enabled
     */
    public cookiesEnabled?: boolean;

    /**
     * @public
     * @property {String} [connectionType]
     * @description internet connection type
     */
    public connectionType?: string;

    /**
     * @public
     * @property {Boolean} [doNotTrack]
     * @description Do Not Track header enabled
     */
    public doNotTrack?: boolean;

    /**
     * @constructor
     * @description populates browser information on creation
     */
    constructor() {
        try {
            // check if navigator is unavailable for current browser
            if (!navigator) {
                return;
            }

            const {
                // @ts-ignore
                userAgent, connection, language, cookieEnabled, doNotTrack
            } = navigator;

            this.userAgent = userAgent;
            this.language = language;
            this.cookiesEnabled = cookieEnabled;

            const agentLower = userAgent.toLowerCase();

            const isDesktop = /windows|mac os|linux/i.test(agentLower);
            const isPhone = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(agentLower);
            const isAndroid = /android/i.test(agentLower);

            const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/
                .test(agentLower);

            const isIOS = [
                'iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'
            ].includes(userAgent) || (userAgent.includes('Mac') && 'ontouchend' in document);

            this.isDesktop = isDesktop;
            this.isPhone = isPhone;
            this.isAndroid = isAndroid;
            this.isTablet = isTablet;
            this.isIOS = isIOS;
            this.doNotTrack = (!!doNotTrack && doNotTrack === '1');

            // experimental feature on Android/Windows devices
            if (connection) {
                this.connectionType = connection.type;
                // @ts-ignore
                connection.onchange = (type) => {
                    this.connectionType = type;
                };
            }

            console.log(`
                We at Komodo believe in transparency when it comes to our customer's privacy. We do not sell any personal information for our benefit.
                We do however use anonymous, analytical data to improve website functionality. This information is accessible, by default, through your browser's JavaScript engine. 
                
                Our anayltical data include things like:
                - User Agent Info: ${userAgent}
                - Language: ${language}
                - Cookie Availibility: ${cookieEnabled}
                - Connection Type: ${(connection || {}).type}
                - Do Not Track: ${doNotTrack}
    
                You can learn more about JavaScript Web APIs at: https://developer.mozilla.org/en-US/docs/Web/API/Navigator
                
                Also, feel free to review our Privacy Policy at: TODO
            `);
        } catch (err) {
            // do nothing
        }
    }

    /**
     * @public
     * @property {String} orientation
     * @description gets the screen orientation for the current device
     */
    get orientation() {
        const { isDesktop } = this;

        if (isDesktop === undefined) {
            return undefined;
        }
        if (!isDesktop) {
            return (window.innerWidth > window.innerHeight) ? 'Landscape' : 'Portrait';
        }
        return 'Desktop';
    }

    /**
     * @public
     * @property {Boolean | Undefined} isOnline
     * @description checks the network connectivity status
     */
    // eslint-disable-next-line class-methods-use-this
    get isOnline() {
        return (navigator) ? navigator.onLine : undefined;
    }
}

const singleton = new NavigatorUtil();
export default singleton;
