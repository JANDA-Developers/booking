import { ObjectId } from "bson";
import { Types } from "mongoose";
import { pre, prop, Typegoose } from "typegoose";
import { DisableRange } from "../types/graph";

@pre<RoomSchema>("save", async function(next) {
    try {
        if (this.index <= 0 || !this.index) {
            const test = await RoomModel.findOne({
                roomType: new ObjectId(this.roomType)
            }).sort({ index: -1 });
            if (test) {
                this.index = test.index + 1;
            }
        }
        this.roomType = new ObjectId(this.roomType);
    } catch (error) {
        throw error;
    }
    next();
})
export class RoomSchema extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    roomType: Types.ObjectId;

    @prop({ min: 0 })
    index: number;

    @prop({ default: [] })
    disableRanges: DisableRange[];

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export const RoomModel = new RoomSchema().getModelForClass(RoomSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Rooms"
    }
});
