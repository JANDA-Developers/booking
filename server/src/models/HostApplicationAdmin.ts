import { prop, Ref, Typegoose } from "typegoose";
import { HouseSchema } from "./House";
import { UserSchema } from "./User";

export class HostApplicationAdminSchema extends Typegoose {
    @prop({ ref: HouseSchema, required: true })
    house: Ref<HouseSchema>;

    @prop({ ref: UserSchema, required: true })
    user: Ref<UserSchema>;

    @prop({ required: true })
    url: string;

    @prop({ required: true })
    id: string;

    @prop({ required: true })
    password: string;

    @prop()
    description: string;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export const HostApplicationAdminModel = new HostApplicationAdminSchema().getModelForClass(
    HostApplicationAdminSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "HostApplicationAdmins"
        }
    }
);
