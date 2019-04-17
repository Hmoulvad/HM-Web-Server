export function dateDifference(startDate: Date, endDate: Date) {
    const timeDif = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(timeDif / (1000 * 3600 * 24));
}