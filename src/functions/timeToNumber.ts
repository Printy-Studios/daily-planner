import Time from 'types/Time';

export default function timeToMinutes(time: Time) {
    return time.hrs * 60 + time.mins
}