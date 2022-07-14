import {RouterType} from "../index";
import {printString} from "../../utils";
import {Field} from "../../enums";
import {middlewaresBasic} from "../../middlewares";
import {
    countOptions,
    countSimple
} from "../../controllers";

export const routerCount: RouterType[] = [
    {
        method: 'get',
        path: printString(
            '/:$0/count',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: countSimple
    }, {
        method: 'get',
        path: printString(
            '/:$0/count/options',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: countOptions
    }
]