import {Request, Response} from 'express';
import {promiseDefault} from "../../helpers";
import {Keys} from "../../enums";
import {printString} from "../../utils";
import sequelize from "../../config/sequelize";

export const querySQLSimple = async (
    req: Request,
    res: Response
) => {
    const text = req.body[Keys.sql]
    const replacements = req.body[Keys.replacements]
    const sql = printString(text, replacements, ":")
    const promise = sequelize.query(sql, {nest: true, raw: true});
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const querySQLOptions = async (
    req: Request,
    res: Response
) => {
    const text = req.body[Keys.sql]
    const replacements = req.body[Keys.replacements]
    const sql = printString(text, replacements, ":")
    const options = req.body[Keys.options]
    const promise = sequelize.query(sql, options);
    promiseDefault(promise).then((response) => {
        res.status(response.message.code).json(response);
    })
}