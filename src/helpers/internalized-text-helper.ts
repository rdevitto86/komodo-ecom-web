// i18n text mappings
import en from '../config/i18n/en';
import es from '../config/i18n/es';

// Utilities
import ValidationUtil from '../plugins/komodo-util/validation-util';

/**
 * @class
 * @singleton
 * @alias InternalizedTextHelper
 * @description stores and fetches both static and dynamic (server stored) text
 */
export default Object.freeze(new class InternalizedTextHelper {
    /**
     * @public
     * @static
     * @function InternalizedTextHelper#getLocal
     * @description gets locally internalized text from JSON
     * @param {String} keyword text keyword
     * @param {String?} forced forces a specific language (i.e. en)
     * @returns {String | Undefined} internalized text
     */
    static getLocal(keyword: string, forced?: string): string | undefined {
        try {
            if (!ValidationUtil.isString(keyword)) {
                return undefined;
            }

            switch (forced || navigator.language.slice(0, 2)) {
                case 'en':
                    // @ts-ignore
                    return en[keyword];
                case 'es':
                    // @ts-ignore
                    return es[keyword];
                default:
                    return undefined;
            }
        } catch (e) {
            return undefined;
        }
    }

    /**
     * @public
     * @static
     * @async
     * @function InternalizedTextHelper#getRemote
     * @description fetches text from a remote service
     * @param {String} keyword i18n keyword
     * @returns {Promise<String | Undefined>} remote text
     */
    static async getRemote(keyword: string, forced?: string): Promise<string | undefined> {
        try {
            if (!ValidationUtil.isString(keyword)) {
                return keyword;
            }

            // creates the resource pathname
            const lang = forced || navigator.language.slice(0, 2);

            // TODO - import URL from webpack environment
            // TODO - create Response type w/ sub-Promise type
            const response = await fetch(`https://www.todo.com/${lang}.json`);

            // TODO - remove once types are created
            // @ts-ignore
            return (response.ok) ? (response.json())[keyword] : undefined;
        } catch (e) {
            return undefined;
        }
    }
}());
