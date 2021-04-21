import HTTPS from '../../auxiliary/util/web/network/https';
import { CatalogItem, CatalogItemJSON } from '../models/catalog-item';
import { isUserReview, UserReview, UserReviewJSON } from '../models/user-review';
import ExceptionFactory from './exceptions/ExceptionFactory';
import Validations from '../../auxiliary/util/validation/validations';

/**
 * @private
 * @constant {String} API_VER
 * @description api version
 */
const API_VER = process.env.API_CATALOG_VER;

/**
 * @private
 * @constant {String} BASE_URL
 * @description url for the Catalog API
 */
const BASE_URL = `https://someazurelink/catalog-search-prc-api/${API_VER}`;

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
     * @param {String} id item ID (i.e. product number)
     * @returns {Promise<CatalogItem>} item details
     * @throws {Error} service exception
     * @see ExceptionFactory
     */
    async getItem(id: string) {
        if (!Validations.isString(id)) {
            throw ExceptionFactory.build(400, 'invalid id param');
        }

        const response = await this.GET(`${BASE_URL}/item/${id}`);
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
     * @param {String} catID category ID
     * @returns {Promise<CatalogItem[]>} category list
     * @throws {Error} service exception
     * @see ExceptionFactory
     */
    async getCategoryItems(catID: string | number) {
        if (!Validations.isString(catID)) {
            throw ExceptionFactory.build(400, 'invalid category id param');
        }

        const response = await this.GET(`${BASE_URL}/category?id=${catID}`);
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

    /**
     * @public
     * @async
     * @function CatalogService.search
     * @description searches for a specified catalog item
     * @param {String} keyword search text
     * @param {String} [category] category filter
     * @returns {Promise<CatalogItem[]>} category list
     * @throws {Error} service exception
     * @see ExceptionFactory
     */
    async search(keyword: string, category?: string) {
        if (!Validations.isString(keyword)) {
            throw ExceptionFactory.build(400, 'invalid search keyword param');
        }

        let url = `${BASE_URL}?keyword=${keyword}`;

        // add optional params
        if (typeof category === 'string') {
            url += `&category=${category}`;
        }

        const response = await this.GET(url);
        const body = response.json();

        if (response.ok) {
            return new CatalogItem(body);
        }
        throw ExceptionFactory.build(response.status, body.message);
    }

    /**
     * @public
     * @async
     * @function CatalogService.getReview
     * @description fetches a catalog item's review history
     * @param {String | Number} id catalog ID
     * @returns {Promise<UserReview>} item details
     * @throws {Error} service exception
     * @see ExceptionFactory
     */
    async getReview(id: string | number) {
        if (!Validations.isString(id) || !Validations.isNumber(id)) {
            throw ExceptionFactory.build(400, 'invalid id param');
        }

        const response = await this.GET(`${BASE_URL}/reviews/${id}`);
        const body = response.json();

        if (response.ok) {
            return new UserReview(body);
        }
        throw ExceptionFactory.build(response.status, body.message);
    }

    /**
     * @public
     * @async
     * @function CatalogService.submitReview
     * @description fetches a catalog item's review history
     * @param {UserReview | UserReviewJSON} review user review
     * @throws {Error} service exception
     * @see ExceptionFactory
     */
    async submitReview(review: UserReview | UserReviewJSON) {
        if (!isUserReview(review)) {
            throw ExceptionFactory.build(400, 'invalid user review');
        }

        const response = await this.POST(
            new Request(`${BASE_URL}/submitReview`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    review
                })
            })
        );

        if (!response.ok) {
            throw ExceptionFactory.build(response.status, response.json().message);
        }
    }
}
