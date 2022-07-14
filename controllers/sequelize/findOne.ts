import {Request, Response} from 'express';
import {selectOne, unwrapsDatabase} from '../../helpers';

export const findOneSimple = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const where = req.body;
    const promise = database.findOne({where});
    selectOne(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const findOneOptions = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const promise = database.findOne(req.body);
    selectOne(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}
