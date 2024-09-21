import { BadRequestError } from "../core/error.response";
import { SuccessResponse } from "../core/success.response";
import { UpdateUserDto } from "../dto/user.dto";
import UserService from "../services/user.service";
import { RequestValidator } from "../utils/requestValidator";
class UserController {
  getUser = async (req, res, next) => {
    new SuccessResponse({
      message: "getUser Success",
      metadata: await UserService.getUser(Number(req.params.id), req.userId),
    }).send(res);
  };
  updateUser = async (req, res, next) => {
    const { errors, input } = await RequestValidator(UpdateUserDto, req.body);
    if (errors) {
      throw new BadRequestError(`${errors}`);
    }
    new SuccessResponse({
      message: "updateUser Success",
      metadata: await UserService.updateUser(input, req.userId),
    }).send(res);
  };
  deleteUser = async (req, res, next) => {
    new SuccessResponse({
      message: "deleteUser Success",
      metadata: await UserService.deleteUser(Number(req.params.id), req.userId),
    }).send(res);
  };
}

export default new UserController();
