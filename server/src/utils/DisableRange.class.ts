import { Period } from "../types/types";
import DateRange from "./DateRange.class";

class DisableRange extends DateRange {
    public description?: string;
    constructor(period: Period, description?: string) {
        super(period);
        this.description = description;
    }
}

export default DisableRange;
