import { IsEmail } from "class-validator";
import {
    Column,
    Entity,
    ObjectID,
} from "typeorm";
import { role } from "../types/types";
import JdBaseEntity from "./JdBaseEntity";

const ADMIN = "ADMIN";
const HOST = "HOST";
const GUEST = "GUEST";

@Entity()
class User extends JdBaseEntity {
    @Column({ type: "text" })
    name: string;

    @Column({ type: "text", unique: true })
    phoneNumber: string;

    @Column({ type: "boolean", default: false })
    phoneVerificaiton: boolean;

    @IsEmail()
    @Column({ type: "text" })
    email: string;

    @Column({ type: "text", enum: [ADMIN, HOST, GUEST], default: HOST })
    role: role;

    @Column()
    bookings: ObjectID[];

    @Column()
    houses: ObjectID[];
}

export default User;
