export const getNumber = (
    num: string | undefined,
    option = 0
): number => {
    const aux = parseInt(num ?? option.toString(), 10) ?? option
    if (isNaN(aux)) return option
    else return aux
}

export const getNumberLimitMin = (
    num: string | undefined,
    min: number
): number | undefined => {
    const aux = parseInt(num ?? min.toString(), 10) ?? min
    if (isNaN(aux)) return undefined
    else if (min > aux) return undefined
    else return aux
}
