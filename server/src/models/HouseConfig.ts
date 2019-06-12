import { Types } from "mongoose";
import { prop, Typegoose } from "typegoose";
import { PollingPeriod } from "../types/graph";

// 필드선언 메소드선언
export class HouseConfigSchema extends Typegoose {
    @prop({ required: true })
    house: Types.ObjectId;

    @prop({
        default: {
            enable: false,
            period: 5000
        }
    })
    pollingPeriod: PollingPeriod;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

//
export const HouseConfigModel = new HouseConfigSchema().getModelForClass(
    HouseConfigSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "HouseConfigs"
        }
    }
);
