import { pre, prop, Ref, Typegoose } from "typegoose";
import { UserSchema } from "./User";

export enum VerificationTarget {
    PHONE = "PHONE",
    EMAIL = "EMAIL"
}
@pre<VerificationSchema>("save", function(next) {
    if (this.key !== undefined) {
        next();
        return;
    }
    if (this.target === VerificationTarget.PHONE) {
        this.key = Math.floor(Math.random() * 100000).toString();
    } else if (this.target === VerificationTarget.EMAIL) {
        this.key = Math.random()
            .toString(36)
            .substr(2);
    }
    next();
})
class VerificationSchema extends Typegoose {
    @prop({ enum: VerificationTarget, default: VerificationTarget.PHONE })
    target: string;

    @prop({ required: true, unique: true })
    payload: string;

    @prop({ default: false })
    verified: boolean;

    @prop()
    key: string;

    @prop({ ref: UserSchema, required: true, unique: true })
    user: Ref<UserSchema>;
}

export const Verification = new VerificationSchema().getModelForClass(
    VerificationSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "verifications"
        }
    }
);
