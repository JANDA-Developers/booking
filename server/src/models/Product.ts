import { instanceMethod, InstanceType, prop, Ref, Typegoose } from "typegoose";
import {
    AppInfoRequest,
    AppInfoRequestInput,
    LayoutType
} from "../types/graph";
import { HouseSchema } from "./House";
import { ProductTypeSchema } from "./ProductType";

export class ProductSchema extends Typegoose {
    @prop()
    appliedUrl: string;

    @prop({ required: true })
    name: string;

    @prop({ required: true, ref: HouseSchema })
    house: Ref<HouseSchema>;

    @prop({ required: true, ref: ProductTypeSchema })
    productType: Ref<ProductTypeSchema>;

    @prop({ required: true, default: 0 })
    price?: number;

    @prop({
        default(this: ProductSchema) {
            return this.price;
        }
    })
    discountedPrice?: number;

    @prop({ required: true, default: -1 })
    roomCount?: number; // -1 일때 무제한.

    @prop({ required: true, default: 0 })
    roomCountExtraCharge?: number; // 방 수 초과시 초과당 가격

    @prop({ required: true, default: -1 })
    bookingCount?: number; // 한 달에 받을 수 있는 예약 수 => -1 일때 무제한

    @prop({ required: true, default: 0 })
    bookingCountExtraCharge?: number;

    @prop({ required: true })
    canHaveHostApp: boolean;

    @prop({ default: false })
    existingHostApp: boolean;

    @prop({ enum: ["Layout_A", "Layout_B"], default: "Layout_A" })
    layoutType: LayoutType;

    @prop({ default: 0 })
    layoutPrice: number;

    @prop({ default: false })
    layoutPricePaid: boolean;

    @prop()
    description?: string;

    @prop({ default: [] })
    appInfoRequested: AppInfoRequest[];

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @instanceMethod
    setOptions(
        this: InstanceType<ProductSchema>,
        options: {
            layoutType?: LayoutType;
            layoutPrice?: number;
            layoutPricePaid?: boolean;
            url?: string;
        }
    ) {
        if (options.layoutType) {
            this.layoutType = options.layoutType;
        }
        if (options.layoutPricePaid) {
            this.layoutPricePaid = options.layoutPricePaid;
        }
        if (options.layoutPrice) {
            this.layoutPrice = options.layoutPrice;
        }
        if (options.url) {
            this.appliedUrl = options.url;
        }
    }

    @instanceMethod
    async requestUpdateAppInfo(
        this: InstanceType<ProductSchema>,
        appInfoRequest: AppInfoRequestInput
    ): Promise<AppInfoRequest> {
        const appInfoReq: AppInfoRequest = {
            ...appInfoRequest,
            useHostApp: appInfoRequest.useHostApp || false,
            layoutType: appInfoRequest.layoutType || "Layout_A",
            isDone: false,
            requestedDate: new Date()
        };
        await this.updateOne({
            $push: appInfoReq
        });
        this.appInfoRequested.push(appInfoReq);
        return appInfoReq;
    }
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
