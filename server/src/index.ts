import dotenv from "dotenv";

dotenv.config({
    path: "../.env"
});

import fs from "fs";
import { Options } from "graphql-yoga";
import { connect } from "mongoose";
import app from "./app";

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

if (!isDev) {
    appOptions.https = {
        key: fs.readFileSync(process.env.SSL_KEY_PATH || "", "utf-8"),
        cert: fs.readFileSync(process.env.SSL_CERT_PATH || "", "utf-8")
    };
}

const handleAppStart = () => {
    console.log(
        `Listening on http://${process.env.DB_ENDPOINT}:${PORT}${process.env.PLAYGROUND_ENDPOINT}`
    );
};

const dbUri = isDev
    ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-gk4ly.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    : `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_ENDPOINT}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

connect(
    dbUri,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
)
    .then(connection => {
        if (isDev) {
            console.log(`DB Uri: ${dbUri}`);
        }
        app.start(appOptions, handleAppStart);
    })
    .catch(err => {
        console.log(err);
    });
