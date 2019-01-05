import mongoose from "mongoose";
import db_conf from "./config/db_config";

mongoose
    .connect(db_conf.uri, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB connection Success!");
    })
    .catch(err => {
        console.log(err);
    });

const Schema = mongoose.Schema;

const defaultDatetime = () => {
    let now = new Date();
    now.setHours(now.getHours() + 9);
    return now;
}

const bookerSchema = new Schema({
    id: String, 
    name: { type: String, required: true },
    phone_num: { type: String, required: true },
    email: { type: String },
    status: { type: String },
    created: { type: Date, default: defaultDatetime },
    updated: { type: Date, default: defaultDatetime }
}, {
    collection: "bookers"
});

const types = [
    'DOMITORI', 'ROOM'
];

// const roomTypeSchema = new Schema({
//     name: { type: String, required: [true, "RoomType.name is Missing!"], trim: true, unique: true },
//     name_alias: { type: String, required: [ true, "RoomType.name_alias is Missing1" ], unique: true, trim: true },
//     type: { type: String, enum: types, default: rTypes[0] },
//     comment: { type: String },
//     min: { type: Number, required: () => this.type === types[0], min: [ 1, "Too few People"] },
//     min: { type: Number, required: () => this.type === types[0], min: this.min },
//     is_enable: { type: Boolean, default: true },
//     reg_date: { type: Date, default: Date.now },

// }, {
//     collection: "roomType"
// });

// const floorSchema = new Schema({
//     name: { type: String, required: [ true, "Floor.name is Missing!" ], trim: true, unique: true },
//     sort_num: { type: Number, default: () => -1, }

// });

export const bookers = mongoose.model('bookers', bookerSchema);
// export const roomType = mongoose.model('roomType', roomTypeSchema)
