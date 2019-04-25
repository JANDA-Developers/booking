import cors from "cors";
import { NextFunction, Response } from "express";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeHostApplicationJWT from "./utils/decodeHostApplicationJWT";
import decodeJWT from "./utils/decodeJWT";

class App {
    public app: GraphQLServer;

    constructor() {
        this.app = new GraphQLServer({
            schema,
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
}

export default new App().app;
