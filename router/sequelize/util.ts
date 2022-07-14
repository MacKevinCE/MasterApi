import {RouterType} from "../index";
import {printString} from "../../utils";
import {Field} from "../../enums";
import {middlewaresBasic} from "../../middlewares";
import {
    utilSimple
} from "../../controllers";

export const routerUtil: RouterType[] = [
    {
        method: 'get',
        path: printString(
            '/:$0/:$1/:$2',
            [Field.table, Field.method, Field.attr]
        ),
        middlewares: middlewaresBasic,
        controller: utilSimple
    }
]