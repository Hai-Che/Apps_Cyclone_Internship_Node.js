import { KeyToken } from "../entities/keyToken.entity";
import MysqlDataSource from "../dbs/init.mysql";

const keyTokenRepository = MysqlDataSource.getRepository(KeyToken);
class keyTokenService {
  static createKeyToken = async ({
    userId,
    accessKey,
    refreshKey,
    refreshToken = null,
  }) => {
    try {
      let checkKeyToken = await this.findKeyStoreByUserId(userId);
      if (!checkKeyToken) {
        checkKeyToken = new KeyToken();
        checkKeyToken.userId = userId;
      }
      checkKeyToken.accessKey = accessKey;
      checkKeyToken.refreshKey = refreshKey;
      checkKeyToken.refreshToken = refreshToken;
      const tokens = await keyTokenRepository.save(checkKeyToken);
      return tokens ? tokens.accessKey : null;
    } catch (error) {
      return error;
    }
  };

  static findKeyStoreByUserId = async (userId) => {
    return await keyTokenRepository.findOne({ where: { userId } });
  };
}

export default keyTokenService;
