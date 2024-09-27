import bcrypt from "bcrypt";
import "dotenv/config";
import MysqlDataSource from "../dbs/init.mysql";
import redisClient from "../dbs/init.redis";
import { emailQueue } from "../queues/emailQueue";
import { BadRequestError, UnauthorizedError } from "../core/error.response";
import { createAccessToken, createTokenPair } from "../auth/authUtils";
import { User } from "../entities/user.entity";
import { UserAdvance } from "../entities/userAdvance.entity";
import { v4 as uuidv4 } from "uuid";

const userRepository = MysqlDataSource.getRepository(User);
const userAdvanceRepository = MysqlDataSource.getRepository(UserAdvance);

class AccessService {
  static register = async ({
    userName,
    password,
    uass,
    uuid,
    fullName,
    email,
    phoneNumber,
    address,
    dob,
    profileUrl,
  }) => {
    const checkUser = await userRepository.findOne({
      where: { userName },
    });
    if (checkUser) {
      throw new BadRequestError("Username already existed");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepository.save({
      userName,
      password: hashedPassword,
      uass,
      uuid,
      fullName,
      email,
      phoneNumber,
      salt,
    });
    if (!newUser) {
      throw new BadRequestError("Failed to create user");
    }
    const newUserAdvance = await userAdvanceRepository.save({
      userId: newUser.userId,
      address,
      dob,
      profileUrl,
    });
    if (!newUserAdvance) {
      throw new BadRequestError("Failed to create user advance");
    }
    await emailQueue.add("sendEmail", {
      email: email,
      subject: "Register successfully",
      text: `Dear ${userName},\n\n Welcome!`,
    });
    return { user: newUser, userAdvance: newUserAdvance };
  };

  static login = async ({ userName, password }) => {
    const findUser = await userRepository.findOne({ where: { userName } });
    if (!findUser) {
      throw new BadRequestError(`User is not exist`);
    }
    const passwordCheck = await bcrypt.compare(password, findUser.password);
    if (!passwordCheck) {
      throw new UnauthorizedError("Authenticated error");
    }
    const sessionId = uuidv4();
    const tokens = await createTokenPair(
      { userId: findUser.userId, sessionId },
      `${findUser.salt}at`,
      `${findUser.salt}rt`
    );
    await redisClient.set(
      `accessToken:${findUser.userId}:${sessionId}`,
      tokens.accessToken,
      "EX",
      30
    );
    await redisClient.set(
      `refreshToken:${findUser.userId}:${sessionId}`,
      tokens.refreshToken,
      "EX",
      300
    );
    return {
      user: findUser,
      tokens,
      sessionId,
    };
  };
  static handleRefreshToken = async (userId: number, sessionId: string) => {
    const findUser = await userRepository.findOne({ where: { userId } });
    if (!findUser) {
      throw new BadRequestError(`User is not exist`);
    }
    const accessToken = await createAccessToken(
      { userId, sessionId },
      `${findUser.salt}at`
    );
    await redisClient.set(
      `accessToken:${userId}:${sessionId}`,
      accessToken,
      "EX",
      30
    );
    return accessToken;
  };

  static logout = async (userId: number, sessionId: string) => {
    await redisClient.del(`accessToken:${userId}:${sessionId}`);

    return { message: "Logout successful" };
  };
}
export default AccessService;
