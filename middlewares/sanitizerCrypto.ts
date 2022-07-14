import {
    NextFunction, Request, Response
} from "express";
import {
    sealSecret,
    signSecret
} from "../environment";
import {
    CryptoSignError,
    Failed,
    UnknownError
} from "../classes";
import {
    isValidSignatureRequest,
    openSealedBoxRequest
} from "../helpers";
import {
    body,
    ValidationChain
} from "express-validator";
import {
    Header,
    Keys
} from "../enums";

export const sanitizerSignature = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const sign = req.header(Header.signHeader);
    const isValid = isValidSignatureRequest(
        sign,
        req.body,
        signSecret
    );
    if (isValid instanceof Failed) {
        res.status(isValid.message.code).json(isValid);
    } else if (!isValid) {
        const fail = CryptoSignError()
        res.status(fail.message.code).json(fail);
    } else {
        next();
    }
}

export const sanitizerSealedBox = (): ValidationChain => {
    return body(Keys.sealedBox).customSanitizer((input) => {
        return openSealedBoxRequest(input, sealSecret);
    }).custom((input) => {
        return (input && !(input instanceof Failed))
    }).withMessage((value) => {
        if (value instanceof Failed) return value
        else return UnknownError()
    })
}