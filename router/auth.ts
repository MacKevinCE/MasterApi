import express from 'express';
import {Keys} from "../enums";
import {
    sanitizerCheckJWTRefresh,
    validateRequest,
    sanitizerSealedBox,
    sanitizerSignature, sanitizerPossibleKeys, sanitizerPrimitiveTypes
} from '../middlewares';

import {
    login,
    loginGuest,
    renewToken,
} from "../controllers";
import {RouterType} from "./index";

const router = express.Router();

const routersAuth: RouterType[] = [
    {
        method: 'post',
        path: '/login/guest/',
        middlewares: [
            sanitizerPrimitiveTypes(
                Keys.uid,
                ["string"]
            ),
            sanitizerPossibleKeys([Keys.uid]),
            validateRequest
        ],
        controller: loginGuest
    }, {
        method: 'post',
        path: '/login/',
        middlewares: [
            sanitizerSignature,
            sanitizerSealedBox(),
            sanitizerPrimitiveTypes(
                [Keys.uid, Keys.code],
                ["string"]
            ),
            sanitizerPossibleKeys([Keys.uid, Keys.code]),
            validateRequest
        ],
        controller: login
    }, {
        method: 'get',
        path: '/refreshToken/',
        middlewares: [
            sanitizerCheckJWTRefresh(),
            sanitizerPossibleKeys([])
        ],
        controller: renewToken
    }
]

routersAuth.forEach((value) => {
    router[value.method](
        value.path,
        value.middlewares,
        value.controller
    );
})

export default router;