import {Types} from "mongoose";
import {arrayProp, prop, Ref, Typegoose} from "typegoose";
import {
  AppInfo,
  HouseType,
  Location,
  TermsOfBooking,
  HouseConfig
} from "../types/graph";
import {houseAccessKeyGen} from "../utils/uuidgen";
import {ProductSchema} from "./Product";

export enum Type {
  GUEST_HOUSE = "GUEST_HOUSE",
  HOSTEL = "HOSTEL",
  HOTEL = "HOTEL",
  MOTEL = "MOTEL",
  PENSION = "PENSION",
  YOUTH_HOSTEL = "YOUTH_HOSTEL"
}
export class HouseSchema extends Typegoose {
  @prop({default: houseAccessKeyGen})
  publicKey: string;

  @prop({ref: ProductSchema, required: true})
  product?: Ref<ProductSchema>;

  @prop()
  appInfo: AppInfo;

  @prop({required: true})
  name: string;

  @prop({
    required: true,
    enum: Type,
    default: Type.GUEST_HOUSE
  })
  houseType: HouseType;

  @prop({required: true})
  location: Location;

  @prop()
  termsOfBooking: TermsOfBooking | undefined;

  @arrayProp({items: Types.ObjectId, default: []})
  refundPolicy: Types.ObjectId[];

  @prop({required: true})
  user: Types.ObjectId;

  @prop({default: []})
  agencies: Types.ObjectId[];

  @prop({required: true})
  smsInfo: Types.ObjectId;

  @arrayProp({items: Types.ObjectId, default: []})
  roomTypes: Types.ObjectId[];

  @prop({
    default: {
      pollingPeriod: {
        enable: false,
        period: 5000
      },
      assigTimeline: {
        roomTypeTabEnable: false
      }
    }
  })
  houseConfig: HouseConfig;

  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;

  @prop()
  userRequestedAt: Date;
}

export const HouseModel = new HouseSchema().getModelForClass(HouseSchema, {
  schemaOptions: {
    timestamps: true,
    collection: "Houses"
  }
});
