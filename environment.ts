import 'dotenv/config';

import {env} from 'process';

const {PORT} = env;
const {COOKIE_SECRET} = process.env;
const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_TIME
} = process.env;
const {
    SIGN_SECRET,
    SEAL_SECRET
} = process.env;

const config = {
    port: PORT ?? 3000,
    cookieSecret: COOKIE_SECRET ?? "",
    jwtAccessSecret: JWT_ACCESS_SECRET ?? "",
    jwtRefreshSecret: JWT_REFRESH_SECRET ?? "",
    jwtTime: JWT_TIME ?? '1m',
    signSecret: SIGN_SECRET ?? "",
    sealSecret: SEAL_SECRET ?? ""
}

export = config