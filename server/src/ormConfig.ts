import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
    type: "mongodb",
    database: "janda_booking_api",
    synchronize: true,
    logging: true, 
    entities: ["models/**/*.*"],
    host: process.env.DB_ENDPOINT,
<<<<<<< HEAD
    // url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-gk4ly.mongodb.net/${process.env.DB_NAME}?retryWrites=true`,
    useNewUrlParser: true,
    port : 27017
=======
    port: 27017, 
    // url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-gk4ly.mongodb.net/${process.env.DB_NAME}?retryWrites=true`,
    useNewUrlParser: true
>>>>>>> 10777d80a99f753e7afbb7c99fa7f930ee78db64
}

export default connectionOptions;