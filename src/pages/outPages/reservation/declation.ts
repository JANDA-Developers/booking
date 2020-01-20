import { TUseInput, IUseModal, IUseDayPicker, IUseSelect } from "../../../hooks/hook";
import { IRoomType } from "../../../types/interface";
import { IRoomSelectInfo } from "../../../components/bookingModal/declaration";
import { PayMethod } from "../../../types/api";
import { TCardRegistInfo } from "../../../components/bilingModal/BillingModal";

export interface IBookerInfo {
    name: string;
    password: string;
    memo: string;
    email: string;
    phoneNumber: string;
    agreePrivacyPolicy: boolean;
}

export interface IReservationHooks {
    priceHook: TUseInput<number>;
    cardInfoHook: [TCardRegistInfo, React.Dispatch<React.SetStateAction<TCardRegistInfo>>],
    roomInfoHook: [
        IRoomType[],
        React.Dispatch<React.SetStateAction<IRoomType[]>>
    ];
    toastModalHook: IUseModal<any>;
    bookerInfo: IBookerInfo;
    setBookerInfo: React.Dispatch<React.SetStateAction<IBookerInfo>>;
    dayPickerHook: IUseDayPicker;
    roomSelectInfo: IRoomSelectInfo[];
    setRoomSelectInfo: React.Dispatch<React.SetStateAction<IRoomSelectInfo[]>>;
    payMethodHook: IUseSelect<PayMethod>;
    sendSmsHook: {
        checked: boolean;
        onChange: (value: boolean) => void;
    };
}
