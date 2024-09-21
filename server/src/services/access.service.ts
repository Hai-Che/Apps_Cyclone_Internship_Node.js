import crypto from "node:crypto";
import bcrypt from "bcrypt";
import MysqlDataSource from "../dbs/init.mysql";
import { BadRequestError, UnauthorizedError } from "../core/error.response";
import { createTokenPair } from "../auth/authUtils";
import { User } from "../entities/user.entity";
import { UserAdvance } from "../entities/userAdvance.entity";
import { KeyToken } from "../entities/keyToken.entity";
import keyTokenService from "./keyToken.service";

const userRepository = MysqlDataSource.getRepository(User);
const userAdvanceRepository = MysqlDataSource.getRepository(UserAdvance);
const keyTokenRepository = MysqlDataSource.getRepository(KeyToken);

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepository.save({
      userName,
      password: hashedPassword,
      uass,
      uuid,
      fullName,
      email,
      phoneNumber,
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
    const accessKey = crypto.randomBytes(64).toString("hex");
    const refreshKey = crypto.randomBytes(64).toString("hex");
    const tokens = await createTokenPair(
      {
        userId: newUser.userId,
      },
      accessKey,
      refreshKey
    );
    const keyStore = await keyTokenService.createKeyToken({
      userId: newUser.userId,
      accessKey,
      refreshKey,
      refreshToken: tokens.refreshToken,
    });

    if (!keyStore) {
      throw new BadRequestError("Fail to create keyStore");
    }
    return { user: newUser, userAdvance: newUserAdvance, tokens };
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
    const accessKey = crypto.randomBytes(64).toString("hex");
    const refreshKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createTokenPair(
      { userId: findUser.userId },
      accessKey,
      refreshKey
    );
    await keyTokenService.createKeyToken({
      userId: findUser.userId,
      accessKey,
      refreshKey,
      refreshToken: tokens.refreshToken,
    });
    return {
      user: findUser,
      tokens,
    };
  };
  static handleRefreshToken = async ({ userId, refreshToken, keyStore }) => {
    if (keyStore.refreshToken !== refreshToken) {
      throw new UnauthorizedError("User is not registered");
    }
    const user = await userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new UnauthorizedError("Not registered");
    }
    const tokens = await createTokenPair(
      {
        userId,
      },
      keyStore.accessKey,
      keyStore.refreshKey
    );
    keyStore.refreshToken = tokens.refreshToken;
    await keyTokenRepository.save(keyStore);
    return {
      user,
      tokens,
    };
  };
}
export default AccessService;
