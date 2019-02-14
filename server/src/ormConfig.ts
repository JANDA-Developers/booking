import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
    type: "mongodb",
    database: "janda_booking_api",
    synchronize: true,
    logging: true, 
    entities: ["models/**/*.*"],
    host: process.env.DB_ENDPOINT,
    port: 27017, 
    // url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-gk4ly.mongodb.net/${process.env.DB_NAME}?retryWrites=true`,
    useNewUrlParser: true
}

export default connectionOptions;