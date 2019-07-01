import { padStr } from "./etc";

export const houseAccessKeyGen = () => {
    return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
    );
};
export const appilcationKeyGen = () => {
    return s4() + s4() + "-" + s4() + "-" + s4() + s4() + s4() + s4();
};

export const bookingIdGen = () => {
    const date = new Date();
    return `${date.getFullYear()}${padStr(
        (date.getMonth() + 1).toString(),
        2,
        "0"
    )}${padStr(
        date.getDate().toString(),
        2,
        "0"
    )}-${s4Dec()}-${s4Dec()}${s4Dec()}`;
};

export const guestIdGen = () => `G${s4()}-${s4()}-${s4()}-${s4()}`;

export const agencyIdGen = () => {
    return `${s4()}${s4()}-${s4()}${s4()}-${s4()}${s4()}`;
};

const s4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

const s4Dec = () =>
    (((1 + Math.random()) * 10000) | 0).toString(10).substring(1);
