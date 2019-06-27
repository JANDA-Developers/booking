import { Types } from "mongoose";
import { instanceMethod, InstanceType, prop, Typegoose } from "typegoose";
import { LayoutType } from "../types/graph";
import { ProductModel, ProductSchema } from "./Product";

export interface IMakeProductOptions {
    layoutType: LayoutType | null;
    requestedUrl: string | null;
}

export class ProductTypeSchema extends Typegoose {
    // TODO - HasHostApp: Boolean~ 생성하기
    @prop({ required: true, default: true })
    canHaveHostApp: boolean;

    @prop({ required: true })
    name: string;

    @prop({ required: true, default: 0 })
    price: number;

    @prop({
        default(this: ProductTypeSchema) {
            return this.price;
        }
    })
    discountedPrice: number;

    @prop({ required: true, default: -1 })
    roomCount: number;

    @prop({ required: true, default: 0 })
    roomCountExtraCharge: number; // 방 수 초과시 초과당 가격

    @prop({ required: true, default: -1 })
    bookingCount: number; // 한 달에 받을 수 있는 예약 수

    @prop({ required: true, default: 0 })
    bookingCountExtraCharge: number;

    @prop()
    description: string;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @instanceMethod
    public makeProduct(
        this: ProductTypeSchema,
        houseId: string,
        options?: IMakeProductOptions
    ): InstanceType<ProductSchema> {
        const product = new ProductModel({
            ...this,
            name: this.name,
            house: new Types.ObjectId(houseId),
            canHaveHostApp:
                this.canHaveHostApp === undefined ? true : this.canHaveHostApp
        });
        if (options) {
            product.setOptions({
                requestedUrl: options.requestedUrl || undefined,
                layoutType: options.layoutType || undefined
            });
        }
        delete product.createdAt;
        delete product.updatedAt;
        return product;
    }
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
