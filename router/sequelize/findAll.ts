import {RouterType} from "../index";
import {printString} from "../../utils";
import {Field} from "../../enums";
import {middlewaresBasic} from "../../middlewares";
import {
    findAllOptions,
    findAllSimple
} from "../../controllers";

export const routerFindAll: RouterType[] = [
    {
        method: 'get',
        path: printString(
            '/:$0',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: findAllSimple
    }, {
        method: 'get',
        path: printString(
            '/:$0/options',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: findAllOptions
    }
]