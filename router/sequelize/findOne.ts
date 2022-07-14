import {RouterType} from "../index";
import {printString} from "../../utils";
import {Field} from "../../enums";
import {middlewaresBasic} from "../../middlewares";
import {
    findOneOptions,
    findOneSimple,
} from "../../controllers";

export const routerFindOne: RouterType[] = [
    {
        method: 'get',
        path: printString(
            '/:$0/searchFirst',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: findOneSimple
    }, {
        method: 'get',
        path: printString(
            '/:$0/searchFirst/options',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: findOneOptions
    }
]