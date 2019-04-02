import jwt from "jsonwebtoken";

const createHostApplicationJWT = (houseId: string): string => {
    return jwt.sign({ houseId }, process.env.JWT_HOST_APPLICATION_SECRET || "");
};
export default createHostApplicationJWT;
