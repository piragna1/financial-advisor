export function validateStartDate(startDate) {
    if (
        !(startDate instanceof Date) ||
        isNaN(startDate.getTime())
    )
        throw new Error("startDate must be a valid Date object");
}