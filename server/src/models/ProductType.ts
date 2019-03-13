import { prop, Typegoose } from "typegoose";

export class ProductTypeSchema extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true, default: 0 })
    price: number;

    @prop({ required: true, default: 1 })
    roomCount: number;

    @prop({ required: true, default: 0 })
    roomCountExtraCharge: number; // 방 수 초과시 초과당 가격

    @prop({ required: true, default: 300 })
    bookingCount: number; // 한 달에 받을 수 있는 예약 수

    @prop({ required: true, default: 0 })
    bookingCountExtraCharge: number;

    @prop()
    description: string;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export const ProductTypeModel = new ProductTypeSchema().getModelForClass(
    ProductTypeSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "ProductTypes"
        }
    }
);
