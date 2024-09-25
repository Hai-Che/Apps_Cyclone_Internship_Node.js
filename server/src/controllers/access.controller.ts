import { CREATED, SuccessResponse } from "../core/success.response";
import AccessService from "../services/access.service";
import { RegisterUserDto } from "../dto/user.dto";
import { RequestValidator } from "../utils/requestValidator";
import { BadRequestError } from "../core/error.response";
class AccessController {
  register = async (req, res, next) => {
    const { errors, input } = await RequestValidator(RegisterUserDto, req.body);
    if (errors) {
      throw new BadRequestError(`${errors}`);
    }
    new CREATED({
      message: "Registered Success",
      metadata: await AccessService.register(input),
    }).send(res);
  };
  login = async (req, res, next) => {
    new SuccessResponse({
      message: "Login Success",
      metadata: await AccessService.login(req.body),
    }).send(res);
  };
  handleRefreshToken = async (req, res, next) => {
    const { userId, sessionId } = req;
    new SuccessResponse({
      message: "Get Tokens Success",
      metadata: await AccessService.handleRefreshToken(userId, sessionId),
    }).send(res);
  };
  logout = async (req, res, next) => {
    const { userId, sessionId } = req;
    new SuccessResponse({
      message: "Logout Success",
      metadata: await AccessService.logout(userId, sessionId),
    }).send(res);
  };
}

export default new AccessController();
