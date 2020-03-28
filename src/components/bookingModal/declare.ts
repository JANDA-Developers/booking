import { IselectedOption } from "../../atoms/forms/selectBox/SelectBox";
import { PayMethod, Funnels } from "../../types/enum";

export interface IBookingModalInfo {
    payMethodLastOp: IselectedOption<PayMethod>;
    funnelLastOp: IselectedOption<Funnels>;
}