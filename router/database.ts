import express from 'express';
import {
    routerBulkCreate,
    routerCount,
    routerCreate,
    routerDescribe,
    routerDestroy,
    routerFindAll,
    routerFindAndCountAll,
    routerFindByPk,
    routerFindOne,
    routerFindOrCreate,
    routerIncrement,
    routerQuerySQL,
    routerSP,
    routerUpdate,
    routerUtil
} from "./sequelize";

const router = express.Router();

const routersPost = [
    ...routerBulkCreate,
    ...routerFindOrCreate,
    ...routerCreate,
]

const routersGet = [
    ...routerQuerySQL,
    ...routerSP,
    ...routerDescribe,
    ...routerFindOne,
    ...routerFindAndCountAll,
    ...routerCount,
    ...routerFindAll,
    ...routerFindByPk,
    ...routerUtil
]

const routersPut = [
    ...routerIncrement,
    ...routerUpdate,
]

const routersDelete = [
    ...routerDestroy
]

const routersDatabase = [
    ...routersPost,
    ...routersGet,
    ...routersPut,
    ...routersDelete
]

routersDatabase.forEach((value) => {
    router[value.method](
        value.path,
        value.middlewares,
        value.controller
    );
})

export default router;