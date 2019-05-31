import { Types } from "mongoose";
import { instanceMethod, InstanceType, prop, Typegoose } from "typegoose";

export class SmsSenderStatusSchema extends Typegoose {
    @prop({ required: true })
    phoneNumber: string;

    @prop({ required: true, default: false })
    registered: boolean;

    @prop()
    registeredDate: Date | null;

    @prop()
    user: Types.ObjectId;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @instanceMethod
    async registerForAligo(this: InstanceType<SmsSenderStatusSchema>) {
        this.registered = true;
        this.registeredDate = new Date();
        await this.save();
    }
}

export const SmsSenderStatusModel = new SmsSenderStatusSchema().getModelForClass(
    SmsSenderStatusSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "SmsSenderStatuses"
        }
    }
);