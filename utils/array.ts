export const removeElem = <T>(
    array: T[],
    elem: T
): T[] => {
    const index = array.indexOf(elem);
    array.splice(index, 1);
    return array
}
