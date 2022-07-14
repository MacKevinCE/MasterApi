import {body} from 'express-validator';
import {isOptionalObject, printString} from "../utils";
import {BadRequestError, Failed} from "../classes";
import {getDatabase} from "../helpers";

export const sanitizerAttr = (
    fields?: string | string[] | undefined
) => {
    return body(fields).custom((input, meta) => {
        if (!input) return true
        const database = getDatabase(meta)
        if (database instanceof Failed) return false
        const databaseAllKeys = Object.keys(database.rawAttributes)
        return isOptionalObject(input, databaseAllKeys)
    }).withMessage((_, meta) => {
        const database = getDatabase(meta)
        if (database instanceof Failed) return database
        const keys = Object.keys(database.rawAttributes).join(", ")
        if (fields)
            return BadRequestError(
                printString(
                    "$0:{$1}",
                    [fields.toString(), keys]
                )
            )
        else
            return BadRequestError(
                printString(
                    "$0", [keys]
                )
            )
    })
}