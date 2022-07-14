import {RouterType} from "../index";
import {printString} from "../../utils";
import {middlewaresMin} from "../../middlewares";
import {
    funcSimple,
    callSimple,
    funcOptions,
    callOptions
} from "../../controllers";
import {Field} from "../../enums";

export const routerSP: RouterType[] = [
    {
        method: 'get',
        path: printString(
            '/sp/func/:$0',
            [Field.name]
        ),
        middlewares: middlewaresMin,
        controller: funcSimple
    }, {
        method: 'get',
        path: printString(
            '/sp/func/:$0/options',
            [Field.name]
        ),
        middlewares: middlewaresMin,
        controller: funcOptions
    }, {
        method: 'get',
        path: printString(
            '/sp/call/:$0',
            [Field.name]
        ),
        middlewares: middlewaresMin,
        controller: callSimple
    }, {
        method: 'get',
        path: printString(
            '/sp/call/:$0/options',
            [Field.name]
        ),
        middlewares: middlewaresMin,
        controller: callOptions
    }
]