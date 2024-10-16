import { BadRequestError, ForbiddenError } from "routing-controllers";
import { User } from "../../entities/user.entity";
import { UserAdvance } from "../../entities/userAdvance.entity";
import { Inject, Service } from "typedi";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { createTokenPair } from "../../utils/generateObject";
import redisClient from "../../dbs/init.redis";

@Service()
export class UserService {
  constructor(
    @Inject("UserRepository") private userRepository: Repository<User>,
    @Inject("UserAdvanceRepository")
    private userAdvanceRepository: Repository<UserAdvance>
  ) {}

  async getUser(userId: number, currentUserId: number) {
    if (userId !== currentUserId) {
      throw new ForbiddenError("Can't get info another user");
    }
    const user = await this.userRepository.findOne({
      where: { userId },
    });
    if (!user) {
      throw new BadRequestError("User does not existed");
    }
    const userAdvance = await this.userAdvanceRepository.findOne({
      where: { userId },
    });
    return { user, userAdvance };
  }

  async updateUser(
    {
      userId,
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
      gender,
    },
    currentUserId: number
  ) {
    if (userId !== currentUserId) {
      throw new ForbiddenError("Can't update another user");
    }
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new BadRequestError("User not found");
    }
    let tokens;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.salt = salt;
      const sessionId = uuidv4();
      tokens = await createTokenPair(
        { userId, sessionId },
        `${salt}at`,
        `${salt}rt`
      );
      await redisClient.set(
        `accessToken:${userId}:${sessionId}`,
        tokens.accessToken,
        "EX",
        30
      );
      await redisClient.set(
        `refreshToken:${userId}:${sessionId}`,
        tokens.refreshToken,
        "EX",
        300
      );
    }
    if (userName) {
      user.userName = userName;
    }
    if (uass) {
      user.uass = uass;
    }
    if (uuid) {
      user.uuid = uuid;
    }
    if (fullName) {
      user.fullName = fullName;
    }
    if (email) {
      user.email = email;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (gender) {
      user.gender = gender;
    }
    await this.userRepository.save(user);
    let userAdvance = await this.userAdvanceRepository.findOne({
      where: { userId },
    });
    if (!userAdvance) {
      userAdvance = new UserAdvance();
      userAdvance.userId = userId;
    }
    if (address) {
      userAdvance.address = address;
    }
    if (dob) {
      userAdvance.dob = dob;
    }
    if (profileUrl) {
      userAdvance.profileUrl = profileUrl;
    }
    await this.userAdvanceRepository.save(userAdvance);
    return { user, userAdvance, tokens };
  }
  async deleteUser(userId: number, currentUserId: number) {
    if (userId != currentUserId) {
      throw new ForbiddenError("Can't delete another user");
    }
    const userAdvance = await this.userAdvanceRepository.findOne({
      where: { userId },
    });
    if (userAdvance) {
      await this.userAdvanceRepository.remove(userAdvance);
    }
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new BadRequestError("User not found.");
    }
    await this.userRepository.remove(user);

    return { message: "User deleted successfully." };
  }

  async updateProfilePicture(userId: number, filePath: string) {
    const user = this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new BadRequestError("User not found");
    }
    await this.userAdvanceRepository.update(userId, { profileUrl: filePath });
    return { message: "Profile picture updated successfully" };
  }
}
