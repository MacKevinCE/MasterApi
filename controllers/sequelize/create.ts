import {Request, Response} from 'express';
import {promiseDefault, unwrapsDatabase} from '../../helpers';
import {Keys} from "../../enums";

export const createSimple = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const promise = database.create(req.body);
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const createOptions = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const attr = req.body[Keys.attr]
    const options = req.body[Keys.options]
    const promise = database.create(attr, options);
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}