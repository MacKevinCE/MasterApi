import crypto from "crypto";
import {
    CryptoSealedBoxError,
    CryptoSignError,
    Failed
} from "../classes";

const getSymmetricKey = (
    pass: string
): Buffer => {
    const hash = crypto.createHash('sha256')
    const update = hash.update(pass, 'utf-8')
    return update.digest();
}

export const signatureText = (
    text: string,
    pass: string
): string => {
    const key = getSymmetricKey(pass);
    const sign = crypto.createHmac('sha512', key);
    const encryptedData = sign.update(text, 'utf8').digest();
    const buffer = encryptedData.toString('base64');
    return encodeURIComponent(buffer);
}

export const isValidSignatureText = (
    signature: string | undefined,
    text: string,
    pass: string
): boolean | Failed => {
    try {
        if (!signature) return false
        const sign = decodeURIComponent(signatureText(text, pass));
        const singBuffer = Buffer.from(sign, 'base64');
        const decode = decodeURIComponent(signature);
        const checksum = Buffer.from(decode, 'base64');
        return crypto.timingSafeEqual(singBuffer, checksum)
    } catch (err) {
        if (err instanceof Error) return CryptoSignError(err);
        else return CryptoSignError();
    }
}

export const signatureRequest = <T>(
    request: T,
    pass: string
): string => {
    const data = JSON.stringify(request);
    return signatureText(data, pass);
}

export const isValidSignatureRequest = <T>(
    signature: string | undefined,
    request: T,
    pass: string
): boolean | Failed => {
    const data = JSON.stringify(request);
    return isValidSignatureText(signature, data, pass);
}

export const createSealedBoxText = (
    text: string,
    pass: string
): string => {
    const key = getSymmetricKey(pass);
    const iv = Buffer.from('mBj0tzBUxDFmx1T', 'base64');
    const cipheriv = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encryptedData = Buffer.concat(
        [
            cipheriv.update(text, 'utf8'),
            cipheriv.final()
        ]
    );
    const buffer = Buffer.concat(
        [
            iv,
            encryptedData,
            cipheriv.getAuthTag()
        ]
    ).toString('base64');
    return encodeURIComponent(buffer);
}

export const openSealedBoxText = (
    sealedBoxData: string,
    pass: string
): string | Failed => {
    try {
        const key = getSymmetricKey(pass);
        const decode = decodeURIComponent(sealedBoxData);
        const combinerBuffer = Buffer.from(decode, 'base64');
        const iv = combinerBuffer.subarray(0, 12);
        const decipher = crypto.createDecipheriv(
            'aes-256-gcm',
            key,
            iv
        );
        const temp = combinerBuffer.length - 16;
        decipher.setAuthTag(combinerBuffer.subarray(temp));
        const update = decipher.update(
            combinerBuffer.subarray(12, temp),
            undefined, 'utf8'
        )
        return update + decipher.final('utf8');
    } catch (err) {
        if (err instanceof Error) return CryptoSealedBoxError(err);
        else return CryptoSealedBoxError();
    }
}

export const createSealedBoxRequest = <T>(
    request: T,
    pass: string
): string => {
    const data = JSON.stringify(request);
    return createSealedBoxText(data, pass);
}

export const openSealedBoxRequest = <T>(
    sealedBoxData: string,
    pass: string
): T | Failed => {
    const data = openSealedBoxText(sealedBoxData, pass);
    if (data instanceof Failed) {
        return data
    } else {
        return JSON.parse(data)
    }
}