import {addHours} from "../utils";
import {Constant} from "../enums";

export type TimestampQueryType<Q, R> = {
    query: Q,
    response: R,
    create: Date
};
type CallbackQuery<Q, R> = (
    request: Q
) => Promise<R>;
export type TimestampQueryResponseType<Q, R> = {
    newData: TimestampQueryType<Q, R>[],
    response: R,
    index: number,
    isNew: boolean
};

export async function TimestampQuery<Q, R>(
    data: TimestampQueryType<Q, R>[],
    query: Q,
    callback: CallbackQuery<Q, R>,
    timeRefresh: number = Constant.refresh
): Promise<TimestampQueryResponseType<Q, R>> {
    const searchQuery = <T, P>(
        value: TimestampQueryType<T, P>
    ): boolean => {
        const jsonValue = JSON.stringify(value.query);
        const jsonQuery = JSON.stringify(query);
        return jsonValue === jsonQuery
    }
    const newTime = addHours(-timeRefresh);
    const newData = data.filter((value) => {
        return value.create > newTime
    })
    const result = newData.find(searchQuery);
    if (result) {
        const index = newData.findIndex(searchQuery);
        return {
            newData,
            response: result.response,
            index,
            isNew: false
        }
    } else {
        return callback(query).then((response) => {
            const newIndex = newData.push({
                query,
                response,
                create: new Date()
            })
            return {
                newData,
                response,
                index: newIndex - 1,
                isNew: true
            }
        })
    }
}

export type TimestampSimpleType<R> = {
    response: R,
    create: Date
};
export type CallbackSimple<R> = () => Promise<R>;

export async function TimestampSimple<R>(
    data: TimestampSimpleType<R>,
    callback: CallbackSimple<R>,
    timeRefresh: number = Constant.refresh
): Promise<TimestampSimpleType<R>> {
    const newDate = addHours(-timeRefresh);
    if (data.create > newDate) {
        return callback().then((response) => {
            return {
                response,
                create: new Date()
            }
        })
    } else return data
}
