import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { Options } from "graphql-yoga";
import { connect } from "mongoose";
import app from "./app";
import fs from "fs";

const isDev: boolean = process.env.NODE_ENV === "development";
const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string =
    process.env.PLAYGROUND_ENDPOINT || "/playground";
const GRAPHQL_ENDPOINT: string = process.env.GRAPHQL_ENDPOINT || "/graphql";

const appOptions: Options = {
    port: PORT,
    playground: PLAYGROUND_ENDPOINT,
    endpoint: GRAPHQL_ENDPOINT
};

if(!isDev){
    appOptions.https = {
        key: fs.readFileSync(process.env.SSL_KEY_PATH || "", "utf-8"),
        cert: fs.readFileSync(process.env.SSL_CERT_PATH || "", "utf-8")
    };
}

const handleAppStart = () => {
    console.log(
        `Listening on http://${process.env.DB_ENDPOINT}:${PORT}${
            process.env.PLAYGROUND_ENDPOINT
        }`
    );
};

connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
        process.env.DB_ENDPOINT
    }:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
)
    .then(connection => {
        app.start(appOptions, handleAppStart);
    })
    .catch(err => {
        console.log(err);
    });
