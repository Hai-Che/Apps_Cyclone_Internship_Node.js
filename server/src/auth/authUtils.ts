import jwt from "jsonwebtoken";
import { asyncHandler } from "../helper/asyncHandler";
import { UnauthorizedError, NotFoundError } from "../core/error.response";
import keyTokenService from "../services/keyToken.service";

const HEADER = {
  AUTHORIZATION: "authorization",
  CLIENT_ID: "x-client-id",
  REFRESH_TOKEN: "x-rtoken-id",
};

const createTokenPair = async (payload, accessKey, refreshKey) => {
  try {
    const accessToken = await jwt.sign(payload, accessKey, {
      expiresIn: "1h",
    });
    const refreshToken = await jwt.sign(payload, refreshKey, {
      expiresIn: "7 days",
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

const authentication = asyncHandler(async (req, res, next) => {
  const userId = Number(req.headers[HEADER.CLIENT_ID]);
  if (!userId) {
    throw new UnauthorizedError("Invalid request");
  }
  const keyStore = await keyTokenService.findKeyStoreByUserId(userId);
  if (!keyStore) {
    throw new NotFoundError("Not found keystore");
  }
  if (req.headers[HEADER.REFRESH_TOKEN]) {
    try {
      const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
      const decodeUser = jwt.verify(refreshToken, keyStore.refreshKey);
      if (userId !== decodeUser.userId) {
        throw new UnauthorizedError("Invalid user id");
      }
      req.keyStore = keyStore;
      req.userId = decodeUser.userId;
      req.refreshToken = refreshToken;
      return next();
    } catch (error) {
      throw error;
    }
  }
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) {
    throw new UnauthorizedError("Invalid request");
  }
  try {
    const decodeUser = jwt.verify(accessToken, keyStore.accessKey);
    if (userId !== decodeUser.userId) {
      throw new UnauthorizedError("Invalid user id");
    }
    req.userId = decodeUser.userId;
    return next();
  } catch (error) {
    throw error;
  }
});

export { createTokenPair, authentication };
