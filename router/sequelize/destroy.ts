import {RouterType} from "../index";
import {printString} from "../../utils";
import {Field} from "../../enums";
import {middlewaresBasic, middlewaresID} from "../../middlewares";
import {
    destroySimple,
    destroyID,
    destroyOptions, destroyLimit
} from "../../controllers";

export const routerDestroy: RouterType[] = [
    {
        method: 'delete',
        path: printString(
            '/:$0',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: destroySimple
    }, {
        method: 'delete',
        path: printString(
            '/:$0/limit/:$1',
            [Field.table, Field.limit]
        ),
        middlewares: middlewaresBasic,
        controller: destroyLimit
    }, {
        method: 'delete',
        path: printString(
            '/:$0/options',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: destroyOptions
    }, {
        method: 'delete',
        path: printString(
            '/:$0/:$1',
            [Field.table, Field.id]
        ),
        middlewares: middlewaresID,
        controller: destroyID
    }
]