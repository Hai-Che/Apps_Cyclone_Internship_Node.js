import { BadRequestError, ForbiddenError } from "../core/error.response";
import MysqlDataSource from "../dbs/init.mysql";
import { User } from "../entities/user.entity";
import { UserAdvance } from "../entities/userAdvance.entity";

const userRepository = MysqlDataSource.getRepository(User);
const userAdvanceRepository = MysqlDataSource.getRepository(UserAdvance);

class UserService {
  static getUser = async (userId: number, currentUserId: number) => {
    if (userId !== currentUserId) {
      throw new ForbiddenError("Can't get info another user");
    }
    const user = await userRepository.findOne({
      where: { userId },
    });
    if (!user) {
      throw new BadRequestError("User does not existed");
    }
    const userAdvance = await userAdvanceRepository.findOne({
      where: { userId },
    });
    return { user, userAdvance };
  };

  static updateUser = async (
    {
      userId,
      userName,
      uass,
      uuid,
      fullName,
      email,
      phoneNumber,
      address,
      dob,
      profileUrl,
    },
    currentUserId: number
  ) => {
    if (userId !== currentUserId) {
      throw new ForbiddenError("Can't update another user");
    }
    const user = await userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new BadRequestError("User not found");
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
    await userRepository.save(user);
    let userAdvance = await userAdvanceRepository.findOne({
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
    await userAdvanceRepository.save(userAdvance);
    return { user, userAdvance };
  };
  static deleteUser = async (userId: number, currentUserId: number) => {
    if (userId != currentUserId) {
      throw new ForbiddenError("Can't delete another user");
    }
    const userAdvance = await userAdvanceRepository.findOne({
      where: { userId },
    });
    if (userAdvance) {
      await userAdvanceRepository.remove(userAdvance);
    }
    const user = await userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new BadRequestError("User not found.");
    }
    await userRepository.remove(user);

    return { message: "User deleted successfully." };
  };
}
export default UserService;
