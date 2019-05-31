export const asyncForEach = async <T>(
    array: T[],
    callback: (val: T, i?: number, arr?: T[]) => void
) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};
//  3글자 마다 ,붙여줌
export const digitsComma = (str: string | number = ""): string => {
    if (typeof str === "number") {
        return digitsComma(str.toString());
    }
    let t = `${str}`;
    const comma = /,/g;
    t = t.replace(comma, "");
    const x = t.split(".");
    let x1 = x[0];
    const x2 = x.length > 1 ? `.${x[1]}` : "";
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
};
