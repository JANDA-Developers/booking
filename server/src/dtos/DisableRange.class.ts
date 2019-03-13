import { DisableRange as DR } from "../types/graph";
import { compareOption, PeriodWithDescription } from "../types/types";
import DateRange from "./DateRange.class";

class DisableRange extends DateRange {
    public description?: string | null;
    constructor(period: PeriodWithDescription, option?: compareOption) {
        super(period, option);
        this.description = period.description;
    }
    public getParams(): DR {
        return {
            ...super.getParams(), 
            description: this.description || null
        }
    }
}

export default DisableRange;
