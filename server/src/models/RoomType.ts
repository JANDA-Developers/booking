import { ObjectId } from "bson";
import { Types } from "mongoose";
import { arrayProp, index, pre, prop, Ref, Typegoose } from "typegoose";
import { PricingType } from "../types/graph";
import { RoomSchema } from "./Room";

export enum PricingTypeEnum {
    ROOM = "ROOM",
    DOMITORY = "DOMITORY"
}

export enum RoomGenderEnum {
    FEMALE,
    MALE,
    MIXED,
    SEPARATELY
}

@index({ house: 1 })
@index({ index: -1 })
@pre<RoomTypeSchema>("save", async function(next) {
    try {
        if (this.index <= 0 || !this.index) {
            const test = await RoomTypeModel.findOne({
                house: new ObjectId(this.house)
            }).sort({ index: -1 });
            if (test) {
                this.index = test.index + 1;
            }
        }
        this.house = new ObjectId(this.house);
    } catch (error) {
        throw error;
    }
    next();
})
export class RoomTypeSchema extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    house: Types.ObjectId;

    @prop({
        required: true,
        default: PricingTypeEnum.ROOM,
        enum: PricingTypeEnum
    })
    pricingType: PricingType;

    @prop({
        required: [
            function(this: RoomTypeSchema) {
                return 0 < this.peopleCount;
            },
            "Too Few peopleCount..."
        ],
        default: 1
    })
    peopleCount: number;

    @prop({
        required: [
            function(this: RoomTypeSchema): boolean {
                return this.peopleCount <= this.peopleCountMax;
            },
            "PeopleCountMax is Always Higher than PeopleCount."
        ],
        default(this: RoomTypeSchema) {
            return this.peopleCount;
        }
    })
    peopleCountMax: number;

    @prop({
        min: 0,
        default: 0
    })
    index: number;

    @prop()
    description: string;

    @prop({ default: 0 })
    price: number;

    @prop()
    tags: string;

    @arrayProp({ itemsRef: RoomSchema, default: [] })
    rooms: Array<Ref<RoomSchema>>;

    @prop()
    get roomCount(): number {
        return -1;
    }

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export const RoomTypeModel = new RoomTypeSchema().getModelForClass(
    RoomTypeSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "RoomTypes"
        }
    }
);