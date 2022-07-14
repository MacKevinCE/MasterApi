import {Request, Response} from 'express';
import {loginAuth, loginGuestAuth, renewAuth} from "../helpers";
import {Header, Keys} from "../enums";

export const loginGuest = async (
    req: Request,
    res: Response
) => {
    const uid = req.body[Keys.uid] as string;
    loginGuestAuth(uid).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const login = async (
    req: Request,
    res: Response
) => {
    const uid = req.body[Keys.uid] as string;
    const code = req.body[Keys.code] as string;
    loginAuth(uid, code).then((response) => {
        res.status(response.message.code).json(response);
    })
}

export const renewToken = async (
    req: Request,
    res: Response
) => {
    const auth = req.header(Header.auth) as string;
    renewAuth(auth).then((response) => {
        res.status(response.message.code).json(response);
    })
}