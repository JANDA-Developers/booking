import jwt from "jsonwebtoken";
import { ObjectID } from "typeorm";

const createJWT = (id: ObjectID): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "");
};
export default createJWT;
