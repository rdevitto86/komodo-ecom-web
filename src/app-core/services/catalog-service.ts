import HTTP from '../../app-auxiliary/util/web/network/http';
import ValidationUtil from '../../app-auxiliary/util/primitives/validation-util';
import { CatalogItem, CatalogItemJSON } from '../models/catalog-item';

// /**
//  * @private
//  * @type {CategoryItem}
//  * @description TODO
//  */
// type CategoryItem = {
//     id: string
// };

/**
 * @class
 * @version 1.0
 * @description handles requests/responses for the Catalog service
 */
export default class CatalogService extends HTTP {
    /**
     * @private
     * @readonly
     * @property {String} _SERVICE_URL
     * @description url for the Catalog service
     */
    private readonly _SERVICE_URL = 'https://www.todo.com';

    /**
     * @public
     * @async
     * @function CatalogService.getItemDetails
     * @description fetches a catalog item's information (i.e. product/service)
     * @param {String | Number} id item ID (i.e. product number)
     * @returns {Promise<Object | Undefined>} item details
     */
    async getItem(id: string | number): Promise<Object | undefined> {
        if (!ValidationUtil.isString(id) || !ValidationUtil.isNumber(id)) {
            return undefined;
        }

        const response = await this.GET(`${this._SERVICE_URL}/item/${id}`);
        return (response.ok) ? new CatalogItem(response.json()) : undefined;
    }

    /**
     * @public
     * @async
     * @function CatalogService.getCategoryItems
     * @description fetches a list of items under a specified category
     * @param {String | Number} catID category ID
     * @returns {Promise<CatalogItem[] | Undefined>} category list
     */
    async getCategoryItems(catID: string | number): Promise<CatalogItem[] | undefined> {
        if (!ValidationUtil.isString(catID) || !ValidationUtil.isNumber(catID)) {
            return undefined;
        }

        // TODO - have ability of generic categories and user-specific ones

        const response = await this.GET(`${this._SERVICE_URL}/cat/${catID}`);

        const { items } = response.json();
        const categoryItems = [];

        // iterate through response items and build local models
        if (items && items.length) {
            for (const item in items) {
                if (item) {
                    categoryItems.push(new CatalogItem(item));
                }
            }
        }

        // @ts-ignore
        return (response.ok) ? categoryItems : undefined;
    }
}
