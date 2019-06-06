import { prop, Ref, Typegoose } from "typegoose";
import { ApplicationType } from "../types/graph";
import { appilcationKeyGen } from "../utils/uuidgen";
import { HouseSchema } from "./House";
import { UserSchema } from "./User";
export enum ApplicationTypeEnum {
    BOOKING_WEB = "BOOKING_WEB"
}
export class HostApplicationSchema extends Typegoose {
    @prop({ ref: HouseSchema, required: true })
    house: Ref<HouseSchema>;

    @prop({ ref: UserSchema, required: true })
    user: Ref<UserSchema>;

    @prop({ required: true })
    url: string;

    @prop({ default: appilcationKeyGen() })
    applicationKey: string; // uuidGen으로 생성

    @prop({
        required: true,
        enum: ApplicationTypeEnum,
        default: ApplicationTypeEnum.BOOKING_WEB
    })
    applicationType: ApplicationType;

    @prop()
    description: string;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export const HostApplicationModel = new HostApplicationSchema().getModelForClass(
    HostApplicationSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "HostApplications"
        }
    }
);
