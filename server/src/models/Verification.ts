import { Types } from "mongoose";
import { instanceMethod, InstanceType, pre, prop, Typegoose } from "typegoose";
import { VerificationTarget } from "../types/graph";
import { UserModel, UserSchema } from "./User";

export enum Target {
    PHONE = "PHONE",
    EMAIL = "EMAIL"
}
@pre<VerificationSchema>("save", function(next) {
    if (this.key !== undefined) {
        next();
        return;
    }
    if (this.target === Target.PHONE) {
        this.key = Math.floor(Math.random() * 100000).toString();
    } else if (this.target === Target.EMAIL) {
        this.key = Math.random()
            .toString(36)
            .substr(2);
    }
    next();
})
class VerificationSchema extends Typegoose {
    @prop({ enum: Target, default: Target.PHONE })
    target: VerificationTarget;

    @prop({ required: true, unique: true })
    payload: string;

    @prop({ default: false })
    verified: boolean;

    @prop()
    key: string;

    @prop()
    user: Types.ObjectId

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @instanceMethod
    public async getUser(
        this: InstanceType<VerificationSchema>
    ): Promise<InstanceType<UserSchema> | undefined> {
        return (await UserModel.findById(this.user)) || undefined;
    }
}

export const VerificationModel = new VerificationSchema().getModelForClass(
    VerificationSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "verifications"
        }
    }
);
