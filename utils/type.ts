export type PrimitiveType = "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "undefined"
    | "null"

export const primitiveType = (
    obj: unknown
): PrimitiveType => {
    return (({})
            ?.toString
            ?.call(obj)
            ?.match(/\s([a-z|A-Z]+)/)
            ?.[1]
            ?.toLowerCase()
        ?? "undefined"
    ) as PrimitiveType
}