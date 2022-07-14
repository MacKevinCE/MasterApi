import {RouterType} from "../index";
import {printString} from "../../utils";
import {Field} from "../../enums";
import {middlewaresBasic} from "../../middlewares";
import {
    createSimple,
    createOptions
} from "../../controllers";

export const routerCreate: RouterType[] = [
    {
        method: 'post',
        path: printString(
            '/:$0',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: createSimple
    }, {
        method: 'post',
        path: printString(
            '/:$0/options',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: createOptions
    }
]