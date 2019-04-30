import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import {
    arrayProp,
    instanceMethod,
    InstanceType,
    prop,
    Typegoose
} from "typegoose";

const BCRYPT_ROUNDS = 10;
/**
 * User와 다른 스키마임.
 * Booker는 숙소 웹사이트로부터 들어오는 '비회원'예약을 위한 스키마.
 * 회원이 아님. 그냥 예약자들 목록임
 */
export class BookerSchema extends Typegoose {
    @prop({ required: true })
    house: Types.ObjectId;

    @arrayProp({ items: Types.ObjectId })
    bookings: Types.ObjectId[];

    @prop({ required: [true, `Name is Missing`] })
    name: string;

    @prop()
    password: string | null;

    @prop({ required: [true, "PhoneNumber is Missing"] })
    phoneNumber: string;

    @prop({ required: true, index: true })
    email: string;

    @prop({
        validate(this: BookerSchema) {
            return this.agreePrivacyPolicy;
        },
        default: false
    })
    agreePrivacyPolicy: boolean;

    @prop()
    isCheckIn?: Date;

    @prop()
    memo?: string;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @instanceMethod
    public async comparePassword(
        this: InstanceType<BookerSchema>,
        password: string
    ): Promise<boolean> {
        if (this.password) {
            return await bcrypt.compare(password, this.password || "");
        } else {
            throw new Error("Password is not exist!");
        }
    }

    @instanceMethod
    public async hashPassword(this: InstanceType<BookerSchema>): Promise<void> {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, BCRYPT_ROUNDS);
        }
    }
}

export const BookerModel = new BookerSchema().getModelForClass(BookerSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Bookers"
    }
});
