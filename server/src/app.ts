import cors from "cors";
import { NextFunction, Response } from "express";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import checkHousePublicKey from "./utils/checkHousePubilcKey";
import decodeJWT from "./utils/decodeJWT";
import decodeHostApplicationJWT from "./utils/decodeJWTHostApplication";

class App {
    public app: GraphQLServer;

    constructor() {
        this.app = new GraphQLServer({
            schema,
            resolverValidationOptions: {
                requireResolversForResolveType: false
            },
            context: req => {
                return {
                    req: req.request
                };
            }
        });
        this.middlewares();
    }

    private middlewares = (): void => {
        this.app.express.use(cors());
        this.app.express.use(logger("dev"));
        this.app.express.use(helmet());
        this.app.express.use(this.jwt);
        this.app.express.use(this.jwtHostApplication);
        this.app.express.use(this.houseAccess);
    };

    private jwt = async (
        req,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const token = req.get("X-JWT");

        if (token) {
            const user = await decodeJWT(token);
            req.user = user;
            // confirm!
        } else {
            req.user = undefined;
        }
        next();
    };

    private jwtHostApplication = async (
        req,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        // JANDA-HOUSE-TOKEN
        const token = req.get("JDH-T");
        if (token) {
            const house = await decodeHostApplicationJWT(token);
            req.house = house;
        } else {
            req.house = null;
        }
        next();
    };

    private houseAccess = async (req, res, next: NextFunction) => {
        // JANDA-HOUSE-TOKEN
        const pubilcKey = req.get("HP-Key");
        if (pubilcKey) {
            const house = await checkHousePublicKey(pubilcKey);
            req.house = house;
        } else {
            req.house = null;
        }
        next();
    };
}

export default new App().app;
