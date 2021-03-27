import HTTPS from '../../auxiliary/util/web/network/https';
import { CatalogItem, CatalogItemJSON } from '../models/catalog-item';
import ExceptionFactory from './exceptions/ExceptionFactory';
import ValidationUtil from '../../auxiliary/util/primitives/validation-util';

/**
 * @private
 * @constant {String} SERVICE_URL
 * @description url for the Catalog API
 */
const SERVICE_URL = 'https://www.todo.com';

/**
 * @class
 * @version 1.0
 * @extends {HTTPS}
 * @description handles requests/responses for the Catalog API
 */
export default class CatalogService extends HTTPS {
    /**
     * @public
     * @async
     * @function CatalogService.getItem
     * @description fetches a catalog item's information (i.e. product/service)
     * @param {String | Number} id item ID (i.e. product number)
     * @returns {Promise<CatalogItem>} item details
     * @throws {Error} service exception
     * @see ExceptionFactory
     */
    async getItem(id: string | number): Promise<CatalogItem> {
        if (!ValidationUtil.isString(id) || !ValidationUtil.isNumber(id)) {
            throw ExceptionFactory.build(400, 'invalid id param');
        }

        const response = await this.GET(`${SERVICE_URL}/item/${id}`);
        const body = response.json();

        if (response.ok) {
            return new CatalogItem(body);
        }
        throw ExceptionFactory.build(response.status, body.message);
    }

    /**
     * @public
     * @async
     * @function CatalogService.getCategoryItems
     * @description fetches a list of items under a specified category
     * @param {String | Number} catID category ID
     * @returns {Promise<CatalogItem[]>} category list
     * @throws {Error} service exception
     * @see ExceptionFactory
     */
    async getCategoryItems(catID: string | number): Promise<CatalogItem[]> {
        if (!ValidationUtil.isString(catID) || !ValidationUtil.isNumber(catID)) {
            throw ExceptionFactory.build(400, 'invalid category id param');
        }

        // TODO - have ability of generic categories and user-specific ones

        const response = await this.GET(`${SERVICE_URL}/cat/${catID}`);
        const body = response.json();

        if (response.ok) {
            const { items } = body;

            // iterate through response items and build local models
            if (items.constructor === Array) {
                const categoryItems = [];

                for (const item of items) {
                    if (item) {
                        categoryItems.push(
                            new CatalogItem(item as CatalogItemJSON)
                        );
                    }
                }
                return categoryItems;
            }
            throw ExceptionFactory.build(500, 'item details missing from response');
        }
        throw ExceptionFactory.build(response.status, body.message);
    }
}
