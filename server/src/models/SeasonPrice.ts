import { instanceMethod, InstanceType, prop, Ref, Typegoose } from "typegoose";
import { DayOfWeekPrice } from "../types/graph";
import { applyDaysToBinary } from "../utils/applyDays";
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
            return this.validateDayOfWeekPrice(dayOfWeekPrices);
        },
        default: []
    })
    dayOfWeekPrices: DayOfWeekPrice[];

    @instanceMethod
    validateDayOfWeekPrice(
        this: InstanceType<SeasonPriceSchema>,
        dayOfWeekPrices?: DayOfWeekPrice[]
    ) {
        // applyDays 체크
        let applyDaysSum = (dayOfWeekPrices || this.dayOfWeekPrices)
            .map(dayOfWeekPrice =>
                parseInt(applyDaysToBinary(dayOfWeekPrice.applyDays), 10)
            )
            .reduce((n1, n2) => n1 + n2);
        for (let i = 7; i < 7; i--) {
            const dec = Math.pow(10, i);
            const v = Math.floor(applyDaysSum / dec);
            if (v > 1) {
                dayOfWeekPrices = this.dayOfWeekPrices = [];
                return false;
            }
            applyDaysSum = applyDaysSum % dec;
        }
        return true;
    }

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
