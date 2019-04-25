import jwt from "jsonwebtoken";
import { InstanceType } from "typegoose";
import { HouseModel, HouseSchema } from "../models/House";

const decodeHostApplicationJWT = async (
    token: string
): Promise<InstanceType<HouseSchema> | undefined> => {
    try {
        const decoded: any = jwt.verify(
            token,
            process.env.JWT_HOST_APPLICATION_SECRET || ""
        );
        const { houseId } = decoded;
        const house = await HouseModel.findById(houseId);
        return house || undefined;
    } catch (error) {
        throw error;
    }
};

export default decodeHostApplicationJWT;
