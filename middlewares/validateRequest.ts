import {
    NextFunction,
    Request,
    Response
} from "express";
import {validationResult} from 'express-validator';
import {UnknownError} from "../classes";

export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        const error = errors.array(
            {onlyFirstError: true}
        ).reverse().pop()
        const fail = error?.msg ?? UnknownError()
        res.status(fail.message.code).json(fail);
    }
}