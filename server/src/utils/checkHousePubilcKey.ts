import { InstanceType } from "typegoose";
import { HouseModel, HouseSchema } from "../models/House";

const checkHousePublicKey = async (
    publicKey: string
): Promise<InstanceType<HouseSchema> | undefined> => {
    try {
        const house = await HouseModel.findOne({ publicKey });
        return house || undefined;
    } catch (error) {
        throw error;
    }
};

export default checkHousePublicKey;
