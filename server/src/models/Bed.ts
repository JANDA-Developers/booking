import { Types } from "mongoose";
import { instanceMethod, InstanceType, prop, Typegoose } from "typegoose";
import { Guest } from "../types/graph";
import { transformGuests } from "./merge/merge";

export class BedSchema extends Typegoose {
    @prop()
    name: string;

    @prop({ default: 0 })
    index: number;

    @prop({ required: true })
    roomType: Types.ObjectId;

    @prop({ required: true })
    room: Types.ObjectId;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @instanceMethod
    get getName(this: InstanceType<BedSchema>): string {
        return "";
    }

    @instanceMethod
    async allocatedGuest(
        this: InstanceType<BedSchema>,
        start: Date,
        end: Date
    ): Promise<Guest[]> {
        // 해당 날짜 사이에 배정되어있는 게스트들을 전부 가져온다.

        return await transformGuests([]);
    }
}

export const BedModel = new BedSchema().getModelForClass(BedSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Beds"
    }
});
