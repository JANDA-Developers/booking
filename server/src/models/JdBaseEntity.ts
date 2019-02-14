import {
    AfterLoad,
    CreateDateColumn,
    ObjectID,
    ObjectIdColumn,
    UpdateDateColumn,
} from "typeorm";
import { transformDate } from "../utils/transformData";

/**
 * id, createdAt, updatedAt 칼럼 포함
 */
abstract class JdBaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @AfterLoad()
    transdataWhenAfterLoad() {
        this.createdAt = transformDate(this.createdAt);
        this.updatedAt = transformDate(this.updatedAt);
    }
}

export default JdBaseEntity;
