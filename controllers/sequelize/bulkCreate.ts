import {Request, Response} from 'express';
import {promiseDefault, unwrapsDatabase} from '../../helpers';
import {Keys} from "../../enums";

export const bulkCreateSimple = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const promise = database.bulkCreate(req.body)
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const bulkCreateOptions = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const records = req.body[Keys.records]
    const options = req.body[Keys.options]
    const promise = database.bulkCreate(records, options)
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}