import { ObjectId } from "bson";
import {
    arrayProp,
    instanceMethod,
    InstanceType,
    pre,
    prop,
    Typegoose
} from "typegoose";
import { Bed } from "../types/graph";
import { BedModel, BedSchema } from "./Bed";
import { transformRoomType } from "./merge/merge";
import { RoomTypeSchema } from "./RoomType";

@pre<RoomSchema>("save", async function(next) {
    try {
        if (this.index <= 0 || !this.index) {
            const test = await RoomModel.findOne({
                roomType: new ObjectId(this.roomType)
            }).sort({ index: -1 });
            if (test) {
                this.index = test.index + 1;
            }
        }
        this.roomType = new ObjectId(this.roomType);
    } catch (error) {
        throw error;
    }
    next();
})
export class RoomSchema extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true, ref: RoomTypeSchema })
    roomType: ObjectId;

    @prop({ min: 0, default: 0 })
    index: number;

    @arrayProp({ items: ObjectId })
    beds: ObjectId[];

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @prop()
    roomSrl?: number;

    @instanceMethod
    async addBeds(this: InstanceType<RoomSchema>): Promise<Array<InstanceType<BedSchema>>> {
        // 필요한 프로퍼티... 뭐가있는가
        // 1. 몇 명의 게스트가 들어갈 수 있는가?
        // 2. Bed 마다 뭘할까?
        const roomTypeObj = await transformRoomType(this.roomType);
        if (!roomTypeObj) {
            throw new Error("RoomTyoe이 존재하지 않습니다.");
        }
        const beds: Array<InstanceType<BedSchema>> = [];
        let bedCount = roomTypeObj.peopleCount;
        while (bedCount) {
            beds.push(
                new BedModel({
                    name: bedCount + "호",
                    room: new ObjectId(this._id),
                    roomType: new ObjectId(this.roomType)
                })
            );
            bedCount--;
        }
        return await BedModel.insertMany(
            beds.map(
                (bed): Bed => {
                    const temp: any = {
                        ...bed
                    };
                    return temp._doc;
                }
            )
        );
    }
}

export const RoomModel = new RoomSchema().getModelForClass(RoomSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Rooms"
    }
});
