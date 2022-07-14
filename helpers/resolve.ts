import {Model} from "sequelize";
import {
    NoResultsError,
    SequelizeError,
    Success
} from "../classes";

export const promiseDefault = async <T>(
    promise: Promise<T>
) => {
    return promise.then((response) => {
        return new Success(response);
    }).catch((err: Error) => {
        return SequelizeError(err);
    });
}

export const method = async (
    promise: Promise<[unknown[], unknown]>
) => {
    return promise.then(([response]) => {
        return new Success(response);
    }).catch((err: Error) => {
        return SequelizeError(err);
    });
}

export const counter = async (
    promise: Promise<number>
) => {
    return promise.then((count) => {
        return new Success({count});
    }).catch((err: Error) => {
        return SequelizeError(err);
    })
}

export const promiseOne = async <M extends Model>(
    promise: Promise<M[]>
) => {
    return promise.then((response) => {
        const row = response.pop()
        if (row) return new Success(row);
        else return NoResultsError();
    }).catch((err: Error) => {
        return SequelizeError(err);
    });
}

export const selectOne = async <M extends Model>(
    promise: Promise<M | null>
) => {
    return promise.then((row) => {
        if (row) return new Success(row);
        else return NoResultsError();
    }).catch((err: Error) => {
        return SequelizeError(err);
    })
}

export const selectOrCreate = async <M extends Model>(
    promise: Promise<[M, boolean]>
) => {
    return promise.then(([row, isCreate]) => {
        return new Success({row, isCreate});
    }).catch((err: Error) => {
        return SequelizeError(err);
    })
}

export const update = async <M extends Model>(
    promise: Promise<[number, M[]]>
) => {
    return promise.then(([count, rows]) => {
        return new Success({rows, count});
    }).catch((err: Error) => {
        return SequelizeError(err);
    })
}
