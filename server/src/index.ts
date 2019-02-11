import dotenv from "dotenv";
dotenv.config();

import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import app from "./app";
import connectionOptions from "./ormConfig";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string =
    process.env.PLAYGROUND_ENDPOINT || "/playground";
const GRAPHQL_ENDPOINT: string = process.env.GRAPHQL_ENDPOINT || "/graphql";

const appOptions: Options = {
    port: PORT,
    playground: PLAYGROUND_ENDPOINT,
    endpoint: GRAPHQL_ENDPOINT
};

const handleAppStart = () => {
    console.log(
        `Listening on http://localhost:${PORT}${
            process.env.PLAYGROUND_ENDPOINT
        }`
    );
};

createConnection(connectionOptions)
    .then(() => {
        app.start(appOptions, handleAppStart);
    })
    .catch(err => {
        console.log(err);
    });
