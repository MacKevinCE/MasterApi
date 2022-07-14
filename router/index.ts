import express, {RequestHandler} from 'express';
import {index} from "../controllers";

export type RouterType = {
    method: 'all'
        | 'get'
        | 'post'
        | 'put'
        | 'delete'
        | 'patch'
        | 'options'
        | 'head',
    path: string,
    middlewares: RequestHandler[],
    controller: RequestHandler
}

const router = express.Router();

const routersIndex: RouterType[] = [{
    method: 'get',
    path: '',
    middlewares: [],
    controller: index
}]

routersIndex.forEach((value) => {
    router[value.method](
        value.path,
        value.middlewares,
        value.controller
    );
})

export default router;