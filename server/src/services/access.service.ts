import { BadRequestError } from "../core/error.response";
import { User } from "../entities/user.entity";
import MysqlDataSource from "../dbs/init.mysql";
import { UserAdvance } from "../entities/userAdvance.entity";

const userRepository = MysqlDataSource.getRepository(User);
const userAdvanceRepository = MysqlDataSource.getRepository(UserAdvance);

class AccessService {
  static register = async ({
    userName,
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
    const newUser = await userRepository.save({
      userName,
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
    return { user: newUser, userAdvance: newUserAdvance };
  };
}
export default AccessService;
