import {RouterType} from "../index";
import {printString} from "../../utils";
import {Field} from "../../enums";
import {middlewaresBasic, middlewaresID} from "../../middlewares";
import {
    updateID,
    updateOptions,
    updateSimple

} from "../../controllers";

export const routerUpdate: RouterType[] = [
    {
        method: 'put',
        path: printString(
            '/:$0',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: updateSimple
    }, {
        method: 'put',
        path: printString(
            '/:$0/options',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: updateOptions
    }, {
        method: 'put',
        path: printString(
            '/:$0/:$1',
            [Field.table, Field.id]
        ),
        middlewares: middlewaresID,
        controller: updateID
    }
]