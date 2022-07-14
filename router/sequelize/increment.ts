import {RouterType} from "../index";
import {printString} from "../../utils";
import {Field} from "../../enums";
import {middlewaresBasic} from "../../middlewares";
import {
    incrementOptions,
    incrementSimple
} from "../../controllers";

export const routerIncrement: RouterType[] = [
    {
        method: 'put',
        path: printString(
            '/:$0/increment/options',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: incrementOptions
    }, {
        method: 'put',
        path: printString(
            '/:$0/increment/:$1/:$2',
            [Field.table, Field.attr, Field.value]
        ),
        middlewares: middlewaresBasic,
        controller: incrementSimple
    }
]