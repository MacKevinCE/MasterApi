import {
    Model,
    ModelCtor
} from "sequelize";

export const getMandatoryKeys = (
    database: ModelCtor<Model>
): string[] => {
    const attr = Object.values(database.rawAttributes)

    return attr.map(val => {
        if (
            (val.autoIncrement ?? false) ||
            (val.autoIncrementIdentity ?? false) ||
            (val.allowNull ?? true) ||
            (val.defaultValue !== undefined)
        ) return ""
        else return val.field ?? ""
    }).filter((val) => {
        return val !== ""
    });
}