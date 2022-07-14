export const getJson = (
    obj: unknown
): unknown => {
    return JSON.parse(JSON.stringify(obj));
}
