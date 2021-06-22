import { APIResponse } from '../../generics/responses';
import { CatalogItemJSON } from '../schemas/catalog-item';
import { UserReviewJSON } from '../schemas/user-review';

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
