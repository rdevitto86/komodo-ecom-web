import { CatalogItemJSON } from '../../types/catalog-items';
import { UserReviewJSON } from '../../types/user-review';
import { APIResponse } from './generic-api-responses';

/**
 * Defines response for getItem request
 * @extends APIResponse
 */
export interface GetItemResponse extends APIResponse {
    item?: CatalogItemJSON
}

/**
 * Defines response for getCategoryItems request
 * @extends APIResponse
 */
export interface GetCategoryItemsResponse extends APIResponse {
    items?: CatalogItemJSON[]
}

/**
 * Defines response for getReviews request
 * @extends APIResponse
 */
export interface GetReviewsResponse extends APIResponse {
    reviews?: UserReviewJSON[]
}

/**
 * Defines response for submitReview request
 * @extends APIResponse
 */
export interface SubmitReviewResponse extends APIResponse {}
