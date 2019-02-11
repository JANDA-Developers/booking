export const transformDate = (date: string): string => {
    return new Date(date).toISOString();
};