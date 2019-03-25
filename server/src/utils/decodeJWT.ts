import jwt from "jsonwebtoken";
import { InstanceType } from "typegoose";
import { UserModel, UserSchema } from "../models/User";

const decodeJWT = async (
    token: string
): Promise<InstanceType<UserSchema> | undefined> => {
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
        const { id } = decoded;
        const user = await UserModel.findById(id);
        return user || undefined;
    } catch (error) {
        throw error;
    }
};

export default decodeJWT;
