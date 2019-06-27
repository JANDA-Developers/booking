import { prop, Typegoose } from "typegoose";

export enum ErrorDescCode {}

export class ErrorSchema extends Typegoose {
    @prop({
        required: true,
        unique: true
    })
    errorCode: number;

    @prop({ required: true })
    message: string;

    @prop({ required: true })
    description: string;

    @prop({ required: true })
    devMsg: string;

    @prop()
    createdAt: Date;

    @prop()
    updtedAt: Date;
}

export const ErrorModel = new ErrorSchema().getModelForClass(ErrorSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Errors"
    }
});
