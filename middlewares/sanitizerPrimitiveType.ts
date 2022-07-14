import {body} from 'express-validator';
import {BadRequestInvalidTypeError} from "../classes";
import {
    primitiveType,
    PrimitiveType
} from "../utils";

export const sanitizerPrimitiveTypes = (
    fields: string | string[] | undefined,
    type: PrimitiveType[]
) => {
    return body(fields).custom((input) => {
        return type.includes(primitiveType(input))
    }).withMessage(() => {
        return BadRequestInvalidTypeError(
            fields ?? "body",
            type.join(", ")
        )
    })
}