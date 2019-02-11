import { Column } from "typeorm";
import { houseType } from "../types/types";
import JdBaseEntity from "./JdBaseEntity";

const houseTypes = [
    "GUEST_HOUSE",
    "HOSTEL",
    "HOTEL",
    "MOTEL",
    "PENSION",
    "YOUTH_HOSTEL"
];

class House extends JdBaseEntity {
    @Column({ type: "text", unique: true })
    name: string;

    @Column({ type: "text", enum: houseTypes })
    houseType: houseType;

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
