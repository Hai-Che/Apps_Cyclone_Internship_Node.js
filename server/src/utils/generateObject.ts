import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
export const createTokenPair = async (payload, accessKey, refreshKey) => {
  try {
    const accessToken = await jwt.sign(payload, accessKey, {
      expiresIn: "300s",
    });
    const refreshToken = await jwt.sign(payload, refreshKey, {
      expiresIn: "300s",
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

export const generateVerificationCode = () => {
  return uuidv4().substring(0, 4).toUpperCase();
};
