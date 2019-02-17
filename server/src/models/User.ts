import bcrypt from "bcryptjs";
import { instanceMethod, InstanceType, prop, Typegoose } from "typegoose";

export enum UserRole {
    ADMIN = "ADMIN",
    HOST = "HOST",
    BOOKER = "BOOKER",
    GHOST = "GHOST"
}
const BCRYPT_ROUNDS = 10;

export class UserSchema extends Typegoose {
    @prop({ required: [true, `firstName is missing`] })
    firstName: string;

    @prop({ required: [true, `lastName is missing`] })
    lastName: string;

    @prop() // this will create a virtual property called 'fullName'
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    set fullName(full: string) {
        const [firstName, lastName] = full.split(" ");
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @prop()
    password: string | undefined;

    @prop({ unique: true })
    phoneNumber: string;

    @prop({ default: false })
    verifiedPhone: boolean;

    @prop({ required: true, unique: true })
    email: string;

    @prop({ default: false })
    verifiedEmail: boolean;

    @prop({ enum: UserRole, default: UserRole.GHOST })
    userRole?: UserRole;

    @prop({ default: false })
    checkPrivacyPolicy: boolean;

    @instanceMethod
    public async comparePassword(
        this: InstanceType<UserSchema>,
        password: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, this.password || "");
    }

    @instanceMethod
    public async hashPassword(this: InstanceType<UserSchema>): Promise<void> {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, BCRYPT_ROUNDS);
        }
    }
}

export const User = new UserSchema().getModelForClass(UserSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "users"
    }
});
