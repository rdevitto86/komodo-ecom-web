import RuntimeError from "../runtime";

export interface APIErrorType extends Error {
    statusCode: number | string;
    apiName: string;
    correlationId?: string | undefined;
}

export default class APIError extends RuntimeError implements APIErrorType {
    apiName: string;
    correlationId: string | undefined;

    constructor(
        message: string,
        statusCode: number | string = 500,
        apiName: string,
        correlationId?: string | undefined
    ) {
        super(message, statusCode);
        this.name = 'APIError';
        this.apiName = apiName;
        this.correlationId = correlationId;
        Object.setPrototypeOf(this, new.target.prototype); // redefine instanceof
    }
}
