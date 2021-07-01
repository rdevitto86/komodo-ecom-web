import { isString } from 'class-validator';
import HTTP from 'src/npm/kfs-web/src/http';
import HttpException from 'src/npm/kfs-web/src/http-exceptions';
import CatalogItem from '../models/catalog-items/catalog-item.model';
import { GetItemResponse } from '../npm/kfs-api/src/catalog-api/responses/get-item';
import { GetCategoryItemsResponse } from '../npm/kfs-api/src/catalog-api/responses/get-items';
import { CatalogItemJSON } from '../npm/kfs-api/src/catalog-api/types/catalog-item';

// TODO - move to api lib under requests
// TODO - move query param appendage logic to request object

/**
 * Handles requests and responses for the Catalog API
 */
export default class CatalogService {
    readonly API_URL = process.env.CATALOG_API_URL || '';

    /**
     * Fetches a catalog item's information (i.e. product/service)
     * @async
     * @param {string} id item ID (i.e. product number)
     * @returns {Promise<CatalogItem>} item details
     * @throws {ServiceException} service exception
     */
    async getItem(id: string): Promise<CatalogItem> {
        if (!isString(id)) {
            throw new HttpException(400, 'invalid id param');
        }

        const request = new Request(
            `${this.API_URL}/item/${id}`, 
            {
                method: 'GET',
                // TODO other params
            },
        );

        const response = await HTTP.GET(request);
        const body = response.json() as unknown as GetItemResponse;

        if (response.ok) {
            return new CatalogItem(body.item);
        }
        throw new HttpException(response.status, response.statusText);
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
            throw new HttpException(400, 'invalid category id param');
        }

        const request = new Request(
            `${this.API_URL}/category?id=${catID}`, 
            {
                method: 'GET',
                // TODO other params
            },
        );
        
        const response = await HTTP.GET(request);
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
            throw new HttpException(500, 'item details missing from response');
        }
        throw new HttpException(response.status, response.statusText);
    }

    /**
     * Searches for a specified catalog item
     * @async
     * @param {string} keyword search text
     * @param {string} [category] category filter
     * @returns {Promise<CatalogItem[]>} category list
     * @throws {ServiceException} service exception
     */
    // async search(keyword: string, category?: string): Promise<CatalogItem[]> {
    //     if (!isString(keyword)) {
    //         throw new HttpException(400, 'invalid search keyword param');
    //     }

    //     // TODO move this code to Request lib

    //     let url = `${this.API_URL}?keyword=${keyword}`;

    //     // add optional params
    //     if (typeof category === 'string') {
    //         url += `&category=${category}`;
    //     }

    //     const request = new Request(url, {
    //         method: 'GET',
    //         // TODO other params
    //     });

    //     const response = await this.GET(request);
    //     const body = response.json() as unknown as GetCategoryItemsResponse;

    //     if (response.ok && (body.items instanceof Array)) {
    //         return body.items.map((item) => new CatalogItem(item));
    //     }
    //     throw new HttpException(response.status, response.statusText);
    // }
}
