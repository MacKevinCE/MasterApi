import {
    NextFunction,
    Request,
    Response
} from "express";
import {
    jwtAccessSecret,
    jwtRefreshSecret
} from "../environment";
import {Failed} from "../classes";
import {checkJWT} from "../helpers";
import {Header} from "../enums";

type Sanitizer = (
    req: Request,
    res: Response,
    next: NextFunction
) => void

const sanitizerCheckJWT = (
    pass: string
): Sanitizer => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.header(Header.jwtHeader)
        const payload = checkJWT(token, pass);
        if (payload instanceof Failed) {
            res.status(payload.message.code).json(payload);
        } else {
            req.headers[Header.auth] = payload.auth as never
            next();
        }
    }
}

export const sanitizerCheckJWTAccess = (): Sanitizer => {
    return sanitizerCheckJWT(jwtAccessSecret)
};
export const sanitizerCheckJWTRefresh = (): Sanitizer => {
    return sanitizerCheckJWT(jwtRefreshSecret)
};

