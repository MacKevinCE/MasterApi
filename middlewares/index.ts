import {sanitizerCheckJWTAccess} from "./sanitizerCheckJWT";
import {sanitizerDatabase} from "./sanitizerDatabase";
import {validateRequest} from "./validateRequest";
import {sanitizerID} from "./sanitizerID";

export * from './sanitizerAttr';
export * from './sanitizerCheckJWT';
export * from './sanitizerCreated';
export * from './sanitizerDatabase';
export * from './sanitizerID';
export * from './sanitizerMandatory';
export * from './sanitizerPossibleKeys';
export * from './sanitizerPage';
export * from './sanitizerCrypto';
export * from './sanitizerPrimitiveType';
export * from './validateRequest';

export const middlewaresMin = [
    sanitizerCheckJWTAccess(),
    validateRequest
]

export const middlewaresBasic = [
    sanitizerCheckJWTAccess(),
    sanitizerDatabase(),
    validateRequest
]

export const middlewaresID = [
    sanitizerCheckJWTAccess(),
    sanitizerID(),
    validateRequest
]