import {Request, Response} from 'express';
import {promiseDefault, unwrapsDatabase} from '../../helpers';

export const utilDescribe = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const promise = database.describe()
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}
