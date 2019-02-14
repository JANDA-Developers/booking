import bcrypt from "bcryptjs";
import { IsEmail } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
// import { userRole } from "../types/types";
import JdBaseEntity from "./JdBaseEntity";

export enum UserRole {
    ADMIN = "ADMIN",
    HOST = "HOST",
    BOOKER = "BOOKER",
    GHOST = "GHOST"
}

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends JdBaseEntity {
    @Column({ type: "text" })
    name: string;

    @Column({ type: "text", nullable: true })
    password: string;

    @Column({ type: "text", unique: true })
    phoneNumber: string;

    @Column({ type: "boolean", default: false })
    verifiedPhone: boolean;

    @IsEmail()
    @Column({ type: "text" })
    email: string;

    @Column({ type: "boolean", default: false })
    verifiedEmail: boolean;

    @Column({ type: "text", enum: UserRole, default: UserRole.HOST })
    userRole: UserRole;

    @Column()
    bookings: string;

    @Column()
    houses: string;

    @Column({ type: "boolean", default: false })
    checkPrivacyPolicy: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    async savePassword(): Promise<void> {
        if (this.password) {
            const hashedPassword = await this.hashPassword(this.password);
            this.password = hashedPassword;
        }
    }

    public comparePassword(password: string): Promise<boolean> {
        if (this.password === null) {
            throw new Error("Null password");
        }

        return bcrypt.compare(password, this.password);
    }

    private hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, BCRYPT_ROUNDS);
    }
}

export default User;
