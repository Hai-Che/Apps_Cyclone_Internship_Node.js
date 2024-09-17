import { SuccessResponse } from "../core/success.response";
import UserService from "../services/user.service";
class UserController {
  getUser = async (req, res, next) => {
    new SuccessResponse({
      message: "getUser Success",
      metadata: await UserService.getUser(req.params.id),
    }).send(res);
  };
  updateUser = async (req, res, next) => {
    new SuccessResponse({
      message: "updateUser Success",
      metadata: await UserService.updateUser(req.body),
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
