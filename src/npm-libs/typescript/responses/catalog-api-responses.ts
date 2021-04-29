import { CatalogItemJSON } from '../../../models/catalog-item';
import { UserReviewJSON } from '../../../models/user-review';
import { APIResponse } from './generic-api-responses';

/**
 * @interface
 * @extends APIResponse
 * @description defines response for getItem request
 */
export interface GetItemResponse extends APIResponse {
    status?: number;
    message?: string;
    item?: CatalogItemJSON
}

/**
 * @interface
 * @extends APIResponse
 * @description defines response for getCategoryItems request
 */
export interface GetCategoryItemsResponse extends APIResponse {
    status?: number;
    message?: string;
    items?: CatalogItemJSON[]
}

/**
 * @interface
 * @extends APIResponse
 * @description defines response for getReviews request
 */
export interface GetReviewsResponse extends APIResponse {
    status?: number;
    message?: string;
    reviews?: UserReviewJSON[]
}

/**
 * @interface
 * @extends APIResponse
 * @description defines response for submitReview request
 */
export interface SubmitReviewResponse extends APIResponse {}
