import { APIResponse } from './generic-api-responses';

/**
 * Defines response for getItem request
 * @extends APIResponse
 */
 export interface I18nResponse extends APIResponse {
    text: string
}
