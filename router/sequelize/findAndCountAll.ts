import {RouterType} from "../index";
import {printString} from "../../utils";
import {Field} from "../../enums";
import {middlewaresBasic} from "../../middlewares";
import {
    findAndCountAllIncludeAll,
    findAndCountAllOptions,
    findAndCountAllPaginated,
    findAndCountAllPaginatedIncludeAll,
    findAndCountAllSimple
} from "../../controllers";

export const routerFindAndCountAll: RouterType[] = [
    {
        method: 'get',
        path: printString(
            '/:$0/search',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: findAndCountAllSimple
    }, {
        method: 'get',
        path: printString(
            '/:$0/search/all',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: findAndCountAllIncludeAll
    }, {
        method: 'get',
        path: printString(
            '/:$0/search/options',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: findAndCountAllOptions
    }, {
        method: 'get',
        path: printString(
            '/:$0/search/all/:$1',
            [Field.table, Field.page]
        ),
        middlewares: middlewaresBasic,
        controller: findAndCountAllPaginatedIncludeAll
    }, {
        method: 'get',
        path: printString(
            '/:$0/search/:$1',
            [Field.table, Field.page]
        ),
        middlewares: middlewaresBasic,
        controller: findAndCountAllPaginated
    }
]