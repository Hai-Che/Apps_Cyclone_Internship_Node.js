import { BadRequestError } from "../core/error.response";
import { SuccessResponse } from "../core/success.response";
import { UpdateUserDto } from "../dto/user.dto";
import UserService from "../services/user.service";
import { RequestValidator } from "../utils/requestValidator";
class UserController {
  getUser = async (req, res, next) => {
    new SuccessResponse({
      message: "getUser Success",
      metadata: await UserService.getUser(req.params.id),
    }).send(res);
  };
  updateUser = async (req, res, next) => {
    const { errors, input } = await RequestValidator(UpdateUserDto, req.body);
    if (errors) {
      throw new BadRequestError(`${errors}`);
    }
    new SuccessResponse({
      message: "updateUser Success",
      metadata: await UserService.updateUser(input),
    }).send(res);
  };
  deleteUser = async (req, res, next) => {
    new SuccessResponse({
      message: "deleteUser Success",
      metadata: await UserService.deleteUser(req.params.id),
    }).send(res);
  };
}

export default new UserController();
