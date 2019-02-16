import jwt from "jsonwebtoken";
import { getMongoRepository } from "typeorm";
import User from "../models/User";

const decodeJWT = async (token: string): Promise<User | undefined> => {
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
        const { id } = decoded;
        const rmg = getMongoRepository(User);
        const user = await rmg.findOne(id);
        // const user = await User.findOne({ where:{id} });
        console.log({
            token,
            id,
            // objectId: new ObjectId(id.toString()),
            user
        });
        return user;
    } catch (error) {
        return undefined;
    }
};

export default decodeJWT;
