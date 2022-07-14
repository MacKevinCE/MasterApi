import {param} from 'express-validator';
import {Field} from "../enums";
import {
    Failed,
    NotFoundIDError
} from "../classes";
import {getDatabase} from "../helpers";

export const sanitizerID = () => {
    return param(Field.id).customSanitizer((input, meta) => {
        const database = getDatabase(meta)
        if (database instanceof Failed) return input
        const idKey = database.primaryKeyAttribute
        return {idKey, idValue: input}
    }).custom((input) => {
        const {idKey, idValue} = input
        return (idKey && idValue)
    }).withMessage((value, meta) => {
        const database = getDatabase(meta)
        if (database instanceof Failed) return database
        else return NotFoundIDError(value)
    })
}