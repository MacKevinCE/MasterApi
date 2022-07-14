import jwt from 'jsonwebtoken';
import {
    Failed,
    JWTError,
    NoTokenError
} from "../classes";

export type AuthJWT = { auth: unknown }

export const generateJWT = (
    obj: AuthJWT,
    pass: string,
    expiresIn: string | number | undefined
): Promise<string | Failed> => {
    return new Promise<string | Failed>((resolve) => {
        jwt.sign(obj, pass, {
            expiresIn
        }, (err, token) => {
            if (err) resolve(JWTError(err));
            else if (!token) resolve(NoTokenError())
            else resolve(token)
        });
    });
}

export const checkJWT = (
    token: string | string[] | undefined,
    pass: string
): AuthJWT | Failed => {
    try {
        if (!token) return NoTokenError();
        else if (typeof token === "string") {
            return jwt.verify(token, pass) as AuthJWT;
        } else if (token[0]) {
            return jwt.verify(token[0], pass) as AuthJWT;
        } else return NoTokenError();
    } catch (err) {
        if (err instanceof Error) return NoTokenError(err);
        else return NoTokenError();
    }
}