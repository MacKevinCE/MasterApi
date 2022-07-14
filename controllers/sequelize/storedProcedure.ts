import {Request, Response} from 'express';
import {callSP, funcSP, promiseDefault} from "../../helpers";
import {Field, Keys} from "../../enums";

export const funcSimple = async (
    req: Request,
    res: Response
) => {
    const name = req.params[Field.name] ?? ""
    const request = req.body
    const promise = funcSP(name, request)
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const funcOptions = async (
    req: Request,
    res: Response
) => {
    const name = req.params[Field.name] ?? ""
    const request = req.body[Keys.request]
    const options = req.body[Keys.options]
    const promise = funcSP(name, request, options)
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const callSimple = async (
    req: Request,
    res: Response
) => {
    const name = req.params[Field.name] ?? ""
    const request = req.body
    const promise = callSP(name, request)
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const callOptions = async (
    req: Request,
    res: Response
) => {
    const name = req.params[Field.name] ?? ""
    const request = req.body[Keys.request]
    const options = req.body[Keys.options]
    const promise = callSP(name, request, options)
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}