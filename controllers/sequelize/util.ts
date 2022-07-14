import {Request, Response} from 'express';
import {promiseDefault, unwrapsDatabase} from '../../helpers';
import {Field, Keys} from "../../enums";

type UtilMethod = 'max' | 'min' | 'sum'

export const utilSimple = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const method = req.params[Field.method] as UtilMethod
    const attr = req.params[Field.attr] as string
    const promise = database[method](attr, req.body);
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}