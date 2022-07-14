import sequelize from "../config/sequelize";

const querySP = async (
    name: string,
    request: object,
    sql: string,
    options: object
) => {
    const aux = name
    const keys = Object.keys(request);
    const text = keys.map((elem) => {
        return ":" + elem
    }).join(",");
    const sqlFinal = `${sql} "${aux}"(${text})`
    return sequelize.query(
        sqlFinal,
        {
            ...options,
            replacements: (request as never)
        }
    );
}

export const funcSP = async (
    name: string,
    request: object,
    options: object = {nest: true, raw: true}
) => {
    return querySP(name, request, "select * from", options);
}

export const callSP = async (
    name: string,
    request: object,
    options: object = {nest: true, raw: true}
) => {
    return querySP(name, request, "call", options);
}
