// Given a time value returns a date object of that time in the future
export function futureDate(hours, minutes, seconds) {
    return new Date(Date.now() + (hours * 3600000) + (minutes * 60000) + (seconds * 1000));
}