import { prop, Ref, Typegoose } from "typegoose";
import { HouseSchema } from "./House";

export class ProductSchema extends Typegoose {
    @prop({ ref: HouseSchema, required: true })
    house: Ref<HouseSchema>;

    @prop({ required: true, default: 0 })
    price: number;

    @prop({
        required: true,
        default(this: ProductSchema) {
            return this.price;
        }
    })
    discountedPrice: number;

    @prop({ required: true, default: -1 })
    roomCount: number; // -1 일때 무제한.

    @prop({ required: true, default: 0 })
    roomCountExtraCharge: number; // 방 수 초과시 초과당 가격

    @prop({ required: true, default: -1 })
    bookingCount: number; // 한 달에 받을 수 있는 예약 수 => -1 일때 무제한

    @prop({ required: true, default: 0 })
    bookingCountExtraCharge: number;

    @prop()
    description: string;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export const ProductModel = new ProductSchema().getModelForClass(
    ProductSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "Products"
        }
    }
);
