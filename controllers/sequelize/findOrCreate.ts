import {Request, Response} from 'express';
import {selectOrCreate, unwrapsDatabase} from '../../helpers';
import {Keys} from "../../enums";

export const findOrCreateSimple = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const where = req.body[Keys.where]
    const defaults = req.body[Keys.defaults]
    const promise = database.findOrCreate({where, defaults});
    selectOrCreate(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const findOrCreateOptions = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const promise = database.findOrCreate(req.body);
    selectOrCreate(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}