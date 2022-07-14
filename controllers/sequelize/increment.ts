import {Request, Response} from 'express';
import {promiseDefault, unwrapsDatabase} from '../../helpers';
import {Field, Keys} from "../../enums";

export const incrementSimple = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const attr = req.params[Field.attr] as string
    const value = req.params[Field.value] as never
    const where = req.body
    const promise = database.increment(attr, {by: value, where})
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const incrementOptions = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const attr = req.body[Keys.attr]
    const options = req.body[Keys.options]
    const promise = database.increment(attr, options)
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}