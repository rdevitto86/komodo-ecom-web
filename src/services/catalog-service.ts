import HTTPS from '../npm-libs/typescript/web/network/https';
import { CatalogItem, CatalogItemJSON } from '../models/catalog-item';
import { isUserReview, UserReview, UserReviewJSON } from '../models/user-review';
import Validations from '../npm-libs/typescript/util/validation/validations';
import ServiceException from '../npm-libs/typescript/exceptions/service-exception';
import {
    GetCategoryItemsResponse,
    GetItemResponse,
    GetReviewsResponse,
    SubmitReviewResponse
} from '../npm-libs/typescript/responses/catalog-api-responses';

// /**
//  * @private
//  * @constant {String} BASE_URL
//  * @description Catalog API endpoint
//  */
// const API_URL = `${process.env.CATALOG_API_URL || ''}/${process.env.CATALOG_API_VER || ''}`;

const API_URL = '';

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
     * @throws {ServiceException} service exception
     */
    async getItem(id: string): Promise<CatalogItem> {
        if (!Validations.isString(id)) {
            throw new ServiceException(400, 'invalid id param');
        }

        const response = await this.GET(`${API_URL}/item/${id}`);
        const body = response.json() as unknown as GetItemResponse;

        if (response.ok) {
            return new CatalogItem(body.item);
        }
        throw new ServiceException(response.status, body.message);
    }

    /**
     * @public
     * @async
     * @function CatalogService.getCategoryItems
     * @description fetches a list of items under a specified category
     * @param {String} catID category ID
     * @returns {Promise<CatalogItem[]>} category list
     * @throws {ServiceException} service exception
     */
    async getCategoryItems(catID: string | number): Promise<CatalogItem[]> {
        if (!Validations.isString(catID)) {
            throw new ServiceException(400, 'invalid category id param');
        }

        const response = await this.GET(`${API_URL}/category?id=${catID}`);
        const body = response.json() as unknown as GetCategoryItemsResponse;

        if (response.ok) {
            const { items } = body;

            // iterate through response items and build local models
            if (items && items.constructor === Array) {
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
            throw new ServiceException(500, 'item details missing from response');
        }
        throw new ServiceException(response.status, body.message);
    }

    /**
     * @public
     * @async
     * @function CatalogService.search
     * @description searches for a specified catalog item
     * @param {String} keyword search text
     * @param {String} [category] category filter
     * @returns {Promise<CatalogItem[]>} category list
     * @throws {ServiceException} service exception
     */
    async search(keyword: string, category?: string): Promise<CatalogItem[]> {
        if (!Validations.isString(keyword)) {
            throw new ServiceException(400, 'invalid search keyword param');
        }

        let url = `${API_URL}?keyword=${keyword}`;

        // add optional params
        if (typeof category === 'string') {
            url += `&category=${category}`;
        }

        const response = await this.GET(url);
        const body = response.json() as unknown as GetCategoryItemsResponse;

        if (response.ok && (body.items instanceof Array)) {
            return body.items.map((item) => new CatalogItem(item));
        }
        throw new ServiceException(response.status, body.message);
    }

    /**
     * @public
     * @async
     * @function CatalogService.getReviews
     * @description fetches a catalog item's review history
     * @param {String | Number} id catalog ID
     * @returns {Promise<UserReview[]>} item details
     * @throws {ServiceException} service exception
     */
    async getReviews(id: string | number): Promise<UserReview[]> {
        if (!Validations.isString(id) || !Validations.isNumber(id)) {
            throw new ServiceException(400, 'invalid id param');
        }

        const response = await this.GET(`${API_URL}/reviews/${id}`);
        const body = response.json() as unknown as GetReviewsResponse;

        if (response.ok && (body.reviews instanceof Array)) {
            return body.reviews.map((review) => new UserReview(review));
        }
        throw new ServiceException(response.status, body.message);
    }

    /**
     * @public
     * @async
     * @function CatalogService.submitReview
     * @description fetches a catalog item's review history
     * @param {UserReview | UserReviewJSON} review user review
     * @throws {ServiceException} service exception
     */
    async submitReview(review: UserReview | UserReviewJSON) {
        if (!isUserReview(review)) {
            throw new ServiceException(400, 'invalid user review');
        }

        const response = await this.POST(
            new Request(`${API_URL}/submitReview`, {
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
            const body = response.json() as unknown as SubmitReviewResponse;
            throw new ServiceException(response.status, body.message);
        }
    }
}
