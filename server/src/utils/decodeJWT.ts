import jwt from "jsonwebtoken";
import { MongooseDocument } from "mongoose";
import { User as u } from "../models/User";

const decodeJWT = async (token: string): Promise<MongooseDocument | undefined> => {
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
        const { id } = decoded;
        const user = await u.findById(id);
        return user || undefined;
    } catch (error) {
        return undefined;
    }
};

export default decodeJWT;
