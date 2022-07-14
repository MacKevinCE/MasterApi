import {RouterType} from "../index";
import {printString} from "../../utils";
import {middlewaresMin} from "../../middlewares";
import {
    querySQLSimple,
    querySQLOptions
} from "../../controllers";

export const routerQuerySQL: RouterType[] = [
    {
        method: 'get',
        path: printString('/sql'),
        middlewares: middlewaresMin,
        controller: querySQLSimple
    }, {
        method: 'get',
        path: printString('/sql/options'),
        middlewares: middlewaresMin,
        controller: querySQLOptions
    }
]