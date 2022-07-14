export const getDictionaryWithKeys = (
    keys: string[],
    obj: { [p: string]: unknown }
): { [p: string]: unknown } => {
    const array = keys.map((val) => {
        const aux = obj[val];
        if (!aux) return {}
        else return {[val]: obj[val]}
    });
    return Object.assign({}, ...array);
}

export const isOptionalObject = (
    obj: object,
    keys: string[]
): boolean => {
    const objKeys = Object.keys(obj);
    const objDictionary = getDictionaryWithKeys(keys, obj as never);
    const objDictionaryKeys = Object.keys(objDictionary);
    return objKeys.length === objDictionaryKeys.length
}

export const isExactObject = (
    obj: object,
    keys: string[]
): boolean => {
    const objDictionary = getDictionaryWithKeys(keys, obj as never);
    const objDictionaryKeys = Object.keys(objDictionary);
    return objDictionaryKeys.length === keys.length
}