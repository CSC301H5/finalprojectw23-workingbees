// Given a time value returns a date object of that time in the future
export function futureDate(startTime, hours, minutes, seconds) {
    return new Date(startTime + (hours * 3600000) + (minutes * 60000) + (seconds * 1000));
}