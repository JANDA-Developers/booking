import { Types } from "mongoose";
import { prop, Typegoose } from "typegoose";
import { HouseType, Location, TermsOfBooking } from "../types/graph";

export enum Type {
    GUEST_HOUSE = "GUEST_HOUSE",
    HOSTEL = "HOSTEL",
    HOTEL = "HOTEL",
    MOTEL = "MOTEL",
    PENSION = "PENSION",
    YOUTH_HOSTEL = "YOUTH_HOSTEL"
}
export class HouseSchema extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true, enum: Type, default: Type.GUEST_HOUSE })
    houseType: HouseType;

    @prop({ required: true })
    location: Location;

    @prop()
    termsOfBooking: TermsOfBooking | undefined;

    @prop({ required: true, unique: true })
    user: Types.ObjectId;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export const HouseModel = new HouseSchema().getModelForClass(HouseSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "houses"
    }
});
