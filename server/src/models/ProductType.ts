import { ObjectId } from "bson";
import { instanceMethod, InstanceType, prop, Typegoose } from "typegoose";
import { ProductModel, ProductSchema } from "./Product";

export class ProductTypeSchema extends Typegoose {
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

    @prop({ default: true })
    canUseHostApp: boolean;
    
    @prop()
    description: string;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @instanceMethod
    public makeProduct(
        this: ProductTypeSchema,
        houseId: string
    ): InstanceType<ProductSchema> {
        const product = new ProductModel({
            ...this,
            name: this.name,
            house: new ObjectId(houseId)
        });
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
