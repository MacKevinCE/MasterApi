export enum StatusCode {
    ContinueCode = 100,
    OKCode = 200,
    CreatedCode = 201,
    NotModifiedCode = 304,
    BadRequestCode = 400,
    UnauthorizedCode = 401,
    NotFoundCode = 404,
    RequestTimeoutCode = 408,
    InternalServerErrorCode = 500,
    BadGatewayCode = 502,
    GatewayTimeoutCode = 504
}

export class Model {
    code: number;
    title: string;
    message: string;

    constructor(
        title: string,
        message: string,
        code: StatusCode
    ) {
        this.code = code.valueOf();
        this.title = title;
        this.message = message;
    }
}

export const SuccessOK = new Model(
    'Success',
    'Successful response',
    StatusCode.OKCode
);
