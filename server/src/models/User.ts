import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import {
    arrayProp,
    instanceMethod,
    InstanceType,
    prop,
    Typegoose
} from "typegoose";
import { UserRole } from "../types/graph";
import { agencyIdGen } from "../utils/uuidgen";

export enum UserRoleEnum {
    ADMIN = "ADMIN",
    AGENCY = "AGENCY",
    HOST = "HOST",
    booking = "booking",
    GHOST = "GHOST"
}
const BCRYPT_ROUNDS = 10;

export class UserSchema extends Typegoose {
    @prop({ default: null })
    agencyId: string;

    @prop({ required: [true, `Name is missing`] })
    name: string;

    @prop()
    password: string | null;

    @prop({ required: true })
    phoneNumber: string;

    @prop({ default: false })
    isPhoneVerified: boolean;

    @prop({ required: true, index: true })
    email: string;

    @prop({ default: false })
    isEmailVerified: boolean;

    @prop({ enum: UserRoleEnum, default: UserRoleEnum.HOST })
    userRole: UserRole;

    @prop({ default: [UserRoleEnum.HOST] })
    userRoles: UserRole[];

    @prop()
    profileImg: string;

    @prop({ default: false })
    checkPrivacyPolicy: boolean;

    @arrayProp({ items: Types.ObjectId, default: [], itemsRef: "Houses" })
    houses: Types.ObjectId[];

    @arrayProp({ items: Types.ObjectId, default: [] })
    consignedHouses: Types.ObjectId[];

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

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

    @instanceMethod
    public async makeAgencyId(this: InstanceType<UserSchema>): Promise<string> {
        this.agencyId = agencyIdGen();
        await this.save();
        return this.agencyId;
    }
}

export const UserModel = new UserSchema().getModelForClass(UserSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Users"
    }
});
