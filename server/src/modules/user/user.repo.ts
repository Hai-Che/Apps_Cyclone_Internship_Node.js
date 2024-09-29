import MysqlDataSource from "../../dbs/init.mysql";
import { User } from "../../entities/user.entity";

const userRepository = MysqlDataSource.getRepository(User);

const getUserById = async (userId) => {
  return await userRepository.findOne({ where: { userId } });
};

export { getUserById };
