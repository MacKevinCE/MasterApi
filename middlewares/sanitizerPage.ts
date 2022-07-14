import {param} from 'express-validator';
import {
    getNumberLimitMin,
    printString
} from "../utils";
import {Field} from "../enums";
import {NotFoundPageError} from "../classes";

export const sanitizerPage = () => {
    return param(Field.page).customSanitizer((input) => {
        if (!(typeof input === "string")) return input
        const page = getNumberLimitMin(input, 1);
        if (!page) return printString("/$0", [input]);
        return page
    }).isNumeric().withMessage((value) => {
        return NotFoundPageError(value)
    });
}