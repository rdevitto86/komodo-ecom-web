import { CatalogItemJSON } from '../types/catalog-item';

/**
 * HTTP response for getItems operation
 */
 export interface GetCategoryItemsResponse extends Response {
    items: CatalogItemJSON[] | [];
}
