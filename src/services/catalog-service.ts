import ValidationUtil from '../plugins/komodo-util/validation-util';

/**
 * @class
 * @description handles requests/responses for the Catalog service
 */
export default class CatalogService {
    /**
     * @private
     * @static
     * @readonly
     * @property {String} _SERVICE_URL
     * @description url for the Catalog service
     */
    private static readonly _SERVICE_URL = 'https://www.todo.com';

    /**
     * @public
     * @static
     * @async
     * @function CatalogService.getItemDetails
     * @description fetches a catalog item's information (i.e. product/service)
     * @param {String | Number} id item ID (i.e. product number)
     * @returns {Promise<Object | Undefined>} item details
     */
    static async getItem(id: string | number): Promise<Object | undefined> {
        if (!ValidationUtil.isString(id) || !ValidationUtil.isNumber(id)) {
            return undefined;
        }

        const response = await fetch(`${this._SERVICE_URL}/item/${id}`);

        return (response.ok) ? response.json() : undefined;
    }

    /**
     * @public
     * @static
     * @async
     * @function CatalogService.getCategoryItems
     * @description fetches a list of items under a specified category
     * @param {String | Number} catID category ID
     * @returns {Promise<Array<Object> | undefined>} category list
     */
    static async getCategoryItems(catID: string | number): Promise<Array<Object> | undefined> {
        if (!ValidationUtil.isString(catID) || !ValidationUtil.isNumber(catID)) {
            return undefined;
        }

        // TODO - have ability of generic categories and user-specific ones

        const response = await fetch(`${this._SERVICE_URL}/cat/${catID}`);

        // @ts-ignore
        return (response.ok) ? (response.json()).items : undefined;
    }
}
