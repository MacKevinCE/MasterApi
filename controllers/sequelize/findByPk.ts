import {Request, Response} from 'express';
import {selectOne, unwrapsDatabase} from '../../helpers';
import {Field} from "../../enums";

export const findByPkSimple = async (
    req: Request,
    res: Response
) => {
    const {idValue} = req.params[Field.id] as never
    const database = unwrapsDatabase(req)
    const promise = database.findByPk(idValue);
    selectOne(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const findByPkOptions = async (
    req: Request,
    res: Response
) => {
    const {idValue} = req.params[Field.id] as never
    const database = unwrapsDatabase(req)
    const promise = database.findByPk(idValue, req.body);
    selectOne(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}