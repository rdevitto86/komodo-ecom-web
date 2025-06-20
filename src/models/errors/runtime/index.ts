export interface RuntimeErrorType extends Error {
    statusCode: number | string;
}

export default class RuntimeError extends Error implements RuntimeError {
    statusCode: string | number;

    constructor(message: string, statusCode: number | string = 500) {
        super(message);
        this.name = 'RuntimeError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype); // redefine instanceof
    }
}
