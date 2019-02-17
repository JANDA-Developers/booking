import { Schema } from "mongoose";
import { prop, Typegoose } from "typegoose";

export enum HouseType {
    GUEST_HOUSE = "GUEST_HOUSE",
    HOSTEL = "HOSTEL",
    HOTEL = "HOTEL",
    MOTEL = "MOTEL",
    PENSION = "PENSION",
    YOUTH_HOSTEL = "YOUTH_HOSTEL"
}
class HouseSchema extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    houseType: string;

    @prop({ required: true, ref: "users" })
    user: Schema.Types.ObjectId;

    @prop({ required: true })
    location: string;

    // @prop({ required: true })
    // roomCount: string;

    // @prop({ required: true })
    // bedCount: string;

    @prop({ required: true })
    capacity: string;
}

export const House = new HouseSchema().getModelForClass(HouseSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "houses"
    }
});
