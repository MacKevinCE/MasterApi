import {param} from 'express-validator';
import sequelize from "../config/sequelize";
import {Field} from "../enums";
import {
    NotFoundDatabaseError,
    NotFoundError
} from "../classes";
import {printString} from "../utils";

export const sanitizerDatabase = () => {
    return param(Field.table).custom((input) => {
        return (
            typeof input === 'string'
            && sequelize.isDefined(input)
        )
    }).withMessage((value) => {
        if (typeof value === 'string')
            return NotFoundError(
                printString(
                    "/$0",
                    [value]
                )
            )
        else return NotFoundDatabaseError(value)
    })
}