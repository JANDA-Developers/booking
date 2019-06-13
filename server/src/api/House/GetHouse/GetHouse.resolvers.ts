import { Types } from "mongoose";
import { HouseModel } from "../../../models/House";
import { extractHouse } from "../../../models/merge/merge";
import {
    GetHouseQueryArgs,
    GetHouseResponse,
    UserRole
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { removeUndefined } from "../../../utils/objFuncs";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetHouse: privateResolver(
            async (
                _,
                { houseId }: GetHouseQueryArgs,
                { req }
            ): Promise<GetHouseResponse> => {
                try {
                    const { user } = req;
                    const { userRole }: { userRole: UserRole } = user;
                    const house = await HouseModel.findOne(
                        removeUndefined({
                            _id: new Types.ObjectId(houseId),
                            user:
                                userRole === "ADMIN"
                                    ? undefined
                                    : new Types.ObjectId(user._id)
                        })
                    );
                    if (house) {
                        return {
                            ok: true,
                            error: null,
                            house: await extractHouse.bind(extractHouse, house)
                        };
                    } else {
                        return {
                            ok: false,
                            error: "숙소 정보가 존재하지 않습니다.(H001)",
                            house: null
                        };
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        house: null
                    };
                }
            }
        )
    }
};

export default resolvers;
