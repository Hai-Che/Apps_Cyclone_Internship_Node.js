import { CREATED } from "../core/success.response";
import AccessService from "../services/access.service";
import { RegisterUserDto } from "../dto/user.dto";
import { RequestValidator } from "../utils/requestValidator";
import { BadRequestError } from "../core/error.response";
class AccessController {
  register = async (req, res, next) => {
    const { errors, input } = await RequestValidator(RegisterUserDto, req.body);
    console.log(input);
    if (errors) {
      throw new BadRequestError(`${errors}`);
    }
    new CREATED({
      message: "Registered Success",
      metadata: await AccessService.register(input),
    }).send(res);
  };
}

export default new AccessController();
