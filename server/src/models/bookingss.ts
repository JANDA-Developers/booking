import bcrypt from "bcryptjs";
import { HookNextFunction, Types } from "mongoose";
import { instanceMethod, InstanceType, pre, prop, Typegoose } from "typegoose";
import {
    BookingStatusEnum,
    GenderEnum,
    PaymentStatusEnum,
    PayMethodEnum
} from "../types/enums";
import {
    BookingStatus,
    CheckIn,
    PaymentStatus,
    PayMethod
} from "../types/graph";
import { GuestModel, GuestSchema } from "./Guest";
import { RoomTypeSchema } from "./RoomType";

const BCRYPT_ROUNDS = 10;
/**
 * User와 다른 스키마임.
 * booking는 숙소 웹사이트로부터 들어오는 '비회원'예약을 위한 스키마.
 * 회원이 아님. 그냥 예약자들 목록임
 */
@pre<BookingSchema>("save", function(
    this: InstanceType<BookingSchema>,
    next: HookNextFunction
) {
    if (this.guests) {
        this.guestCount = this.guests.length;
    }
    next();
})
@pre<BookingSchema>("update", function(
    this: InstanceType<BookingSchema>,
    next: HookNextFunction
) {
    if (this.guests) {
        this.guestCount = this.guests.length;
    }
    next();
})
export class BookingSchema extends Typegoose {
    @prop({ required: true })
    house: Types.ObjectId;

    @prop({ default: [] })
    roomTypes: Types.ObjectId[];

    @prop({ required: [true, `Name is Missing`] })
    name: string;

    @prop()
    password: string | null;

    @prop({ required: [true, "PhoneNumber is Missing"] })
    phoneNumber: string;

    @prop({ required: true, index: true })
    email: string;

    @prop({
        default(): CheckIn {
            return {
                isIn: false,
                checkInDateTime: null
            };
        }
    })
    checkIn: CheckIn;

    @prop()
    memo?: string;

    @prop({
        validate(this: BookingSchema) {
            return this.agreePrivacyPolicy;
        },
        default: false
    })
    agreePrivacyPolicy: boolean;

    @prop({ default: [] })
    guests: Types.ObjectId[];

    @prop({
        default(this: InstanceType<BookingSchema>) {
            return this.guests.length;
        }
    })
    guestCount: number;

    @prop()
    start: Date;

    @prop()
    end: Date;

    @prop()
    price: number;

    @prop({
        required: true,
        enum: PayMethodEnum,
        default: PayMethodEnum.CASH
    })
    payMethod: PayMethod;

    @prop({
        required: true,
        enum: PaymentStatusEnum,
        default: PaymentStatusEnum.NOT_YET
    })
    paymentStatus: PaymentStatus;

    @prop({ enum: BookingStatusEnum, default: BookingStatusEnum.COMPLETE })
    bookingStatus: BookingStatus;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @instanceMethod
    public async comparePassword(
        this: InstanceType<BookingSchema>,
        password: string
    ): Promise<boolean> {
        if (this.password) {
            return await bcrypt.compare(password, this.password || "");
        } else {
            throw new Error("Password is not exist!");
        }
    }

    @instanceMethod
    public async hashPassword(this: InstanceType<BookingSchema>): Promise<void> {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, BCRYPT_ROUNDS);
        }
    }

    /**
     * booking와 연동할 게스트 생성
     * @param dateRange
     * @param gender
     * @param roomTypeInstance
     * @param allocatedRoom
     * @param bedIndex
     * @param isUnsettled
     */
    @instanceMethod
    createGuest(
        this: InstanceType<BookingSchema>,
        dateRange: { start: Date; end: Date },
        gender: GenderEnum,
        roomTypeInstance: InstanceType<RoomTypeSchema>,
        allocatedRoom: Types.ObjectId,
        bedIndex: number,
        isUnsettled: boolean = false
    ): InstanceType<GuestSchema> {
        const { start, end } = dateRange;
        const guestInstance = new GuestModel({
            house: new Types.ObjectId(this.house),
            booking: new Types.ObjectId(this._id),
            name: this.name,
            roomType: new Types.ObjectId(roomTypeInstance._id),
            pricingType: roomTypeInstance.pricingType,
            gender,
            allocatedRoom,
            bedIndex,
            isUnsettled,
            start,
            end
        });
        return guestInstance;
    }

    /**
     * booking.guests 배열에 게스트들을 push함
     * @param guestInstances 연결할 게스트 인스턴스 목록
     */
    @instanceMethod
    async pushGuests(
        this: InstanceType<BookingSchema>,
        guestInstances: Array<InstanceType<GuestSchema>>
    ) {
        this.guests = [
            ...this.guests,
            ...guestInstances.map(
                guestInstance => new Types.ObjectId(guestInstance._id)
            )
        ];
        await this.save();
    }

    @instanceMethod
    async deleteThis(this: InstanceType<BookingSchema>) {
        await GuestModel.remove({
            _id: { $in: this.guests }
        });
        await this.remove();
    }
}

export const bookingModel = new BookingSchema().getModelForClass(BookingSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "bookings"
    }
});
