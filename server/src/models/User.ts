import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import {
    arrayProp,
    instanceMethod,
    InstanceType,
    prop,
    Typegoose
} from "typegoose";

export enum UserRole {
    ADMIN = "ADMIN",
    HOST = "HOST",
    BOOKER = "BOOKER",
    GHOST = "GHOST"
}
const BCRYPT_ROUNDS = 10;

export class UserSchema extends Typegoose {
    @prop({ required: [true, `firstName is missing`] })
    name: string;

    @prop()
    password: string | null;

    @prop({ required: true })
    phoneNumber: string;

    @prop({ default: false })
    verifiedPhone: boolean;

    @prop({ required: true, index: true })
    email: string;

    @prop({ default: false })
    verifiedEmail: boolean;

    @prop({ enum: UserRole, default: UserRole.GHOST })
    userRole: UserRole;

    @prop({ default: false })
    checkPrivacyPolicy: boolean;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @arrayProp({ items: Types.ObjectId, default: [] })
    houses: Types.ObjectId[];

    @instanceMethod
    public async comparePassword(
        this: InstanceType<UserSchema>,
        password: string
    ): Promise<boolean> {
        if (this.password) {
            return await bcrypt.compare(password, this.password || "");
        } else {
            throw new Error("Password is not exist!");
        }
    }

    @instanceMethod
    public async hashPassword(this: InstanceType<UserSchema>): Promise<void> {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, BCRYPT_ROUNDS);
        }
    }
}

export const UserModel = new UserSchema().getModelForClass(UserSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "users"
    }
});
