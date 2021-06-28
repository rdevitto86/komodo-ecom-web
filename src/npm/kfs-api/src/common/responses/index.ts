/**
 * Generic HTTP response
 */
export interface SimplifiedResponse {
    status: number;
    ok: boolean;
    message: string;
    body: Object;
}
