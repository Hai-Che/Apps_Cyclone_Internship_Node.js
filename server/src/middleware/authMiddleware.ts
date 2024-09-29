import {
  Middleware,
  ExpressMiddlewareInterface,
  UnauthorizedError,
} from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import { getUserById } from "../modules/user/user.repo";
import jwt from "jsonwebtoken";
import redisClient from "../dbs/init.redis";

interface AuthenticatedRequest extends Request {
  userId?: string;
  sessionId?: string;
}

const HEADER = {
  AUTHORIZATION: "authorization",
  REFRESH_TOKEN: "x-rtoken-id",
};

@Service()
@Middleware({ type: "before" })
export class AuthMiddleware implements ExpressMiddlewareInterface {
  async use(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
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
      next();
    } catch (error) {
      throw new UnauthorizedError("Invalid request");
    }
  }
}

@Service()
@Middleware({ type: "before" })
export class RefreshTokenMiddleware implements ExpressMiddlewareInterface {
  async use(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
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
      next();
    } catch (error) {
      throw new UnauthorizedError("Invalid request");
    }
  }
}
