import { prop, Ref, Typegoose } from "typegoose";
import { HouseSchema } from "./House";
import { UserSchema } from "./User";

export class ApplicationPageSchema extends Typegoose {

    @prop({ ref: HouseSchema, required: true })
    house: Ref<HouseSchema>;

    @prop({ ref: UserSchema, required: true, })
    user: Ref<UserSchema>;

    @prop({ required: true })
    url: string;

    @prop()
    description: string[];

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export const ApplicationPageModel = new ApplicationPageSchema().getModelForClass(ApplicationPageSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "ApplicationPages"
    }
});
