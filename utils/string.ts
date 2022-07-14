import {primitiveType} from "./type";

export const getString = (
    obj: unknown
): string => {
    return JSON.stringify(obj);
}

export const escapeString = (
    text: string
): string => {
    const separator = [" ", "."]
    separator.forEach((value) => {
        text = text.trim().split(value).map((value) => {
            if (value.length === 0) return value
            if (!value.startsWith("\"")) {
                value = "\"" + value
            }
            if (!value.endsWith("\"")) {
                value = value + "\""
            }
            return value
        }).join(value)
    })
    return text
}

type ValueType = (string | [string, boolean])

export const printString = (
    text: string,
    replacements?: ValueType[]
        | { [key: string]: ValueType }
        | undefined,
    symbol = "$"
): string => {
    const primitiveValue = primitiveType(replacements)
    if (primitiveValue === "array") {
        return printStringArray(
            text,
            replacements as ValueType[],
            symbol
        )
    } else if (primitiveValue === "object") {
        return printStringDictionary(
            text,
            replacements as { [key: string]: ValueType },
            symbol
        )
    } else {
        return text
    }
}

export const printStringArray = (
    text: string,
    replacements: ValueType[],
    symbol = "$"
): string => {
    replacements.forEach((value, index) => {
        const array = text.split(symbol + index)
        if (typeof value === "string") {
            text = array.join(value)
        } else {
            text = array.join(
                value[1] ? escapeString(value[0]) : value[0]
            )
        }
    })
    return text
}

export const printStringDictionary = (
    text: string,
    replacements: { [key: string]: ValueType },
    symbol = "$"
): string => {
    for (const key in replacements) {
        const value = replacements[key] ?? ""
        const array = text.split(symbol + key)
        if (typeof value === "string") {
            text = array.join(value)
        } else {
            text = array.join(
                value[1] ? escapeString(value[0]) : value[0]
            )
        }
    }
    return text
}