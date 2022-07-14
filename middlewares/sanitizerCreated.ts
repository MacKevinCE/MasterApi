import {
    body,
    ValidationChain
} from 'express-validator';
import {
    getDatabase,
    getMandatoryKeys
} from "../helpers";
import {
    isExactObject,
    printString
} from "../utils";
import {
    BadRequestMandatoryError,
    Failed
} from "../classes";

export const sanitizerCreated = (
    fields?: string | string[] | undefined
): ValidationChain => {
    return body(fields).custom((input, meta) => {
        const database = getDatabase(meta)
        if (database instanceof Failed) return false
        const mandatoryAllKeys = getMandatoryKeys(database);
        if (!input) return mandatoryAllKeys.length === 0
        return isExactObject(input, mandatoryAllKeys)
    }).withMessage((value, meta) => {
        const database = getDatabase(meta)
        if (database instanceof Failed) return database
        const mandatoryAllKeys = getMandatoryKeys(database);
        const keys = mandatoryAllKeys.join(", ")
        if (fields)
            return BadRequestMandatoryError(
                printString(
                    "$0:{$1}",
                    [fields.toString(), keys]
                )
            )
        else
            return BadRequestMandatoryError(
                printString(
                    "$0",
                    [keys]
                )
            )
    })
}