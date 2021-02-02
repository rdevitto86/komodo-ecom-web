/**
 * @private
 * @constant SUPPORTED_LANGS
 * @description map of supported app languages
 * TODO - move to env properties file
 */
const SUPPORTED_LANGS = Object.freeze({
    'en': true,
    'es': true,
});

/**
 * @class
 * @alias i18nManager
 * @singleton
 * @version 1.0.0
 * @description stores and fetches both static and dynamic (server stored) text
 */
export default class InternalizationManager {
    /**
     * @constructor
     * @param {String} rootPath root i18n resource path
     * @param {String} [defaultLang] default language
     */
    constructor(rootPath, defaultLang = undefined) {
        if (!InternalizationManager.instance && typeof rootPath === 'string') {
            /**
             * @private
             * @readonly
             * @const {String} REMOTE_URL
             * @description remote i18n endpoint
             */
            // TODO - import from env instead
            const REMOTE_URL = 'https://www.todo.com';

            /**
             * @private
             * @var {String} _textFile
             * @description i18n file for the current language
             */
            let _textFile = null;

            /**
             * @private
             * @property {String} _language
             * @description default language
             */
            let _language = (SUPPORTED_LANGS[defaultLang]) ? defaultLang : 'en';

            /**
             * @private
             * @async
             * @function getFile
             * @description loads an i18n file
             * @param {String} lang i18n language
             */
            const getFile = async (lang) => (await import(`${rootPath}${lang}`)) || null;

            /**
             * @private
             * @async
             * @function setTextResource
             * @description loads and caches an i18n file
             * @param {String} lang i18n language
             */
            const loadResource = async (lang) => {
                if (_language === lang) {
                    return; // current language already set
                }

                const file = await getFile(lang);

                // validate JSON exists and set resource
                if (file) {
                    _textFile = file;
                    _language = lang;
                } else {
                    console.warn(`failed to fetch text resource "${lang}"`);
                }
            };

            // loads i18n resource
            loadResource(defaultLang);

            // return blank instance if path/language are invalid
            if (!_textFile) {
                return null;
            }

            /**
             * @public
             * @function InternalizedTextManager.getLocal
             * @description gets locally internalized text from JSON
             * @param {String} keyword search keyword
             * @param {String?} [override] language override
             * @returns {String | Undefined} internalized text
             */
            this.getLocal = (keyword, override) => {
                // fetch new language file (if override different than default)
                const file = (override && SUPPORTED_LANGS[override] && _language !== override)
                    ? getFile(override) : _textFile;

                return (file || {})[keyword];
            };

            /**
             * @public
             * @function InternalizedTextManager.getMultipleLocal
             * @description gets locally internalized text from JSON
             * @param {String[]} keyword keywords in order of retrieval
             * @param {String?} [override] language override
             * @returns {String[]} internalized text
             */
            this.getMultipleLocal = (keywords, override) => {
                if (keywords instanceof Array) {
                    const helper = this.getLocal; // prevent looped lookup
                    return [].map((key) => helper(key, override));
                }
                return [];
            };

            /**
             * @public
             * @async
             * @function InternalizedTextManager.getRemote
             * @description fetches text from a remote service
             * @param {String} keyword search keyword
             * @param {String?} [override] language override
             * @returns {Promise<String | Undefined>} remote text
             * @throws {ServiceError}
             */
            this.getRemote = async (keyword, override) => {
                if (typeof keyword !== 'string') {
                    return undefined;
                }

                const language = (typeof override === 'string') ? override : _language;

                return fetch(`${REMOTE_URL}/${language}.json`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .catch((e) => {
                        console.warn(`error occurred while fetching "${language}" keyword - ${e.message}`);
                        return undefined;
                    });
            };

            /**
             * @public
             * @function
             * @param {String} lang new default language
             * @description sets a new default language
             */
            this.setLanguage = (lang) => {
                if (SUPPORTED_LANGS[lang] && _language !== lang) {
                    loadResource(lang);
                }
            };

            // set singleton instance
            InternalizationManager.instance = Object.freeze(this);
        }
        return InternalizationManager.instance;
    }

    /**
     * @public
     * @static
     * @property {String} browserLanguage
     * @description fetches browser language
     */
    static get browserLanguage() {
        return navigator.language.slice(0, 2);
    }
}
