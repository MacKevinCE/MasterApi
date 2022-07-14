import {RouterType} from "../index";
import {printString} from "../../utils";
import {Field} from "../../enums";
import {middlewaresBasic} from "../../middlewares";
import {
    utilDescribe
} from "../../controllers";

export const routerDescribe: RouterType[] = [
    {
        method: 'get',
        path: printString(
            '/:$0/describe',
            [Field.table]
        ),
        middlewares: middlewaresBasic,
        controller: utilDescribe
    }
]