import {Request, Response} from 'express';
import {promiseDefault, unwrapsDatabase} from '../../helpers';

export const findAllSimple = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const where = req.body;
    const promise = database.findAll({where});
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const findAllOptions = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const promise = database.findAll(req.body);
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}