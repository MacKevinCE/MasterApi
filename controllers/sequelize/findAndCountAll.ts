import {Request, Response} from 'express';
import {Constant, Field, Keys} from "../../enums";
import {promiseDefault, unwrapsDatabase} from '../../helpers';

export const findAndCountAllSimple = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const where = req.body;
    const promise = database.findAndCountAll({where});
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const findAndCountAllIncludeAll = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const where = req.body;
    const promise = database.findAndCountAll({
        where, include: {all: true}
    });
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const findAndCountAllOptions = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const promise = database.findAndCountAll(req.body);
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const findAndCountAllPaginated = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const where = req.body;
    const pag = req.params?.[Field.page] as never
    const limit = Constant.limit
    const offset = limit * (pag - 1);
    const promise = database.findAndCountAll({
        where, limit, offset
    });
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const findAndCountAllPaginatedIncludeAll = async (
    req: Request,
    res: Response
) => {
    const database = unwrapsDatabase(req)
    const where = req.body[Keys.where];
    const pag = req.params[Field.page] as never
    const limit = Constant.limit
    const offset = limit * (pag - 1);
    const promise = database.findAndCountAll({
        where, limit, offset,
        include: {all: true}
    });
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}