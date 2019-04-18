export const encodeB64 = (str: string) => Buffer.from(str).toString('base64');
export const decodeB64 = (encoded: string | null) => encoded && Buffer.from(encoded, 'base64').toString();
