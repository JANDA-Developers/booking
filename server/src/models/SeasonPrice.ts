import _ from "lodash";
import { instanceMethod, InstanceType, prop, Ref, Typegoose } from "typegoose";
import { DailyPrice, Day, DayOfWeekPrice } from "../types/graph";
import { RoomTypeSchema } from "./RoomType";
import { SeasonSchema } from "./Season";

export class SeasonPriceSchema extends Typegoose {
    @prop({ required: true, ref: RoomTypeSchema })
    roomType: Ref<RoomTypeSchema>;

    @prop({ required: true, ref: SeasonSchema })
    season: Ref<SeasonSchema>;

    @prop({ required: true })
    defaultPrice: number;

    // Deprecated: 더이상 사용하지 말것.
    @prop({
        required: true,
        default: []
    })
    dayOfWeekPrices: DayOfWeekPrice[];

    @prop({
        default: [],
        validate(dailyPriceList: DailyPrice[]) {
            // TODO: 중복검사 ㄱㄱ
            const temp: Day[] = [];
            let validateResult = true;
            dailyPriceList.forEach(dailyPrice => {
                const duplicated = temp.includes(dailyPrice.day);
                if (duplicated) {
                    validateResult = false;
                    return;
                }
                temp.push(dailyPrice.day);
            });
            return validateResult;
        }
    })
    dailyPriceList: DailyPrice[];

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

    /**
     * dailyPrice 추가...
     * 배열로 파라미터를 받음... this.save() 하지 않음
     * @param dailyPriceList
     */
    @instanceMethod
    addDailyPrices(
        this: InstanceType<SeasonPriceSchema>,
        dailyPriceList: DailyPrice[]
    ): DailyPrice[] {
        this.dailyPriceList = _.unionBy(
            dailyPriceList,
            this.dailyPriceList,
            "day"
        );
        return this.dailyPriceList;
    }

    /**
     * dailyPrice 삭제...
     * 배열로 파라미터를 받음... this.save() 하지 않음
     * @param days Day 배열...
     */
    @instanceMethod
    deleteDailyPrices(
        this: InstanceType<SeasonPriceSchema>,
        days: Day[]
    ): DailyPrice[] {
        _.pullAllBy(
            this.dailyPriceList,
            days.map(day => {
                return {
                    day
                };
            }),
            "day"
        );
        return this.dailyPriceList;
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
