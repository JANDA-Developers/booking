import { Types } from "mongoose";
import { prop, Typegoose } from "typegoose";

export class RoomSchema extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    roomType: Types.ObjectId;

    @prop({ required: true })
    isEnable: boolean;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export const RoomModel = new RoomSchema().getModelForClass(RoomSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "RoomTypes.rooms"
    }
});
