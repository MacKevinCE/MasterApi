export const addHours = (
    hours: number,
    date: Date = new Date()
): Date => {
    const newDate = date
    newDate.setHours(date.getHours() + hours);
    return newDate
}