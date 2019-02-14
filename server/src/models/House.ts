import { Column } from "typeorm";
import { HouseType, Location } from "../types/graph";
import JdBaseEntity from "./JdBaseEntity";
import User from "./User";

class House extends JdBaseEntity {
    @Column({ type: "text" })
    name: string;

    @Column({ type: "enum", default: "GUEST_HOUSE" })
    houseType: HouseType;

    @Column()
    location: Location;

    @Column()
    user: User;

    @Column({ type: "int", default: 0 })
    roomCount: number;

    @Column({ type: "int", default: 0 })
    bedCount: number;

    @Column({ type: "int", default: 0 })
    capacity: number;
}

export default House;
