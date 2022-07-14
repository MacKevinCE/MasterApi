import {Model, StatusCode, SuccessOK} from "./Message";
import {printString} from "../../utils";

export class Response<T> {
    message: Model;
    payload: T;

    constructor(
        message: Model,
        payload: T
    ) {
        this.message = message;
        this.payload = payload;
    }
}

export class Success<T> extends Response<T> {
    constructor(
        payload: T
    ) {
        super(SuccessOK, payload);
    }
}

export class Failed {
    message: Model;

    constructor(
        title: string,
        message: string,
        code: StatusCode
    ) {
        this.message = new Model(
            title,
            message,
            code
        );
    }
}

// Generals
export const UnknownError = (): Failed => {
    return new Failed(
        "Error",
        "Unknown error",
        StatusCode.NotFoundCode
    )
}

export const CustomError = (
    error: Error
): Failed => {
    const statusCode = (error as never)["statusCode"]
    const status = (error as never)["status"]
    return new Failed(
        error.name,
        error.message,
        statusCode ?? status ?? StatusCode.NotFoundCode
    )
}

export const NotFoundError = (
    path: string
): Failed => {
    return new Failed(
        'Not found error',
        printString(
            "Path '$0' not found",
            [path]
        ),
        StatusCode.NotFoundCode
    );
}

export const NotFoundDatabaseError = (
    database: string
): Failed => {
    return new Failed(
        'Not found error',
        printString(
            "Database '$0' not found",
            [database]
        ),
        StatusCode.NotFoundCode
    );
}

export const NotFoundIDError = (
    id: string
): Failed => {
    return new Failed(
        'Not found error',
        printString(
            "ID '$0' not found",
            [id]
        ),
        StatusCode.NotFoundCode
    );
}

export const NotFoundPageError = (
    page: number
): Failed => {
    return new Failed(
        'Not found error',
        printString(
            "Page '$0' not found",
            [page.toString()]
        ),
        StatusCode.NotFoundCode
    );
}

// BadRequest
export const BadRequestError = (
    keys: string
): Failed => {
    return new Failed(
        'Bad request error',
        printString(
            "Accepted keys {$0}",
            [keys]
        ),
        StatusCode.BadRequestCode
    );
}

export const BadRequestMandatoryError = (
    keys: string
): Failed => {
    return new Failed(
        'Bad request error',
        printString(
            "Mandatory keys {$0}",
            [keys]
        ),
        StatusCode.BadRequestCode
    );
}

export const BadRequestInvalidTypeError = (
    key: string | string[],
    type: string
): Failed => {
    return new Failed(
        'Bad request error',
        printString(
            "key '$0' accepted type '$1'",
            [key.toString(), type]
        ),
        StatusCode.BadRequestCode
    );
}

// Results
export const NoResultsError = (
    msm?: string
): Failed => {
    return new Failed(
        'No results error',
        msm || 'The result of the query is empty',
        StatusCode.BadRequestCode
    );
}

// Contexts
export const WrongNumberError = (
    num: number | string
): Failed => {
    return new Failed(
        'Wrong number error',
        printString(
            "'$0' should be a natural number greater than zero",
            [num.toString()]
        ),
        StatusCode.BadRequestCode
    );
}

export const WrongTypeError = (
    type: string | number
): Failed => {
    return new Failed(
        'Wrong type error',
        printString(
            "Type '$0' does not exist",
            [type.toString()]
        ),
        StatusCode.BadRequestCode
    );
}

// Promises
export const NodeFetchError = (
    err: Error
): Failed => {
    return new Failed(
        'Node fetch error',
        err.message,
        StatusCode.InternalServerErrorCode
    );
}

export const SequelizeError = (
    err?: Error
): Failed => {
    return new Failed(
        'Sequelize error',
        err?.message ?? "err Database",
        StatusCode.InternalServerErrorCode
    );
}

export const JWTError = (
    err: Error
): Failed => {
    return new Failed(
        'JWT error',
        err.message,
        StatusCode.InternalServerErrorCode
    );
}

export const CryptoSignError = (
    err?: Error
): Failed => {
    return new Failed(
        'Signature Error',
        err?.message ?? 'Incorrect signature',
        StatusCode.BadRequestCode
    );
}

export const CryptoSealedBoxError = (
    err?: Error
): Failed => {
    return new Failed(
        'Sealed Box Error',
        err?.message ?? 'Incorrect Sealed Box',
        StatusCode.BadRequestCode
    );
}

// Authorization
export const LoginAuthError = (): Failed => {
    return new Failed(
        'Authorization Error',
        'Incorrect email and password',
        StatusCode.BadRequestCode
    );
}

export const NoTokenError = (
    err?: Error
): Failed => {
    return new Failed(
        "Token Error",
        err?.message ?? "Token error",
        StatusCode.UnauthorizedCode
    );
}

