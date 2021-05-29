import HTTP from '../npm/kfs-ts/web/network/http/rest';
import {
    GetCategoryItemsResponse,
    GetItemResponse,
    GetReviewsResponse,
    SubmitReviewResponse,
} from '../npm/ec-shared/api/responses/catalog-api-responses';
import ServiceException from '../npm/kfs-ts/exceptions/service-exception';
import CatalogSearchAPIHeaders from '../npm/ec-shared/api/headers/catalog-api-headers';
import { KEY_SESH_ACCESS_TOKEN } from '../config/session-storage-config';
import CatalogItem from '../models/catalog-items/catalog-item.model';
import { CatalogItemJSON } from '../npm/ec-shared/types/catalog-items';
import UserReview from '../models/user-reviews/user-review.model';
import { isUserReview, UserReviewJSON } from '../npm/ec-shared/types/user-review';
import { isString } from '../npm/kfs-ts/validations/primitives/strings';
import { isNumber } from '../npm/kfs-ts/validations/primitives/numbers';

// /**
//  * @private
//  * @constant {string} BASE_URL
//  * @description Catalog API endpoint
//  */
// const API_URL = `${process.env.CATALOG_API_URL || ''}/${process.env.CATALOG_API_VER || ''}`;

const API_URL = '';

/**
 * Handles requests and responses for the Catalog API
 * @version 1.0.0
 * @extends HTTP
 */
export default class CatalogService extends HTTP {
    /**
     * Fetches a catalog item's information (i.e. product/service)
     * @async
     * @param {string} id item ID (i.e. product number)
     * @returns {Promise<CatalogItem>} item details
     * @throws {ServiceException} service exception
     */
    async getItem(id: string): Promise<CatalogItem> {
        if (!isString(id)) {
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
     * Fetches a list of items under a specified category
     * @async
     * @param {string} catID category ID
     * @returns {Promise<CatalogItem[]>} category list
     * @throws {ServiceException} service exception
     */
    async getCategoryItems(catID: string | number): Promise<CatalogItem[]> {
        if (!isString(catID)) {
            throw new ServiceException(400, 'invalid category id param');
        }

        const response = await this.GET(`${API_URL}/category?id=${catID}`);
        const body = response.json() as unknown as GetCategoryItemsResponse;

        if (response.ok) {
            const { items } = body;

            if (items && items.constructor === Array) {
                const categoryItems = [];

                // iterate through response items and build local models
                for (let i = 0, len = items.length; i < len; i++) {
                    const item = items[i];
                    if (item) {
                        categoryItems.push(
                            new CatalogItem(item as CatalogItemJSON),
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
     * Searches for a specified catalog item
     * @async
     * @param {string} keyword search text
     * @param {string} [category] category filter
     * @returns {Promise<CatalogItem[]>} category list
     * @throws {ServiceException} service exception
     */
    async search(keyword: string, category?: string): Promise<CatalogItem[]> {
        if (!isString(keyword)) {
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
     * Fetches a catalog item's review history
     * @async
     * @param {string | number} id catalog ID
     * @returns {Promise<UserReview[]>} item details
     * @throws {ServiceException} service exception
     */
    async getReviews(id: string | number): Promise<UserReview[]> {
        if (!isString(id) || !isNumber(id)) {
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
     * Fetches a catalog item's review history
     * @async
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
                headers: new CatalogSearchAPIHeaders(
                    sessionStorage.getItem(KEY_SESH_ACCESS_TOKEN),
                    null, // TODO
                ),
                body: JSON.stringify({
                    review,
                }),
            }),
        );

        if (!response.ok) {
            const body = response.json() as unknown as SubmitReviewResponse;
            throw new ServiceException(response.status, body.message);
        }
    }
}
