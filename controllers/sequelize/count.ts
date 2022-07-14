import {Request, Response} from 'express';
import {counter, promiseDefault, unwrapsDatabase} from '../../helpers';

export const countSimple = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const where = req.body;
    const promise = database.count({where});
    counter(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const countOptions = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const promise = database.count(req.body);
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}