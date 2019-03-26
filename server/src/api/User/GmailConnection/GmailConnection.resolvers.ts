import { Resolvers } from "src/types/resolvers";
import { GmailConnectionResponse } from "../../../types/graph";

const resolvers: Resolvers = {
    Mutation: {
        GmailConnect: async (_, args): Promise<GmailConnectionResponse> => {
            return {
                ok: false,
                error: "Under Develop",
                token: null
            };
        }
    }
};
export default resolvers;
