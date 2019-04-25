import { instanceMethod, InstanceType, prop, Ref, Typegoose } from "typegoose";
import { DayOfWeekPrice } from "../types/graph";
import { applyDaysToArr, DayOfWeekEnum } from "../utils/applyDays";
import { RoomTypeSchema } from "./RoomType";
import { SeasonSchema } from "./Season";

export class SeasonPriceSchema extends Typegoose {
    @prop({ required: true, ref: RoomTypeSchema })
    roomType: Ref<RoomTypeSchema>;

    @prop({ required: true, ref: SeasonSchema })
    season: Ref<SeasonSchema>;

    @prop({ required: true })
    defaultPrice: number;

    @prop({
        required: true,
        validate(
            this: InstanceType<SeasonPriceSchema>,
            dayOfWeekPrices: DayOfWeekPrice[]
        ) {
            if (dayOfWeekPrices.length === 0) {
                return true;
            }
            let inspectArr: DayOfWeekEnum[] = [];
            let flag = true;
            dayOfWeekPrices
                .map(dayOfWeekPrice => dayOfWeekPrice.applyDays)
                .forEach(applyDays => {
                    const temp: DayOfWeekEnum[] = applyDaysToArr(applyDays);
                    inspectArr.forEach(elem => {
                        temp.forEach(elem2 => {
                            if (elem === elem2) {
                                flag = false;
                            }
                        });
                    });
                    inspectArr = inspectArr.concat(temp);
                });
            return flag;
        },
        default: []
    })
    dayOfWeekPrices: DayOfWeekPrice[];

    @instanceMethod
    pushDayOfWeekPrice(
        this: InstanceType<SeasonPriceSchema>,
        dayOfWeekPrice: DayOfWeekPrice
    ): number {
        return this.dayOfWeekPrices.push(dayOfWeekPrice);
    }

    @instanceMethod
    removeDayOfWeekPrice(
        this: InstanceType<SeasonPriceSchema>,
        dayOfWeekPrice: DayOfWeekPrice
    ): DayOfWeekPrice[] {
        const indexOf = this.dayOfWeekPrices.indexOf(dayOfWeekPrice);
        return this.dayOfWeekPrices.splice(indexOf);
    }
}

export const SeasonPriceModel = new SeasonPriceSchema().getModelForClass(
    SeasonPriceSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "SeasonPrices"
        }
    }
);
