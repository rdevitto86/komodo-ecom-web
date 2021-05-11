// import HTTPS from '../../ts/web/network/https';
// import { I18nResponse } from '../../ts/api/responses/i18n-responses';
// import ServiceException from '../../ts/exceptions/service-exception';

import { isString } from '../../../validations/primitives/strings';

/**
 * Configuration object for the I18n Manager
 */
interface Config {
    enableLocal: boolean;
    enableRemote: boolean;
    languages: string[];
    preferredLang?: string;
    remoteEndpoint?: string;
    onChange?: Function;
}

// interface Subscriber {

// }

const DEFAULT_LANG = 'en';
// const _supportedLangs: string[] = [];
// const _localFiles: Map<string, any> = new Map();

let _currLang = DEFAULT_LANG;
// let _localEnabled = false;
// let _remoteEnabled = false;

// let _remoteEndpoint: string | null = null;

/**
 * Manages both local and remote i18n text assets
 * @version 1.0.0
 */
export default class I18nManager {
    /**
     * Callback executed on language change
     */
    onChange: Function = () => {};

    /**
     * @param {Config} config manager config properties
     */
    constructor(config?: Config) {
        if (config) {
            // TODO - set universal props
            // TODO - populate languages
            // TODO - if preferred lang isn't in list, ignore
        }
    }

    /**
     * Fetches text from local text file
     * @param {string} key search key
     * @returns {string} text
     */
    getLocal() {
        //
    }

    /**
     * Fetches text from a remote text file
     * @async
     * @param {string} key search key
     * @returns {string} text
     */
    async getRemote() {
        //
    }

    /**
     * Fetches text from a either a local or remote text file.
     * Searches local file first before request remote resource.
     * @async
     * @param {string} key search key
     * @returns {string} text
     */
    async getAnywhere() {
        // checks local files first before searching remote
    }

    /**
     * Subscribes a callback function to be excuted on language change
     * @param {Subscriber} subscriber subscriber info
     */
    subscribe() {
        // future enhancement
    }

    /**
     * Subscribes a callback function to be excuted on language change
     * @param {string} id subscriber identifier
     */
    unsubscribe() {
        // future enhancement
    }

    /**
     * Sets the default language output.
     * All i18n text will be returned in this language.
     * @param {string} lang operating language
     */
    setLanguage(lang: string) {
        // TODO - check if lang is in list of supported
        if (isString(lang)) {
            _currLang = lang;
        }
    }

    /**
     * The language that text is returned in
     */
    get outputs() {
        return _currLang;
    }

    // /**
    //  * Denotes if local text is enabled
    //  */
    // get localEnabled() {
    //     return _localEnabled;
    // }

    // /**
    //  * Denotes if remote text is enabled
    //  */
    // get remoteEnabled() {
    //     return _remoteEnabled;
    // }
}
