export function dateDifference(startDate: Date, endDate: Date) {
    const startDateConverted = convertUnixToDate(startDate);
    const endDateConverted= convertUnixToDate(endDate);
    const timeDif = Math.abs(startDateConverted.getTime() - endDateConverted.getTime());
    return Math.ceil(timeDif / (1000 * 3600 * 24));
}
export function convertUnixToDate (unix: Date) {
    const convertStringToInt = parseInt(unix.toString(), 10)
    const date = new Date(convertStringToInt)
    return date;
}