import {RouterType} from "../index";
import {printString} from "../../utils";
import {Field} from "../../enums";
import {middlewaresID} from "../../middlewares";
import {
    findByPkOptions,
    findByPkSimple
} from "../../controllers";

export const routerFindByPk: RouterType[] = [
    {
        method: 'get',
        path: printString(
            '/:$0/:$1',
            [Field.table, Field.id]
        ),
        middlewares: middlewaresID,
        controller: findByPkSimple
    }, {
        method: 'get',
        path: printString(
            '/:$0/:$1/options',
            [Field.table, Field.id]
        ),
        middlewares: middlewaresID,
        controller: findByPkOptions
    }
]