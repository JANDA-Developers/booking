import dotenv from "dotenv";
dotenv.config({ path: "../.env"});

import { Options } from "graphql-yoga";
import { connect } from "mongoose";
import app from "./app";

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

connect(
    `mongodb://localhost:27017/${process.env.DB_NAME}`,
    {
        useNewUrlParser: true
    }
)
    .then(connection => {
        app.start(appOptions, handleAppStart);
    })
    .catch(err => {
        console.log(err);
    });
