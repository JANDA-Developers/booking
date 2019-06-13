import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { bookingModel, BookingSchema } from "../../../models/Booking";
import { GuestModel } from "../../../models/Guest";
import { extractbooking } from "../../../models/merge/merge";
import { SmsInfoModel } from "../../../models/SmsInfo";
import {
    UpdateBookingMutationArgs,
    UpdateBookingResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { digitsComma, transDateToString } from "../../../utils/etc";
import { removeUndefined } from "../../../utils/objFuncs";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateBooking: privateResolver(
            async (
                __,
                { bookingId, params, sendSmsFlag }: UpdateBookingMutationArgs
            ): Promise<UpdateBookingResponse> => {
                try {
                    let bookingInstance:
                        | InstanceType<BookingSchema>
                        | undefined =
                        (await bookingModel.findById(bookingId)) || undefined;
                    if (!bookingInstance) {
                        return {
                            ok: false,
                            error: "존재하지 않는 BookingId",
                            booking: null
                        };
                    }
                    if (
                        params.bookingStatus === "COMPLETE" &&
                        bookingInstance.bookingStatus === "CANCEL"
                    ) {
                        return {
                            ok: false,
                            error:
                                "예약완료상태로 변경할 수 없습니다. 다시 예약을 잡아주세요",
                            booking: null
                        };
                    }
                    await bookingModel.findOneAndUpdate(
                        { _id: new Types.ObjectId(bookingId) },
                        {
                            $set: { ...params }
                        },
                        { new: true },
                        (err, doc) => {
                            console.log({
                                ...doc
                            });
                            if (doc) {
                                bookingInstance = doc;
                            }
                        }
                    );
                    if (!bookingInstance) {
                        return {
                            ok: false,
                            error: "존재하지 않는 bookingId입니다",
                            booking: null
                        };
                    }
                    if (params.name || params.bookingStatus) {
                        await GuestModel.updateMany(
                            {
                                booking: new Types.ObjectId(bookingId)
                            },
                            {
                                $set: removeUndefined({
                                    name: params.name,
                                    bookingStatus: params.bookingStatus
                                })
                            }
                        );

                        // TODO: SMS 날릴 예정
                        if (sendSmsFlag === null || sendSmsFlag === true) {
                            const smsInfo = await SmsInfoModel.findOne({
                                house: new Types.ObjectId()
                            });
                            if (smsInfo) {
                                const smsTemplate = await smsInfo.sendSmsWithTemplate(
                                    "WHEN_BOOKING_UPDATE",
                                    smsInfo.receivers.join("|"),
                                    {
                                        BOOKERNAME: bookingInstance.name,
                                        ROOMTYPE_N_COUNT: "",
                                        TOTALPRICE:
                                            digitsComma(bookingInstance.price) +
                                            "₩",
                                        STAYDATE_YMD: `${transDateToString(
                                            bookingInstance.start,
                                            "YMD"
                                        )}~${transDateToString(
                                            bookingInstance.end,
                                            "YMD"
                                        )}`,
                                        STAYDATE: `${transDateToString(
                                            bookingInstance.start,
                                            "MD"
                                        )}~${transDateToString(
                                            bookingInstance.end,
                                            "MD"
                                        )}`,
                                        PAYMENTSTATUS:
                                            bookingInstance.paymentStatus,
                                        PAYMETHOD: bookingInstance.payMethod
                                    }
                                );
                                console.log(smsTemplate);
                            }
                        }
                    }

                    return {
                        ok: true,
                        error: null,
                        booking:
                            bookingInstance &&
                            (await extractbooking.bind(
                                extractbooking,
                                bookingInstance
                            ))
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        booking: null
                    };
                }
            }
        )
    }
};
export default resolvers;
