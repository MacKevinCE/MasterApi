import {Request, Response} from 'express';
import {SequelizeError, Success} from "../classes";
import sequelize from "../config/sequelize";

export * from './auth';
export * from './sequelize';

export const index = async (req: Request, res: Response) => {
    const tables = Object.keys(sequelize.models).join(", ")

    if (tables.length === 0) {
        const fail = SequelizeError()
        res.status(fail.message.code).json(fail);
    } else {
        const success = new Success({tables})
        res.status(success.message.code).json(success);
    }
}