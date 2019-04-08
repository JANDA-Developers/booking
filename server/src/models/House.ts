import { prop, Ref, Typegoose, arrayProp } from "typegoose";
import { HouseType, Location, TermsOfBooking } from "../types/graph";
import { HostApplicationSchema } from "./HostApplication";
import { ProductSchema } from "./Product";
import { UserSchema } from "./User";
import { ObjectId } from "bson";

export enum Type {
    GUEST_HOUSE = "GUEST_HOUSE",
    HOSTEL = "HOSTEL",
    HOTEL = "HOTEL",
    MOTEL = "MOTEL",
    PENSION = "PENSION",
    YOUTH_HOSTEL = "YOUTH_HOSTEL"
}
export class HouseSchema extends Typegoose {
    @prop({ ref: HostApplicationSchema })
    hostApplication?: Ref<HostApplicationSchema>;

    @prop({ ref: ProductSchema, required: true })
    product?: Ref<ProductSchema>;

    @prop({ required: true })
    name: string;

    @prop({ required: true, enum: Type, default: Type.GUEST_HOUSE })
    houseType: HouseType;

    @prop({ required: true })
    location: Location;

    @prop()
    termsOfBooking: TermsOfBooking | undefined;

    @arrayProp({ items: ObjectId, default: [] })
    refundPolicy: ObjectId[];

    @prop({ ref: UserSchema, required: true })
    user: Ref<UserSchema>;

    @arrayProp({ items: ObjectId, default: [] })
    roomTypes: ObjectId[];

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @prop()
    moduleSrl?: number;
}

export const HouseModel = new HouseSchema().getModelForClass(HouseSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Houses"
    }
});
