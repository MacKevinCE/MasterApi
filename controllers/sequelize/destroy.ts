import {Request, Response} from 'express';
import {counter, unwrapsDatabase} from '../../helpers';
import {Field} from "../../enums";

export const destroySimple = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const where = req.body;
    const promise = database.destroy({where});
    counter(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const destroyLimit = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const limit = req.params[Field.limit] as never
    const where = req.body;
    const promise = database.destroy({where, limit});
    counter(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const destroyOptions = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const promise = database.destroy(req.body);
    counter(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const destroyID = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const {idKey, idValue} = req.params[Field.id] as never
    const promise = database.destroy({where: {[idKey]: idValue}});
    counter(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}