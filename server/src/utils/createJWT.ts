import jwt from "jsonwebtoken";

const createJWT = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "");
};
export default createJWT;
