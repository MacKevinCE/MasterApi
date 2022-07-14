import {body} from 'express-validator';
import {BadRequestError} from "../classes";
import {
    isExactObject,
    printString
} from "../utils";

export const sanitizerMandatory = (
    keys: string[],
    fields?: string | string[] | undefined
) => {
    return body(fields).custom((input) => {
        if (!input) return false
        return isExactObject(input, keys)
    }).withMessage(() => {
        const text = keys.join(", ")
        if (fields)
            return BadRequestError(
                printString(
                    "$0:{$1}",
                    [fields.toString(), text]
                )
            )
        else
            return BadRequestError(
                printString(
                    "$0",
                    [text]
                )
            )
    })
}