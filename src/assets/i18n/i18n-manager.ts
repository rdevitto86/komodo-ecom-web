/* eslint-disable class-methods-use-this */
import HTTPS from '../../npm-libs/typescript/web/network/https';

/**
 * @private
 * @constant {Object} SUPPORTED_LANGS
 * @description map of supported app languages
 * TODO - move to env properties file
 */
const SUPPORTED_LANGS: {[key:string]: boolean} = Object.freeze({
    'en': true,
    'es': true,
});

/**
 * @private
 * @constant {String | Null} REMOTE_ENABLED
 * @description enables/disables remote i18n proeprties
 */
const REMOTE_ENABLED = process.env.ENABLE_I18N_REMOTE;

/**
 * @private
 * @constant {String | Null} REMOTE_HOST
 * @description host domain of remote i18n service
 */
const REMOTE_HOST = process.env.URL_I18N_HOST;

/**
 * @private
 * @var {JSON | Null} _textFile
 * @description i18n file for the current language
 */
let _textFile: any = null; // TODO - set type once known

/**
 * @private
 * @async
 * @function getFile
 * @description loads an i18n file
 * @param {String} lang i18n language
 * @returns {Promise<Any> | Null} i18n JSON
 */
const getFile = async (lang: string) => {
    try {
        return (await import(`./${lang}`));
    } catch (err) {
        console.error(`failed to fetch text resource "${lang}"`);
        return null;
    }
};

/**
 * @class
 * @singleton
 * @version 1.0
 * @extends {HTTPS}
 * @description stores and fetches both static and dynamic, server stored text
 */
class InternalizationManager extends HTTPS {
    /**
     * @public
     * @property {String} language
     * @description language used for i18n
     */
    public language: string | null = null;

    /**
     * @constructor
     * @description encapsulates variables and binds i18n functionality
     */
    constructor() {
        super();

        // check if remote i18n functionality is enabled
        if (REMOTE_ENABLED !== 'TRUE') {
            // disable fetch if false
            this.getRemote = async () => undefined;
        }

        const browserLang = navigator.language.slice(0, 2);

        // loads i18n resource with current browser language, default to english
        this.setLanguage(
            (SUPPORTED_LANGS[browserLang]) ? browserLang : 'en'
        );
    }

    /**
     * @public
     * @function InternalizedTextManager.getLocal
     * @description gets locally internalized text from JSON
     * @param {String} keyword search keyword
     * @returns {String | Undefined} internalized text
     */
    getLocal(keyword: string) {
        return (_textFile) ? _textFile[keyword] : undefined;
    }

    /**
     * @public
     * @function InternalizedTextManager.getMultipleLocal
     * @description gets locally internalized text from JSON
     * @param {String[]} keyword keywords in order of retrieval
     * @returns {String[]} internalized text
     */
    getMultipleLocal(keywords: string[]) {
        if (keywords instanceof Array) {
            const helper = this.getLocal; // prevent looped lookup
            return [].map((key) => helper(key));
        }
        return [];
    }

    /**
     * @public
     * @async
     * @function InternalizedTextManager.getRemote
     * @description fetches text from a remote service
     * @param {String} keyword search keyword
     * @returns {Promise<String | Undefined>} remote text
     * @throws {Error}
     * @see HTTPS.GET
     */
    async getRemote(keyword: string) {
        if (typeof keyword !== 'string') {
            return undefined;
        }
        if (typeof this.language !== 'string') {
            return undefined;
        }

        // fetch i18n keyword for current language
        return this.GET(`${REMOTE_HOST}/${this.language}?keyword=${keyword}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response;
            })
            .catch((err: Response) => {
                throw new Error(err.statusText);
            });
    }

    /**
     * @public
     * @async
     * @function InternalizedTextManager.setLanguage
     * @param {String} lang new default language
     * @description sets a new i18n language
     */
    async setLanguage(lang: string) {
        if (SUPPORTED_LANGS[lang] && (lang !== this.language || !_textFile)) {
            this.language = lang;
            const file = await getFile(lang);

            if (file) {
                _textFile = file; // cache i18n resource
            } else {
                console.warn(`i18n resource "${lang}" does not exist`);
            }
        }
    }

    /**
     * @public
     * @function InternalizedTextManager.clear
     * @description clears language and i18n resource
     */
    clear() {
        this.language = null;
        _textFile = null;
    }
}

const singleton = new InternalizationManager();
export default singleton;
