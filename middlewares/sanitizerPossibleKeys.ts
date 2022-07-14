import {body} from 'express-validator';
import {BadRequestError} from "../classes";
import {
    getDictionaryWithKeys,
    printString
} from "../utils";

export const sanitizerPossibleKeys = (
    keys: string[],
    fields?: string | string[] | undefined
) => {
    return body(fields).custom((input) => {
        if (!input) return undefined
        const bodyDictionary = getDictionaryWithKeys(keys, input);
        const bodyKeys = Object.keys(input);
        const bodyDictionaryKeys = Object.keys(bodyDictionary);
        return (bodyKeys.length === bodyDictionaryKeys.length)
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