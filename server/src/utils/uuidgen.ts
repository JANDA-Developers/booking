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
const s4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};