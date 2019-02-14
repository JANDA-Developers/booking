import { Column } from "typeorm";
import JdBaseEntity from "./JdBaseEntity";

export enum HouseType {
    GUEST_HOUSE = "GUEST_HOUSE",
    HOSTEL = "HOSTEL",
    HOTEL = "HOTEL",
    MOTEL = "MOTEL",
    PENSION = "PENSION",
    YOUTH_HOSTEL = "YOUTH_HOSTEL"
}

class House extends JdBaseEntity {
    @Column({ type: "text", unique: true })
    name: string;

    @Column({ type: "text", enum: HouseType, default: HouseType.GUEST_HOUSE })
    houseType: HouseType;

    @Column({ type: "text" })
    user: string;

    @Column({ type: "text" })
    roomCount: string;

    @Column({ type: "text" })
    bedCount: string;

    @Column({ type: "text" })
    capacity: string;

    @Column({ type: "text" })
    bookingCondition: string;

    @Column({ type: "text" })
    refundPolicy: string;
}

export default House;
