import { prop, Typegoose } from "typegoose";

export class ErrorSchema extends Typegoose {
    @prop({ required: true })
    code: string;

    @prop({ required: true })
    message: string;

    @prop({ required: true })
    devMsg: string;
}

export const ErrorModel = new ErrorSchema().getModelForClass(ErrorSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Errors"
    }
});
