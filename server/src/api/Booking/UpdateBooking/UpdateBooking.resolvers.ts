import { BookingModel } from "../../../models/Booking";
import {
    UpdateBookingMutationArgs,
    UpdateBookingResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateBooking: async (
            _,
            {
                bookingId,
                bookingStatus,
                start,
                end,
                price
            }: UpdateBookingMutationArgs
        ): Promise<UpdateBookingResponse> => {
            const booking = await BookingModel.findById(bookingId);
            console.log(booking);
            if (!booking) {
                return {
                    ok: false,
                    error: "존재하지 않는 예약",
                    bookings: []
                };
            }
            // start, end 날짜를 변경하는 경우.
            // booking 에 해당하는것들 다 변경해야됨...?
            // TODO: 날짜 변경, 방 변경, 결제방식 변경, 예약 상태 변경
            // 가격 변경.
            // 날짜가 변경된다고 해서 가격이 같이 바뀌지는 않음. 계산 안해줌.

            return {
                ok: false,
                error: "개발중",
                bookings: []
            };
        }
    }
};

export default resolvers;
