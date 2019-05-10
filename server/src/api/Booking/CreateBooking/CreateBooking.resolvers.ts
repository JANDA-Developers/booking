import * as _ from "lodash";
import {Types} from "mongoose";
import {InstanceType} from "typegoose";
import {BookerModel} from "../../../models/Booker";
import {BookingSchema} from "../../../models/Booking";
import {GuestModel, GuestSchema} from "../../../models/Guest";
import {extractBookings} from "../../../models/merge/merge";
import {RoomTypeModel} from "../../../models/RoomType";
import {GenderEnum} from "../../../types/enums";
import {
  CreateBookingMutationArgs,
  CreateBookingResponse,
  RoomCapacityWithEmptyBed
} from "../../../types/graph";
import {Resolvers} from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    CreateBooking: async (
      __,
      {bookingParams}: CreateBookingMutationArgs
    ): Promise<CreateBookingResponse> => {
      const {booker: bookerArgs, start, end, guestInputs} = bookingParams;

      try {
        // Booker 생성
        const bookerInstance = new BookerModel({
          ...bookerArgs,
          house: new Types.ObjectId(bookerArgs.house)
        });
        await bookerInstance.hashPassword();
        // Booker 생성 완료
        const bookings: Array<InstanceType<BookingSchema>> = await Promise.all(
          await guestInputs.map(
            async ({
              pricingType,
              roomTypeId,
              countFemaleGuest,
              countMaleGuest,
              countRoom,
              ...args
            }) => {
              const roomTypeInstance = await RoomTypeModel.findById(roomTypeId);
              if (!roomTypeInstance) {
                throw new Error("치명적 오류... roomType이 존재하지 않음");
              }
              const booking = await bookerInstance.createBookingInstance({
                start,
                end,
                roomTypeInstance,
                ...args
              });

              const genderCounts: Array<{
                gender?: GenderEnum;
                count: number;
              }> = [
                {
                  gender: undefined,
                  count: countRoom
                },
                {
                  gender: GenderEnum.MALE,
                  count: countMaleGuest
                },
                {
                  gender: GenderEnum.FEMALE,
                  count: countFemaleGuest
                }
              ].filter(genderCount => genderCount.count !== 0);

              // undefined 인 경우 => 게스트 Gender가 MIXED 또는 pricingType === "ROOM" 인 경우...
              const gender =
                countFemaleGuest === 0
                  ? GenderEnum.MALE
                  : countMaleGuest === 0
                  ? GenderEnum.FEMALE
                  : undefined;

              // 배정 가능한 방들 목록 생성
              const allocatableRooms: RoomCapacityWithEmptyBed[] = _.orderBy(
                await roomTypeInstance.getAllocatableRooms(start, end, {
                  gender
                }),
                ["guestGender", "availableCount"],
                ["asc", "asc"]
              );

              if (booking.pricingType !== "DOMITORY") {
                // 방타입인 경우 여기서 처리해버리자..
              }
              // TODO: 배정하는거 만들긔... allocatableRooms & genderCounts 콜라보해서...
              const guestInstances = _.flatMap(
                await Promise.all(
                  genderCounts.map(async genderCount => {
                    return await booking.createGuestInstances({
                      bookerName: bookerArgs.name,
                      pricingType,
                      genderCount
                    });
                  })
                )
              ).map(
                (guestInstance: InstanceType<GuestSchema>, index: number) => {
                  let i = 0;
                  // TODO: 여기서 배정해야함...
                  allocatableRooms.forEach(roomCapacity => {
                    if (
                      i < index + 1 &&
                      index + 1 < i + roomCapacity.availableCount
                    ) {
                      guestInstance.allocatedRoom = new Types.ObjectId(
                        roomCapacity.roomId
                      );
                      // 된건가?
                      guestInstance.bedIndex = roomCapacity.emptyBeds[0];
                    }
                    i = i + roomCapacity.availableCount;
                  });
                  return guestInstance;
                }
              );
              await GuestModel.insertMany(guestInstances);

              booking.guests = guestInstances.map(
                instance => new Types.ObjectId(instance._id)
              );
              return await booking.save();
            }
          )
        );
        bookerInstance.bookings = bookings.map(
          b => new Types.ObjectId(b._id.toString())
        );
        await bookerInstance.save();
        return {
          ok: true,
          error: null,
          bookings: await extractBookings(bookings)
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          bookings: []
        };
      }
    }
  }
};
export default resolvers;
