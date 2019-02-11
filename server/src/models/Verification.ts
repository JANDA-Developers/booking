import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    ObjectID,
    ObjectIdColumn
} from "typeorm";
import { target } from "../types/types";

const PHONE = "PHONE";
const EMAIL = "EMAIL";

@Entity()
class Verification extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ type: "text", nullable: false })
    payload: string;

    @Column({ type: "text", enum: [PHONE, EMAIL], nullable: false })
    target: target;

    @Column()
    key: string;

    @Column({ type: "boolean", default: false })
    verified: boolean;

    @BeforeInsert()
    createKey(): void {
        if (this.target === PHONE) {
            // Short Key 생성
            this.key = Math.floor(Math.random() * 1000000).toString();
        } else if (this.target === EMAIL) {
            // Long Key 생성
            this.key = Math.random()
                .toString(36)
                .substr(2);
        }
    }
}

export default Verification;
