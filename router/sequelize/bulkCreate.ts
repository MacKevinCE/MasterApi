import {RouterType} from "../index";
import {printString} from "../../utils";
import {Field} from "../../enums";
import {middlewaresBasic} from "../../middlewares";
import {
    bulkCreateOptions,
    bulkCreateSimple
} from "../../controllers";

export const routerBulkCreate: RouterType[] = [
    {
        method: 'post',
        path: printString(
            '/:$0/bulkCreate',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: bulkCreateSimple
    }, {
        method: 'post',
        path: printString(
            '/:$0/bulkCreate/options',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: bulkCreateOptions
    }
]