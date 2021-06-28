import { CatalogItemJSON, isCatalogItem } from '../types/catalog-item';

/**
 * HTTP response for getItem operation
 */
export interface GetItemResponse {
    item: CatalogItemJSON | null;
}

export class GetItemResponse {
    item: CatalogItemJSON | null = null;

    /**
     * @param {Response} response api response object 
     * @param {CatalogItemJSON} item catalog item data
     */
    constructor(item: CatalogItemJSON) {
        if (isCatalogItem(item)) {
            this.item = item;
        }
    }
}
