import { BadRequestError } from "../core/error.response";
import { findByUsername } from "../models/repositories/user.repo";
import userModel from "../models/user.model";
class AccessService {
  static register = async ({ username, password, fullName, dob, address }) => {
    const checkUser = await findByUsername(username);
    if (checkUser) {
      console.log(checkUser);
      throw new BadRequestError("Username already existed");
    }
    const newUser = await userModel.create({
      username,
      fullName,
      password,
      dob,
      address,
    });
    if (!newUser) {
      throw new BadRequestError("Failed to create user");
    }
    return { user: newUser };
  };
}
export default AccessService;
