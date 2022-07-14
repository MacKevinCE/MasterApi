import {RouterType} from "../index";
import {printString} from "../../utils";
import {Field} from "../../enums";
import {middlewaresBasic} from "../../middlewares";
import {
    findOrCreateOptions,
    findOrCreateSimple
} from "../../controllers";

export const routerFindOrCreate: RouterType[] = [
    {
        method: 'post',
        path: printString(
            '/:$0/searchOrCreate',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: findOrCreateSimple
    }, {
        method: 'post',
        path: printString(
            '/:$0/searchOrCreate/options',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: findOrCreateOptions
    }
]