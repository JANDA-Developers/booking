import { InstanceType } from "typegoose";
import { HouseSchema } from "../../../../models/House";
import { extractHouse } from "../../../../models/merge/merge";
import {
    UpdateHouseToHostAppMutationArgs,
    UpdateHouseToHostAppResponse
} from "../../../../types/graph";
import { Resolvers } from "../../../../types/resolvers";
import privateResolverForHostApp from "../../../../utils/privateResolverForHostApplication";

const resolvers: Resolvers = {
    Mutation: {
        UpdateHouseToHostApp: privateResolverForHostApp(
            async (
                _,
                args: UpdateHouseToHostAppMutationArgs,
                { req }
            ): Promise<UpdateHouseToHostAppResponse> => {
                try {
                    const existingHouse: InstanceType<HouseSchema> = req.house;
                    await existingHouse.update(
                        {
                            ...args
                        },
                        {
                            new: true
                        }
                    );
                    if (!existingHouse) {
                        return {
                            ok: false,
                            error: "House is Not Exist!",
                            house: null
                        };
                    }
                    return {
                        ok: true,
                        error: null,
                        house: await extractHouse.bind(
                            extractHouse,
                            existingHouse
                        )
                    };
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
