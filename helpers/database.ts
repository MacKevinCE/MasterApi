import {Request} from 'express';
import {
    Model,
    ModelCtor
} from "sequelize";
import {
    Failed,
    NotFoundDatabaseError,
    UnknownError
} from "../classes";
import {Field} from "../enums";
import sequelize from "../config/sequelize";
import {Meta} from "express-validator";

export const getDatabase = (
    meta: Meta
): ModelCtor<Model> | Failed => {
    const nameDatabase = meta.req.params?.[Field.table]
    if (typeof nameDatabase !== 'string')
        return UnknownError()
    if (!sequelize.isDefined(nameDatabase))
        return NotFoundDatabaseError(nameDatabase)
    return sequelize.model(nameDatabase)
}

export const unwrapsDatabase = (
    req: Request
): ModelCtor<Model> => {
    const nameDatabase = req.params?.[Field.table] as string
    return sequelize.model(nameDatabase)
}