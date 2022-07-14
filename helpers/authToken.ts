import {
    Failed,
    Success,
    UnknownError
} from "../classes";
import {
    jwtAccessSecret,
    jwtRefreshSecret,
    jwtTime
} from "../environment";
import {generateJWT} from './jwt';
import ms from 'ms';

export type TokenTuple = {
    accessToken: string,
    refreshToken: string
}

export const loginGuestAuth = async (
    auth: string
): Promise<Success<string> | Failed> => {
    return renewAuth(auth);
}

// -TODO: Configure with database auth
export const loginAuth = async (
    authUid: string,
    authCode: string
): Promise<Success<string> | Failed> => {
    return UnknownError();
}

export const renewAuth = async (
    auth: string
): Promise<Success<TokenTuple> | Failed> => {
    const time = ms(jwtTime) / 1000;
    const accessToken = await generateJWT(
        {auth},
        jwtAccessSecret,
        time / 2
    );
    const refreshToken = await generateJWT(
        {auth},
        jwtRefreshSecret,
        time
    );
    if (accessToken instanceof Failed) return accessToken;
    else if (refreshToken instanceof Failed) return refreshToken;
    else return new Success({accessToken, refreshToken});
}