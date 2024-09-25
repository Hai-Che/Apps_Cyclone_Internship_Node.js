import jwt from "jsonwebtoken";
import { asyncHandler } from "../helper/asyncHandler";
import { UnauthorizedError } from "../core/error.response";
import "dotenv/config";
import redisClient from "../dbs/init.redis";
import { getUserById } from "../entities/repositories/user.repo";

const HEADER = {
  AUTHORIZATION: "authorization",
  REFRESH_TOKEN: "x-rtoken-id",
};

const createTokenPair = async (payload, accessKey, refreshKey) => {
  try {
    const accessToken = await jwt.sign(payload, accessKey, {
      expiresIn: "30s",
    });
    const refreshToken = await jwt.sign(payload, refreshKey, {
      expiresIn: "300s",
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

const createAccessToken = async (payload, accessKey) => {
  try {
    const accessToken = await jwt.sign(payload, accessKey, {
      expiresIn: "30s",
    });
    return accessToken;
  } catch (error) {
    throw error;
  }
};

const verifyToken = asyncHandler(async (req, res, next) => {
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) {
    throw new UnauthorizedError("Invalid request");
  }
  try {
    const decodeUser = jwt.decode(accessToken, { complete: true });
    const userId = decodeUser.payload.userId;
    const findUser = await getUserById(userId);
    if (!findUser) {
      throw new UnauthorizedError("User not found");
    }
    const verified = jwt.verify(accessToken, `${findUser.salt}at`);
    req.userId = verified.userId;
    req.sessionId = verified.sessionId;
    return next();
  } catch (error) {
    throw error;
  }
});

const verifyRefreshToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
  if (!refreshToken) {
    throw new UnauthorizedError("Invalid request");
  }
  try {
    const decodeUser = jwt.decode(refreshToken, { complete: true });
    const userId = decodeUser.payload.userId;
    const findUser = await getUserById(userId);
    if (!findUser) {
      throw new UnauthorizedError("User not found");
    }
    const verified = jwt.verify(refreshToken, `${findUser.salt}rt`);
    req.userId = verified.userId;
    req.sessionId = verified.sessionId;
    const storedRefreshToken = await redisClient.get(
      `refreshToken:${verified.userId}:${verified.sessionId}`
    );
    if (storedRefreshToken !== refreshToken) {
      throw new UnauthorizedError("Unauthorized error");
    }
    return next();
  } catch (error) {
    throw error;
  }
});

export { createTokenPair, createAccessToken, verifyToken, verifyRefreshToken };
