import { Column } from "typeorm";
import JdBaseEntity from "./JdBaseEntity";

const DOMITORY = "DOMITORY";
const ROOM = "ROOM";

class RoomType extends JdBaseEntity {
    @Column({ type: "text", enum: [DOMITORY, ROOM] })
    pricingType: string;
}

export default RoomType;
