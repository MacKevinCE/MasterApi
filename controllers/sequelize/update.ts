import {Request, Response} from 'express';
import {unwrapsDatabase, update} from '../../helpers';
import {Field, Keys} from "../../enums";

export const updateSimple = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const attr = req.body[Keys.update];
    const where = req.body[Keys.where];
    const promise = database.update(attr, {where});
    update(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const updateOptions = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const attr = req.body[Keys.attr];
    const options = req.body[Keys.options];
    const promise = database.update(attr, options);
    update(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const updateID = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const {idKey, idValue} = req.params[Field.id] as never
    const attr = req.body;
    const promise = database.update(attr, {where: {[idKey]: idValue}});
    update(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}